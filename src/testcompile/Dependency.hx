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
package testcompile;

import angular2haxe.ng.Angular;
import angular2haxe.ng.EventEmitter;
import angular2haxe.Trace;

/*
 * Reference:
 * https://angular.io/docs/js/latest/api/annotations/DirectiveAnnotation-class.html
 * http://victorsavkin.com/post/119943127151/angular-2-template-syntax
 * 
 * Note: Events on Dependency and NgModelDirective classes are work-in-progress.
 */

@Directive({
	selector: '[c-dependency]',
	properties: [
		"id: c-dependency"
	],
	lifecycle: ["onInit"]
})
@:expose
class Dependency
{
	public var id : String;
	
    public function new()
    {
    }
	
	public function onInit()
	{
		Trace.log('Dependency.hx result:\n${this}');
	}
	
	public function onMouseEnter(event : Dynamic)
	{
		trace('onMouseEnter: ${id}');
	}
	
	public function onMouseLeave()
	{
		trace('onMouseLeave: ${id}');
	}
	
	public function onResize(event : Dynamic)
	{
		trace('resize ${event}');
	}
}