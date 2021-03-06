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
package test;

import angular2haxe.buildplugin.BuildPlugin;

/**
 * Reference(s): 
 * 		https://angular.io/docs/js/latest/api/annotations/DirectiveAnnotation-class.html
 * 
 * Uses:
 * 		Directive => hostInjector
 * 		Component => hostInjector
 */

@:expose
@:keep
class Greeter
{	
	public function new() { }
	public function greet(name : String)
	{
		return 'Hello ${name}!';
	}
}

@Directive({
	selector: 'needs-greeter',
	bindings: [
		"test.Greeter"
	]
})
@:expose
@:keep
class NeedsGreeter
{
	private var greeter : Greeter;
	
	public function new(greeter : Greeter)
	{
		this.greeter = greeter;
	}
}

@Component({
	selector: 'greet',
	viewBindings: [
		"test.Greeter"
	],
	exportAs: 'componentGreet'
})
@View({
	template: "<needs-greeter>{{ greeter.greet('World') }}</needs-greeter>",
	directives: ["test.NeedsGreeter"],
	encapsulation: "NONE"
})
@:expose
@:keep
class HelloWorld
{
	private var greeter : Greeter;
	
	public function new(greeter : Greeter) 
	{
		this.greeter = greeter;
	}
}