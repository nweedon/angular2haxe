package;
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

import angular2haxe.Angular;
import angular2haxe.Application;
import test.ChildComponent;
import test.Dependency;
import test.DependencyDisplayComponent;
import test.DisplayComponent;
import test.ParentComponent;
import test.TodoList;
import test.HelloWorld;
import test.InputDirective;

class Main
{
    static function main()
	{
		// Create a new application, bootstrapping the
		// listed classes in the process.
		new Application([
			
			DisplayComponent,
			TodoList,
			ParentComponent,
			ChildComponent,
			
			// --- Dependency.hx ---
			MyDirective,			
			NgModelDirective,			
			Dependency,
			
			// --- DependencyDisplayComponent.hx --
			DependencyDisplayComponent,
			
			// --- HelloWorld.hx ---
			Greeter,
			NeedsGreeter,
			HelloWorld,
		
			InputDirective
			
		]);
    }
}