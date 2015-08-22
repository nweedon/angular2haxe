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

import angular2haxe.ng.EventEmitter;
import angular2haxe.Trace;

@Directive({
	selector: '[ng-model]',
	properties: ['ngModel']
})
@:expose
class NgModelDirective
{
	private var ngModel : String = "";
	private var ngModelChanged : EventEmitter = new EventEmitter();
	
	public function new()
	{
	}
	
	public function modelChanged(event : Dynamic)
	{
		Trace.log(event);
		ngModelChanged.next(event.target.value);
	}
}