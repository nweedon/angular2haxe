#!/bin/bash
haxe -debug --each -cp src -js ./bin/Angular2-Haxe.js -D using_registry -D debug_level=ERROR -main Main -dce full
mocha runTests.js -t 5000