#/usr/bin/env sh
~/haxe-3.2.0/haxe -debug --each -cp src -js ./bin/angular2haxe.js -D using_registry -D debug_level=ERROR -main Main -dce full
mocha spec/runTests.js -t 5000