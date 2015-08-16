/*
Copyright 2015 Niall Frederick Weedon

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
package angular2haxe.buildplugin;

#if macro
import haxe.macro.Compiler;
import haxe.macro.Context;
import haxe.macro.Expr;
import haxe.macro.ExprTools;
import haxe.macro.Type in MType;
import haxe.macro.Type.ClassType;
import haxe.macro.MacroStringTools;
#end

import angular2haxe.Application;
import angular2haxe.Trace;
import angular2haxe.AngularExtension;

// Command line: -D using_registry
#if using_registry
/* Import a build registry. The registry
 * holds all imports that need to be resolved 
 * at build-time. 
 * If you don't have one, follow the link for a
 * reference implementation:
 * 
 * https://github.com/nweedon/Angular2-Haxe/blob/master/src/BuildRegistry.hx 
 */
import BuildRegistry;
#end
/* --- */

class BuildPlugin
{	
	private function new() 
	{
		
	}
	
#if macro
	private static var QUOTED_FIELD_PREFIX = "@$__hx__";
	
	/**
	 * Resolve class by name at build time. Classes will resolve if
	 * they are imported explicitly in this file.
	 * @param	name 	Fully-qualified name of the class to resolve (including package names).
	 * @return	Class representation of the name provided. If the class doesn't resolve, an error is thrown.
	 */
	public static function resolveClass(name : String) : Class<Dynamic>
	{
		var cl : Class<Dynamic>;
		
		if (AngularExtension.isAngularClass(name))
		{
			name = AngularExtension.getFullyQualifiedName(name);
		}
		
		cl = Type.resolveClass(name);
		
		if (cl == null)
		{
			// Skip compiling Angular classes.
			if (!AngularExtension.isAngularClass(name))
			{
				Trace.error('${name} has not resolved to a class. Make sure it is imported in the BuildPlugin file.');
			}
		}
		
		return cl;
	}
	
	/**
	 * Extract value from expression. Credit to nadako:
	 * https://gist.github.com/nadako/9081608
	 * @param	e
	 * @return
	 */
	private static function extractValue(e : Expr) : Dynamic
	{
		switch (e.expr)
		{
			case EConst(c):
				switch (c)
				{
					case CInt(s):
						var i = Std.parseInt(s);
						return (i != null) ? i : Std.parseFloat(s); // if the number exceeds standard int return as float
					case CFloat(s):
						return Std.parseFloat(s);
					case CString(s):
						return s;
					case CIdent("null"):
						return null;
					case CIdent("true"):
						return true;
					case CIdent("false"):
						return false;
					default:
				}
			case EBlock([]):
				return {};
			case EObjectDecl(fields):
				var object = {};
				for (field in fields)
					Reflect.setField(object, unquoteField(field.field), extractValue(field.expr));
				return object;
			case EArrayDecl(exprs):
				return [for (e in exprs) extractValue(e)];
			default:
		}
		throw new Error("Invalid JSON expression", e.pos);
	}

	/**
	 * Strips "@$__hx__" from all object declarations.
	 * see https://github.com/HaxeFoundation/haxe/issues/2642
	 * @param	name
	 * @return
	 */
	private static function unquoteField(name:String):String
	{
		return (name.indexOf(QUOTED_FIELD_PREFIX) == 0) ? name.substr(QUOTED_FIELD_PREFIX.length) : name;
	}
	
	/**
	 * Compile the modules in modulesExpr by adding
	 * '@:build' metadata to them, which in turn triggers
	 * BuildPlugin.build(). This function also updates the
	 * main method so that the components are bootstrapped
	 * at run-time.
	 * @param	modulesExpr
	 * @return
	 */
	macro public static function app(modulesExpr : Expr) : Array<Field>
	{
		var modules : Array<String> = extractValue(modulesExpr);
		var moduleClasses : Array <Class<Dynamic>> = [];
		var originalBlock : Array<Expr>;
		var fields : Array<Field> = Context.getBuildFields();
		var mainFieldName : String = "main";
		
		for (module in modules)
		{
			Trace.log('Adding build metadata for ${module}');
			Compiler.addMetadata("@:build(angular2haxe.buildplugin.BuildPlugin.build())", module);
			moduleClasses.push(resolveClass(module));
		}
		
		var mainExists : Bool = Lambda.exists(fields, function(field : Field) : Bool 
		{
			return field.name == mainFieldName;	
		});
		
		if (mainExists)
		{
			// Remove the main function, it will be replaced with a new one.
			for (i in 0...fields.length)
			{
				if (fields[i].name == mainFieldName)
				{
					// Retrieve main function.
					var func : haxe.macro.Expr.Function = switch(fields[i].kind)
					{
						case FFun(f): f;
						default: null;
					};
					
					// Retrieve original code block. If an original
					// doesn't exist, create an empty block.
					originalBlock = switch(func.expr.expr)
					{
						case EBlock(b): b;
						default: [];
					}
					
					// Remove original code block.
					fields.splice(i, 1);
				}
			}
		}
		
		// Add the new main function.
		fields.push({
			name: mainFieldName,
			doc: null,
			meta: [],
			access: [AStatic, APublic],
			kind: FieldType.FFun({ 
				ret: macro : Void,
				params: [],
				expr: macro {
					$b{originalBlock};
					new angular2haxe.Application($v{moduleClasses});
				},
				args: []
			}),
			pos: Context.currentPos()
		});
		
		return fields;
	}
	
