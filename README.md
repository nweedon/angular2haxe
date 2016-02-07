Haxe Language Bindings for Angular 2
===
[![Build Status](https://travis-ci.org/nweedon/angular2haxe.svg?branch=rewrite-with-hxdecorate)](https://travis-ci.org/nweedon/angular2haxe)
[![Haxelib](https://img.shields.io/github/tag/nweedon/angular2haxe.svg?style=flat&label=haxelib)](http://lib.haxe.org/p/angular2haxe/)

* Supported Angular 2 version: beta.x
* Heavily work-in-progress, API is subject to change as the Angular 2 API goes through development.

### Haxelib Installation
This branch is not currently available via haxelib.

### Use
```haxe
import angular2haxe.impl.Angular;
import test.TestApp;
import test.HelloWorld;
import test.BadClass;
import test.BadClass2;

// Call the builder to configure the application
// at build-time.
@:build(angular2haxe.Builder.build([
    'test.TestApp',
    'test.HelloWorld',
    'test.BadClass',
    'test.BadClass2'
]))
class Main {

    static function main() {
        // Bootstrap your application class
        Angular.bootstrap(TestApp);
    }

}
```
