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
/*
> IO.JS version 3.0.0
Basic webserver to serve files during tests
	Reference: http://stackoverflow.com/questions/6084360/using-node-js-as-a-simple-web-server

> Run with:
	mocha runTests.js -t 5000

> Requires:
	- connect
	- serve-static
	- zombie@4.0.13
	- mocha
	- expect.js
*/
"use strict"
const zombie = require('zombie');
const expect = require('expect.js');
const connect = require('connect');
const serveStatic = require('serve-static');
const port = 8080;
const specs = ['ComponentMetadata.spec.js'];

// Launch webserver. Will be shut down automatically
// once mocha has finished.
connect().use(serveStatic(__dirname + "/../bin/")).listen(port);

// As of Angular 2.0.0-alpha.35, the following message is displayed:
// TypeError: Array.prototype.slice called on null or undefined
// This is due to ZombieJS not refreshing its own DOM structure. Once
// Angular compiles its' children, it expects that they should be present
// in the DOM, however, as ZombieJS doesn't refresh the DOM, they
// don't exist.
zombie.silent = true;
zombie.localhost('localhost', port);

// Run spec tests.
for(var spec of specs) {
    const browser = new zombie({
        waitFor: 2000,
        loadCSS: false,
        runScripts: true
    });

    require('./' + spec).spec(browser, expect);
}