	/**
	 * Compile data at build-time rather than run-time.
	 * @return
	 */
	macro public static function build() : Array<Field>
	{		
		var attachedClass : ClassType = Context.getLocalClass().get();
		var attachedMetadata : Metadata = attachedClass.meta.get();
		var fields : Array<Field> = Context.getBuildFields();
		
		// Exit if already built.
		for (i in 0...fields.length)
		{
			if (fields[i].name == '__alreadyConstructed')
			{
				return null;
			}
		}
		
		// Use template strings to build final output code / macro
		var validAnnotations : Map<String, Class<AnnotationExtension>> = [
			"Component" => ComponentAnnotationExtension,
			"Directive" => DirectiveAnnotationExtension,
			"View" 		=> ViewAnnotationExtension
		];

		// Set default values for annotations and parameters fields.
		var annotationData : Array<Dynamic> = [];
		var annotationKeys : Array<String> = [];
		var parameters : Array<Dynamic> = [];
		
		Trace.log('=> Started compiling "${attachedClass.name}"');
		
		for (meta in attachedMetadata) 
		{
			if (["Component", "Directive", "View"].indexOf(meta.name) > -1)
			{
				var data : Dynamic = { };
				var annotationName : String = meta.name;
				
				Trace.log('\t-> Parsing ${meta.name} annotation');
				
				for (param in meta.params)
				{
					var params : Array<Dynamic> = param.expr.getParameters()[0];
					var i : Int = 0;
					
					// Cast all annotation values at build-time into values
					// we can work with.
					for (paramNames in params)
					{
						var e : Expr = params[i].expr;
						var fieldValue : Dynamic;
						
						// Extract value from expression.
						fieldValue = extractValue(e);
						
						Reflect.setField(data, paramNames.field, fieldValue);
						i++;
					}
				}
				
				Reflect.callMethod(validAnnotations[annotationName], 
									Reflect.field(validAnnotations[annotationName], "transform"), 
									[data, annotationData, parameters]);
				
				annotationData.push(data);
				annotationKeys.push(annotationName);
			}
		}
		
		// Create annotations and parameters fields
		fields.push({
			name: 'annotations',
			doc: null,
			meta: [],
			access: [AStatic, APublic],
			kind: FVar(macro : Array<Dynamic>, macro [ 
				untyped __js__("{1} ? new ng.ComponentAnnotation({0}) : null", $v{ annotationData[annotationKeys.indexOf("Component")] }, $v{ annotationKeys.indexOf("Component") > -1 }), 
				untyped __js__("{1} ? new ng.ViewAnnotation({0}) : null", $v{ annotationData[annotationKeys.indexOf("View")] }, $v{ annotationKeys.indexOf("View") > -1 } ),
				untyped __js__("{1} ? new ng.DirectiveAnnotation({0}) : null", $v{ annotationData[annotationKeys.indexOf("Directive")] }, $v{ annotationKeys.indexOf("Directive") > -1 }), 
			]),
			pos: Context.currentPos()
		});
		
		fields.push({
			name: 'parameters',
			doc: null,
			meta: [],
			access: [AStatic, APublic],
			kind: FVar(macro : Array<Dynamic>, Context.makeExpr(parameters, Context.currentPos())),
			pos: Context.currentPos()
		});
		
		// Create field to note that the class has been
		// constructed at build-time.
		fields.push({
			name: '__alreadyConstructed',
			doc: null,
			meta: [],
			access: [AStatic, APublic],
			kind: FVar(macro : Bool, macro true),
			pos: Context.currentPos()
		});
		
		Trace.log('=> Finished compiling "${attachedClass.name}"');
		return fields;
	}
#end
}