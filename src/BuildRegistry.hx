package;

import test.ChildComponent;
import test.Dependency;
import test.DependencyDisplayComponent;
import test.FriendsService;
import test.HelloWorld;
import test.InputDirective;
import test.ParentComponent;
import test.TodoList;

import testcompile.ChildComponent;
import testcompile.Dependency;
import testcompile.DependencyDisplayComponent;
import testcompile.DisplayComponent;
import testcompile.FriendsService;
import testcompile.HelloWorld;
import testcompile.InputDirective;
import testcompile.ParentComponent;
import testcompile.TodoList;
import testcompile.MyDirective;
import testcompile.NgModelDirective;
import testcompile.NeedsGreeter;
import testcompile.Greeter;

/**
 * Dummy build registry to demonstrate
 * compile-time builds. It's main use is
 * to be a hub for all imports which will be
 * resolved as part of the build process.
 */
class BuildRegistry
{
	private function new() 
	{
		
	}
}