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

import angular2haxe.Trace;
import angular2haxe.AngularExtension;
import haxe.Template;
import test.HelloWorld;
import test.HelloWorld.Greeter;
import test.InputDirective;

import ng.ComponentAnnotation;
import ng.DirectiveAnnotation;
import ng.ViewAnnotation;
import ng.NgFor;

/* Import a build registry. The registry
 * holds all imports that need to be resolved 
 * at build-time. */
import BuildRegistry;
/* --- */

class BuildPlugin
{	
	private function new() 
	{
		
	}
	
#if macro
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
			trace(name);
			if (!AngularExtension.isAngularClass(name))
			{
				Trace.error('${name} has not resolved to a class. Make sure it is imported in the BuildPlugin file.');
			}
		}
		
		return cl;
	}
	
	/**
	 * Compile data at build-time rather than run-time.
	 * @return
	 */
	static public function compile() : Array<Field>
	{		
		var attachedClass : ClassType = Context.getLocalClass().get();
		var attachedMetadata : Metadata = attachedClass.meta.get();
		var fields : Array<Field> = Context.getBuildFields();
		
		// Use template strings to build final output code / macro
		var validAnnotations : Map<String, AnnotationPair> = [
			"Component" => { annotation: ComponentAnnotation, extension: ComponentAnnotationExtension },
			"Directive" => { annotation: DirectiveAnnotation, extension: DirectiveAnnotationExtension },
			"View" 		=> { annotation: ViewAnnotation, extension: ViewAnnotationExtension },
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

						// Cast field values into values that can be worked with.
						fieldValue = switch(e.expr) 
						{
							case EConst(CString(s)): s;
							case EArrayDecl(a) : a;
							case _: e.expr;
						}
						
						// If the field value is an array, all values inside
						// the array must also be converted.
						if (Std.is(fieldValue, Array))
						{
							var array : Array<Dynamic> = fieldValue;
							var j : Int = 0;
							
							for (value in array)
							{
								value = switch(value.expr)
								{
									case EConst(CString(s)): s;
									case _: e.expr;
								}
								
								array[j] = value;
								j++;
							}
							
							fieldValue = array;
						}
						
						Reflect.setField(data, paramNames.field, fieldValue);
						i++;
					}
				}
				
				Reflect.callMethod(validAnnotations[annotationName].extension, 
									Reflect.field(validAnnotations[annotationName].extension, "transform"), 
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
				untyped __js__("{1} ? new ng.ViewAnnotation({0}) : null", $v { annotationData[annotationKeys.indexOf("View")] }, $v{ annotationKeys.indexOf("View") > -1 } ),
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