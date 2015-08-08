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
import angular2haxe.Trace;
/* Import all used classes here! */
import test.HelloWorld;
/* --- */

class BuildPlugin
{	
	private function new() 
	{
		
	}
	
	/**
	 * Resolve class by name at build time. Classes will resolve if
	 * they are imported explicitly in this file.
	 * @param	name 	Fully-qualified name of the class to resolve (including package names).
	 * @return	Class representation of the name provided. If the class doesn't resolve, an error is thrown.
	 */
	public static function resolveClass(name : String) : Class<Dynamic>
	{
		var cl : Class<Dynamic> = Type.resolveClass(name);
		
		if (cl == null)
		{
			Trace.error('${name} has not resolved to a class. Make sure it is imported in the BuildPlugin file.');
		}
		
		return cl;
	}
}
#end