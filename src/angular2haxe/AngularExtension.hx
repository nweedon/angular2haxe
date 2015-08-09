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

import angular2haxe.ng.NgFor;
import angular2haxe.ng.NgIf;

class AngularExtension
{
	private static var angularClasses : Map<String, Class<Dynamic>> = [
		"NgFor" => NgFor,
		"NgIf"	=> NgIf
	];
		
	private function new() { }
	
	public static function getAngularClasses() : Map<String, Class<Dynamic>>
	{	
		return angularClasses;
	}
	
	public static function getAngularClass(name : String) : Class<Dynamic>
	{
		if (angularClasses.exists(name))
		{
			return angularClasses[name];
		}
		
		return null;
	}
	
	public static function isAngularClass(name : String) : Bool
	{		
		if (name.substr(0, 3) == "ng." || name.substr(0, 8) == "angular.")
		{
			name = getFullyQualifiedName(name);
		}
		
		return angularClasses.exists(name);
	}
	
	public static function getBareName(name : String) : String
	{
		if (name.substr(0, 3) == "ng.")
		{
			return name;
		}
		else if (name.substr(0, 8) == "angular.")
		{
			return name.substr(8);
		}
		
		return name;
	}
	
	public static function getFullyQualifiedName(name : String) : String
	{
		if (isAngularClass(name)) 
		{
			return name;
		}
		
		return "ng." + getBareName(name);
	}
}