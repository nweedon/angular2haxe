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

import angular2haxe.KeyboardEvent;

@Directive({
	selector: 'input',
	lifecycle: ["onInit"],
	host: {
		'(keyup)' : 'onKeyUp($event)'
	}
})
@:expose
class InputDirective
{
	public function new() 
	{
		
	}
	
#if !macro
	public function onInit()
	{
		trace('InputDirective.onInit: ${this}');
	}
	
	public function onKeyUp(event : KeyboardEvent)
	{
		trace('You just pressed a key with key code: ${event.keyCode}!');
	}
#end
}