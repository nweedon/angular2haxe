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

import angular2haxe.ViewConstructorData;
import angular2haxe.AngularExtension;

#if macro
import angular2haxe.buildplugin.BuildPlugin;
#end

class ViewAnnotationExtension extends AnnotationExtension
{
	private function new() 
	{	
		super();
	}
	
	/**
	 * Transforms Haxe metadata input into valid Angular 2 annotation data.
	 * @param	input			- Haxe metadata
	 * @param	annotations		- annotations static field present in angular component
	 * @param	parameters		- parameters static field present in angular component
	 * @return Angular 2 view annotation constructor
	 */
	public static function transform(input : Dynamic, annotations : Array<Dynamic>, parameters : Array<Dynamic>) : ViewConstructorData
	{
		var output : ViewConstructorData = AnnotationExtension.resolveInputAnnotation(input, ViewConstructorData);
		var index : Int = 0;
		
		// Transform directive names was field[0]
		if (output.directives != null)
		{
			for (directive in output.directives)
			{
				if (directive != null && directive.length > 0)
				{
					// Possible issue using eval here? The field has to exist using
					// valid field characters, so is there even a possibility that a
					// vulnerability exists?
					directive = StringTools.htmlEscape(directive);
					
					// extern classes won't resolve
					#if macro
					var resolvedClass = BuildPlugin.resolveClass(directive);
					#else
					var resolvedClass = Type.resolveClass(directive);
					#end
					
					if (resolvedClass != null)
					{
						output.directives[index] = resolvedClass;
					}
					else
					{
						var angularClasses = AngularExtension.getAngularClasses();
						
						if (angularClasses.exists(directive))
						{
							output.directives[index] = angularClasses[directive];
						} 
						else
						{
							#if !macro
							Trace.error('The definition for ${directive} does not exist!');
							#end
						}
					}
				}
				
				index++;
			}
		}
		return output;
	}	
}