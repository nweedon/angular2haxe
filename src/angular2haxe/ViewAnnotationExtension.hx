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
import js.Lib;

class ViewAnnotationExtension extends AnnotationExtension
{
	private function new() 
	{	
		super();
	}
	
	public static function transform(input : Dynamic, annotations : Array<Dynamic>, parameters : Array<Dynamic>) : ViewConstructorData
	{
		var output : ViewConstructorData = AnnotationExtension.resolveInputAnnotation(input, ViewConstructorData);
		
		// Transform directive names was field[0]
		if (output.directives != null)
		{
			for (directive in Reflect.fields(output.directives))
			{
				var directiveName : String = Reflect.field(output.directives, directive);
				
				if (directiveName != null && directiveName.length > 0)
				{
					// Possible issue using eval here? The field has to exist using
					// valid field characters, so is there even a possibility that a
					// vulnerability exists?
					directiveName = StringTools.htmlEscape(directiveName);
					Reflect.setField(output.directives, directive, Lib.eval(directiveName));
				}
			}
		}
		return output;
	}	
}