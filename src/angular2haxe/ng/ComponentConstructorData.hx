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
package angular2haxe.ng;

/**
 * Reference: 
 * 		https://github.com/angular/angular/blob/master/modules/angular2/src/core/annotations_impl/annotations.ts
 * 
 * Notes:
 * 		- 'exportAs' is included in the constructor, but according to the source (25 July 2015),
 * 		doesn't do anything yet.
 */
class ComponentConstructorData
{
	public var selector 		: String 				= "";
	public var properties		: Array<String> 		= [];
	public var events 			: Array<String>			= [];
	public var host 			: Map<String, String>	= new Map<String, String>();
	public var lifecycle		: Array<Dynamic>		= [];
	public var hostInjector		: Array<Dynamic>		= [];
	public var exportAs			: String				= "";
	public var compileChildren 	: Bool					= true;
	public var changeDetection 	: String				= "DEFAULT";
	
	public function new() 
	{ 
	}
}