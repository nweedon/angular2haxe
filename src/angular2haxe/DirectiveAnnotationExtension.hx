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

import angular2haxe.DirectiveConstructorData;
import haxe.ds.StringMap;
import haxe.Json;

class DirectiveAnnotationExtension extends AnnotationExtension
{
	public function new() 
	{
		super();
	}
	
	public static function transform(input : Dynamic, annotations : Array<Dynamic>, parameters : Array<Dynamic>) : DirectiveConstructorData
	{
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
		
		// Resolve final input.
		var output : DirectiveConstructorData = AnnotationExtension.resolveInputAnnotation(input, DirectiveConstructorData);
		
		if (parameters != null && output.hostInjector != null)
		{
			AnnotationExtension.parseInjector(parameters, output.hostInjector);
		}
		
		if (output.lifecycle != null)
		{
			AnnotationExtension.transformLifecycle(output.lifecycle);
		}
		
		return output;
	}
}