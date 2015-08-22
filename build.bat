@echo OFF

haxe -debug --each -cp src -js ./bin/Angular2-Haxe.js -D using_registry -D debug_level=ERROR -main Main -dce full
mocha spec/runTests.js -t 5000