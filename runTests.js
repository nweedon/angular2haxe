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
const specs = ['DirectiveAnnotation.spec.js', 'ComponentAnnotation.spec.js'];

// Launch webserver. Will be shut down automatically
// once mocha has finished.
connect().use(serveStatic(__dirname + "/bin/")).listen(port);

zombie.localhost('localhost', port);

// Run tests.
for(var spec of specs) {
	// Test compiled and non-compiled.
	for(var b of [false, true]) {
		const browser = new zombie({ 
			waitFor: 2000,
			loadCSS: false,
			runScripts: true
		});

		require('./spec/' + spec).spec(browser, expect, b);
	}
}