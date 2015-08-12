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
package angular2haxe;

import angular2haxe.buildplugin.BuildPlugin;
import angular2haxe.ng.ComponentAnnotation;
import angular2haxe.ng.DirectiveAnnotation;
import angular2haxe.ng.ViewAnnotation;

// Type.resolveClass in macro works if type is imported
//import test.HelloWorld;

class AnnotationExtension
{
	private function new() { }
	
	// Intended to be overridden in child class
	public static function transform(input : Dynamic, annotations : Array<Dynamic>, parameters : Array<Dynamic>) : Dynamic 
	{ 
		return input; 
	}
	
	/**
	 * Resolve Haxe metadata input to the form Angular
	 * expects, checking that the fields are of the 
	 * correct type.
	 */
	public static function resolveInputAnnotation<T>(input : Dynamic, outputType : Class<T>) : T
	{
		var output : T;
		
		output = Type.createInstance(outputType, []);
		
		for (field in Reflect.fields(input))
		{
			if (Reflect.hasField(output, field))
			{
				var inputField = Reflect.field(input, field);
				var outputClass = Type.getClass(Reflect.field(output, field));
				
				// If outputClass is null, the output class is most likely Dynamic
				if (Std.is(inputField, outputClass) || outputClass == null)
				{
					var result = null;
					#if !macro
						// Deep copy array objects, so original meta is
						// preserved.
						// Reference: https://gist.github.com/Asmageddon/4013485
						if (Std.is(inputField, Array)) 
						{
							result = Type.createInstance(outputClass, []);
							
							untyped
							{
								for (i in 0...inputField.length)
								{
									result.push(inputField[i]);
								}
							}
						}
						else
						{
							result = inputField;
						}
					#else
						result = inputField;
					#end
					
					Reflect.setField(output, field, result);
				} 
				else 
				{
					var inputClassName : String = Type.getClassName(Type.getClass(inputField));
					var outputClassName : String = Type.getClassName(outputClass);
					Trace.error('Input type of field "${field}" (${inputClassName}) does not match type of output field (${outputClassName}).');
				}
			}
			else 
			{
				Trace.error('${Type.getClassName(outputType)} does not have field "${field}" and as such this field will be ignored.');
			}
		}
		
		return output;
	}
	
	/**
	 * Parse annotation injectors to be used in the Angular, resolving
	 * strings to their respective class/type.
	 * service parameters.
	 * @param	injector	Annotation injector variable (i.e. hostInjector).
	 * @return
	 */
	private static function parseServiceParameters(injector : Array<Dynamic>) : Array<Dynamic>
	{
		var serviceParams : Array<Dynamic> = [];
		var index : Int = 0;
		
		for (app in injector)
		{
			if (app != null && app.length > 0)
			{
				var cl = Type.resolveClass(app);
				serviceParams.push(cl);
				injector[index] = cl;
			}
			
			index++;
		}
		return serviceParams;
	}
	
	/**
	 * Parses an annotation injector variable. Most of the work in this instance is
	 * deferred to AnnotationExtension.parseServiceParameters.
	 * @param	parameters	Static variable of the same name located in an Angular class.
	 * @param	injector 	The injector variable to parse.
	 */
	private static function parseInjector(parameters : Array<Dynamic>, injector : Array<Dynamic>)
	{
		var serviceParameter : Array<Dynamic> = parseServiceParameters(injector);
		
		if (serviceParameter != null && serviceParameter.length > 0)
		{
			parameters.push(serviceParameter);
		}
	}
	
	/**
	 * Transform lifecycle variable names (String) to Angular
	 * lifecycle variables (JS Object).
	 * @param	lifecycle
	 */
	private static function transformLifecycle(lifecycle : Array<Dynamic>)
	{
		// Transform lifecycle values
		var index : Int = 0;
		
		while (index < lifecycle.length)
		{
			lifecycle[index] = LifecycleEventExtension.toAngular(cast(lifecycle[index], String));
			index++;
		}
	}
}