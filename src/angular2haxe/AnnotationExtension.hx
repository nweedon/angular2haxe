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

class AnnotationExtension
{
	private function new() { }
	// Intended to be overridden in child class
	public static function transform(input : Dynamic, annotations : Array<Dynamic>, parameters : Array<Dynamic>) : Dynamic 
	{ 
		return input; 
	}
	
	public static function resolveInputAnnotation<T>(input : Dynamic, outputType : Class<T>) : T
	{
		var output : T;
		
		output = Type.createInstance(outputType, []);
		
		for (field in Reflect.fields(input))
		{
			if (Reflect.hasField(output, field))
			{
				Reflect.setField(output, field, Reflect.field(input, field));
			}
			else 
			{
				Trace.error('${Type.getClassName(outputType)} does not have field "${field}" and as such this field will be ignored.');
			}
		}
		
		return output;
	}
	
	public static function parseServiceParameters(injector : Dynamic) : Array<Dynamic>
	{
		var serviceParams : Array<Dynamic> = [];
		
		for (app in Reflect.fields(injector))
		{
			var appName : String = Reflect.field(injector, app);
			
			if (appName != null && appName.length > 0)
			{
				var cl = Type.resolveClass(appName);
				serviceParams.push(cl);
				Reflect.setField(injector, app, cl);
			}
		}
		
		return serviceParams;
	}
	
	public static function parseInjector(parameters : Array<Dynamic>, injector : Array<Dynamic>)
	{
		var serviceParameter : Array<Dynamic> = parseServiceParameters(injector);
		
		if (serviceParameter != null && serviceParameter.length > 0)
		{
			parameters.push(serviceParameter);
		}
	}
	
	public static function transformLifecycle(lifecycle : Array<Dynamic>)
	{
		// Transform lifecycle values
		var index : Int = 0;
		
		while (index < lifecycle.length)
		{
			lifecycle[index] = LifecycleEvent.toAngular(cast(lifecycle[index], String));
			index++;
		}
	}
}