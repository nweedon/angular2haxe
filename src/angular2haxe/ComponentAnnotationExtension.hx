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

import angular2haxe.ComponentConstructorData;
import angular2haxe.LifecycleEvent;

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
	 * @return Angular 2 annotation constructor
	 */
	public static function transform(input : Dynamic, annotations : Array<Dynamic>, parameters : Array<Dynamic>) : ComponentConstructorData
	{
		var output : ComponentConstructorData = new ComponentConstructorData();
		
		for (field in Reflect.fields(input))
		{
			if (Reflect.hasField(output, field))
			{
				Reflect.setField(output, field, Reflect.field(input, field));
			}
			else 
			{
				Trace.error('ComponentConstructorData does not have field "${field}" and as such this field will be ignored.');
			}
		}
		
		// Transform appInjector to resolve to the
		// correct JavaScript classes.
		if (parameters != null && input.appInjector != null)
		{
			AnnotationExtension.parseInjector(parameters, output.appInjector);
		}
		
		if (parameters != null && input.viewInjector != null)
		{
			AnnotationExtension.parseInjector(parameters, output.viewInjector);
		}
		
		AnnotationExtension.transformLifecycle(output.lifecycle);
		
		return output;
	}
}