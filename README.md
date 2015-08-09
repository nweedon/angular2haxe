Haxe Language Bindings for Angular 2
===

I plan to expand this readme in the future, but below are a few pieces of info to let you know where I am currently at with the project:

* Currently working with version: alpha.33
* Heavily work-in-progress, API is subject to change as the Angular 2 API goes through development.
* View 'bin/index.html' (with a webserver) to see the current examples which work with these language bindings.
* The Haxe components required are in the 'src/angular2haxe' folders. Alternatively, install via haxelib.
* If you want to see the Haxe code which creates Angular 2 components, view 'src/Main.hx' and the code in the 'src/test' folder.

### Haxelib Installation
```
haxelib install angular2haxe 0.2.0
```
Also, add ```-lib angular2haxe``` to the build command of your project.

### Building components at build-time *(as of 0.3.0)*
Use the ```@:build``` component metadata to build the component
at build-time. All classes (except for Angular externs) will be resolved
at build-time so that the component does not have to be fully resolved when
the web page loads.

All test components build correctly, although this feature is still experimental.
If you find any problems, please let me know!

*Note:* for class names to resolve at build-time, the class needs to be imported. To
solve this, the library utilises a build registry, which holds all imports you want to
resolve. This doesn't come with the library by default, you must provide this yourself; if
you don't know how to do this, I recommend looking at BuildRegistry.hx.

Finally, to use the build registry, include the following on the command line:
```-D using_registry```

Example:
```
@Component({
	selector: 'c-greet',
	hostInjector: [
		"testcompile.Greeter"
	]
})
@View({
	template: "<c-needs-greeter>{{ greeter.greet('World') }}</c-needs-greeter>",
	directives: ["testcompile.NeedsGreeter"]
})
#if !macro
@:build(angular2haxe.buildplugin.BuildPlugin.build())
#end
class HelloWorld
{
	private var greeter : Greeter;
	
	public function new(greeter : Greeter) 
	{
		this.greeter = greeter;
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
	hostInjector: ["test.FriendsService"]
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
	hostInjector: [
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
