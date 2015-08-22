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

import angular2haxe.ng.DirectiveConstructorData;
import haxe.ds.StringMap;
import haxe.Json;
import haxe.macro.Expr;

class DirectiveAnnotationExtension extends AnnotationExtension
{
	public function new() 
	{
		super();
	}
	
	/**
	 * Transforms Haxe metadata input into valid Angular 2 annotation data.
	 * @param	input			- Haxe metadata
	 * @param	annotations		- annotations static field present in angular component
	 * @param	parameters		- parameters static field present in angular component
	 * @return Angular 2 directive annotation constructor
	 */
	@:keep
	public static function transform(input : Dynamic, annotations : Array<Dynamic>, parameters : Array<Dynamic>) : DirectiveConstructorData
	{
		#if !macro
			// Update host events. Metadata objects with a string as their
			// key have '@$__hx__' prefixed to them, so it needs to be removed.
			if (input.host != null)
			{
				var outputHost : Dynamic = { };
				// Iterate through input.host and strip prefixed
				// tag from all variables that have it.
				for (field in Reflect.fields(input.host))
				{
					var index : Int = field.indexOf("@$__hx__");
					
					if (index > -1) 
					{
						// Remove the prepended @$__hx__ and add
						// it to the new object.
						var key = field.substring(8);
						Reflect.setField(outputHost, key, Reflect.field(input.host, field));
					}
				}
				
				input.host = outputHost;
			}
		#end
		
		// Resolve final input.
		var output : DirectiveConstructorData = AnnotationExtension.resolveInputAnnotation(input, DirectiveConstructorData);
		
		if (parameters != null && output.bindings != null)
		{
			AnnotationExtension.parseInjector(parameters, output.bindings);
		}
		
		if (output.lifecycle != null)
		{
			AnnotationExtension.transformLifecycle(output.lifecycle);
		}
		
		return output;
	}
	
	@:keep
	public static function postCompileTransform(data : DirectiveConstructorData)
	{
		if (data != null)
		{
			if (data.bindings != null)
			{
				var index : Int = 0;
				
				for (element in data.bindings)
				{
					if (Std.is(element, String))
					{
						data.bindings[index] = AngularExtension.getAngularClass(element);
					}
					
					index++;
				}
			}
		
			if (data.lifecycle != null)
			{
				AnnotationExtension.transformLifecycle(data.lifecycle);
			}
		}
	}
}