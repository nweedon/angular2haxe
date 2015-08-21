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
package;

import angular2haxe.ng.Angular;
import angular2haxe.Application;

import test.ChildComponent;
import test.Dependency;
import test.DependencyDisplayComponent;
import test.DisplayComponent;
import test.ParentComponent;
import test.TodoList;
import test.HelloWorld;
import test.InputDirective;

@:build(angular2haxe.buildplugin.BuildPlugin.app([ 
	testcompile.DisplayComponent,
	testcompile.TodoList,
	testcompile.ParentComponent,
	testcompile.ChildComponent,
	testcompile.MyDirective,			
	testcompile.NgModelDirective,			
	testcompile.Dependency,
	testcompile.DependencyDisplayComponent,
	testcompile.Greeter,
	testcompile.NeedsGreeter,
	testcompile.HelloWorld,
	testcompile.InputDirective
]))
class Main
{
    static function main()
	{
		// Create a new application, bootstrapping the
		// listed classes in the process.
		new Application([
			
			test.DisplayComponent,
			test.TodoList,
			test.ParentComponent,
			test.ChildComponent,
			
			// --- Dependency.hx ---
			test.MyDirective,			
			test.NgModelDirective,			
			test.Dependency,
			
			// --- DependencyDisplayComponent.hx --
			test.DependencyDisplayComponent,
			
			// --- HelloWorld.hx ---
			test.Greeter,
			test.NeedsGreeter,
			test.HelloWorld,
		
			test.InputDirective
			
		]);
    }
}