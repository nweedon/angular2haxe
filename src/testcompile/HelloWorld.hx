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

import angular2haxe.buildplugin.BuildPlugin;

/**
 * Reference(s): 
 * 		https://angular.io/docs/js/latest/api/annotations/DirectiveAnnotation-class.html
 * 
 * Uses:
 * 		Directive => hostInjector
 * 		Component => hostInjector
 */

@Component({
	selector: 'c-greet',
	viewBindings: [
		"testcompile.Greeter"
	],
	exportAs: 'componentGreet'
})
@View({
	template: "<c-needs-greeter>{{ greeter.greet('World') }}</c-needs-greeter>",
	directives: ["testcompile.NeedsGreeter"],
	encapsulation: "NONE"
})
@:expose
class HelloWorld
{
	private var greeter : Greeter;
	
	public function new(greeter : Greeter) 
	{
		this.greeter = greeter;
	}
}