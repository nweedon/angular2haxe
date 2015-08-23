Haxe Language Bindings for Angular 2
===
[![Build Status](https://travis-ci.org/nweedon/angular2haxe.svg?branch=master)](https://travis-ci.org/nweedon/angular2haxe)
[![Haxelib](https://img.shields.io/github/tag/nweedon/angular2haxe.svg?style=flat&label=haxelib)](http://lib.haxe.org/p/angular2haxe/)

* Supported Angular 2 version: alpha.35
* Heavily work-in-progress, API is subject to change as the Angular 2 API goes through development.

### Haxelib Installation
* Stable: ```haxelib install angular2haxe 0.3.2```

Also, add ```-lib angular2haxe``` to the build command of your project.

### Building the demo project
Run ```build.bat``` on Windows or ```./build.sh``` on Linux. This will build a demo project and run
the current suite of tests. You can then launch a webserver targetting the build folder and visit
the servers' configured address to view a selection of demo components.

*Note:* Currently, you must have an active internet connection for the tests to run correctly,
as the demo webpage accesses the Angular 2 library files.

### Building components at build-time *(as of 0.3.0)*
Use the ```@:build``` component metadata to build the component
at build-time. All classes (except for Angular externs) will be resolved
at build-time so that the component does not have to be fully resolved when
the web page loads.

*Change from 0.3.0-alpha*: All components can now be bootstrapped via the
main class (see example below). The old way of compiling components will still work.

*Note:* for class names to resolve at build-time, the class needs to be imported. To
solve this, the library utilises a build registry, which holds all imports you want to
resolve. This doesn't come with the library by default, you must provide this yourself; if
you don't know how to do this, I recommend looking at BuildRegistry.hx.

Finally, to use the build registry, include the following on the command line:
```-D using_registry```

Example:
```
@:build(angular2haxe.buildplugin.BuildPlugin.app([ 
	testcompile.DisplayComponent,
	testcompile.TodoList,
	// ... other class names (as strings or class names, fully qualified)
]))
class Main
{
    static function main()
	{
		...
	}
}
```

### Creating an application
Creating an application this way allows you to import and bootstrap all of your components with ease. All data transformation (from Haxe metadata to Angular annotations) is done under the hood! (See 'src/Main.hx').
```
import angular2haxe.Application

class Main
{
    static function main()
    {
  		new Application([
    		
    	  // List of class names which are Angular 2 components
  			
  		]);
    }
}
```

### Creating a component (@Component and @View annotations)
Creating components is pretty much the same as it is in ES6/TypeScript, with a few slight changes due to limitations with Haxe metadata.

**Currently tested metadata for @Component annotation:**
* selector
* lifecycle ("onInit", "onCheck", "onAllChangesDone")
* hostInjector *(Note: class names must be surrounded in double-quotes)*
* compileChildren

**Implemented but untested metadata for @Component annotation:**
* lifecycle (onChange, onDestroy)

*Make sure to use the @:expose metadata tag on classes you wish to import!*

**Currently tested metadata for @View annotation:**
* directives *(Note: class names must be surrounded in double-quotes)*
* template
* templateUrl

```
@Component({ 
	selector: 'display',
	viewBindings: ["test.FriendsService"]
})
@View({ 
	directives: ["angular.NgFor", "angular.NgIf"],
	template: '<p>My name: {{ myName }}</p><p>Friends:</p><ul><li *ng-for="#name of names">{{ name }}</li></ul><p *ng-if="names.length > 3">You have many friends!</p>'
})
class DisplayComponent
{
  public function new(?friends : FriendsService)
  {
    // ...  
  }
}
```

### Creating a directive (@Directive annotation)
Creating a directive is again similar to the way components and views are created with Haxe. View the example below, which injects a service (via component-level injection) into the directive.

**Currently tested metadata for @Directive annotation:**
* selector
* hostInjector *(Note: class names must be surrounded in double-quotes)*
* properties
* lifecycle ("onInit", "onCheck", "onAllChangesDone")

**Implemented but untested metadata for @Directive annotation:**
* lifecycle (onChange, onDestroy)

```
@:expose
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
class NeedsGreeter
{
	private var greeter : Greeter;
	
	public function new(greeter : Greeter)
	{
		this.greeter = greeter;
	}
}
```
