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

import angular2haxe.ng.ComponentConstructorData;
import angular2haxe.ng.LifecycleEvent;

class ComponentAnnotationExtension extends AnnotationExtension
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
	 * @return Angular 2 component annotation constructor
	 */
	public static function transform(input : Dynamic, annotations : Array<Dynamic>, parameters : Array<Dynamic>) : ComponentConstructorData
	{
		var output : ComponentConstructorData = AnnotationExtension.resolveInputAnnotation(input, ComponentConstructorData);	
		
		// Transform appInjector to resolve to the
		// correct JavaScript classes.
		if (parameters != null && output.viewBindings != null)
		{
			AnnotationExtension.parseInjector(parameters, output.viewBindings);
		}
		
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
	
	public static function postCompileTransform(data : ComponentConstructorData)
	{
		if (data != null)
		{
			var bindings : Array<Array<Dynamic>> = [data.viewBindings, data.bindings];
			
			for (binding in bindings)
			{
				if (binding != null)
				{
					var index : Int = 0;
					
					for (element in binding)
					{
						if (Std.is(element, String))
						{
							binding[index] = AngularExtension.getAngularClass(element);
						}
						
						index++;
					}
				}
			}
		}
		
		if (data.lifecycle != null)
		{
			AnnotationExtension.transformLifecycle(data.lifecycle);
		}
	}
}