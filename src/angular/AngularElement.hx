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
package angular;

import haxe.rtti.Meta;
import js.Lib;

class AngularElement
{
	private static var validAnnotations : Map<String, Class<Annotation>> = [
		"Component" => ComponentAnnotation,
		"View" 		=> ViewAnnotation
	];
	
    public function new(annotations : Array<Dynamic>, parameters : Array<Dynamic>)
    {
		if (annotations != null && annotations.length == 0)
		{
			var cl = Type.getClass(this);
			var anno = Meta.getType(cl);
				
			for(name in Reflect.fields(anno))
			{
				if (validAnnotations.exists(name))
				{
					var field = Reflect.field(anno, name);
					
					// Transform directive names
					if (field[0].directives != null)
					{
						for (directive in Reflect.fields(field[0].directives))
						{
							var directiveName : String = Reflect.field(field[0].directives, directive);
							
							if (directiveName != null && directiveName.length > 0)
							{
								// Possible issue using eval here? The field has to exist using
								// valid field characters, so is there even a possibility that a
								// vulnerability exists?
								directiveName = StringTools.htmlEscape(directiveName);
								Reflect.setField(field[0].directives, directive, Lib.eval(directiveName));
							}
						}
					}
					
					// Transform appInjector to resolve to the
					// correct JavaScript classes.
					if (parameters != null && field[0].appInjector != null)
					{
						var serviceParams : Array<Dynamic> = [];
						
						for (app in Reflect.fields(field[0].appInjector))
						{
							var appName : String = Reflect.field(field[0].appInjector, app);
							
							if (appName != null && appName.length > 0)
							{
								var cl = Type.resolveClass(appName);
								serviceParams.push(cl);
								Reflect.setField(field[0].appInjector, app, cl);
							}
						}
						
						if (serviceParams.length > 0)
						{
							parameters.push(serviceParams);
						}
					}
					
					annotations.push(Type.createInstance(validAnnotations[name], [field[0]]));
				}
				else
				{
					untyped
					{
						console.error(name + " is not a valid annotation.");
					}
				}
			}
			
			// Add event listener for Angular Bootstrap
			js.Browser.document.addEventListener("DOMContentLoaded", function()
			{
				var className = Type.getClassName(cl);
				trace('--- Bootstrapping ${className} ---');
				trace('Annotations:\n${annotations}');
				trace('Parameters:\n${parameters}');
				Angular.bootstrap(cl);
			});
		}
    }
}