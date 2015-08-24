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
"use strict"
module.exports = { };

module.exports.spec = function(browser, expect, compiled) {
	let desc = 'ComponentMetadata parsing';

	if(compiled) {
		desc += ' (Compiled)';
	} 

	describe(desc, function() {
		let meta = { };
		let anno = { };
		let params = { };
		let alreadyConstructed = { };

		before(function(done) {
			browser.visit('/index.html', { debug: false }, function() {
				let ns = 'test';
				let packs = ["HelloWorld", "TodoList"];

				if(compiled) {
					ns += 'compile';
				}
				
				for(var pack of packs) {
					anno[pack] 					= browser.window[ns][pack].annotations;
					params[pack] 				= browser.window[ns][pack].parameters;
					alreadyConstructed[pack] 	= browser.window[ns][pack].__alreadyConstructed;

					if(!compiled) {
						meta[pack] = browser.window[ns][pack].__meta__.obj;
					}
				}

				done();
			});
	  	});

		// Selector conversion.
		// Should be one-to-one mapping (String -> String)
	  	it('selector', function() {
	  		var expectedSelector;

	  		if(!compiled) {
				expect(meta["HelloWorld"].Component.length).to.eql(1);
				expectedSelector = 'greet';
			} else {
				expect(alreadyConstructed["HelloWorld"]).to.be.a('boolean');
				expect(alreadyConstructed["HelloWorld"]).to.eql(true);
				expectedSelector = 'c-greet';
			}

			expect(anno["HelloWorld"].length).to.eql(2);
			expect(anno["HelloWorld"][0]).not.to.be(null);
			expect(anno["HelloWorld"][0].selector).not.to.be(null);
	  		expect(anno["HelloWorld"][0].selector).to.eql(expectedSelector);
	  	});

	  	// Properties conversion.
	  	// Should be Array<String> -> Array<String> mapping
	  	it('properties', function() {
	  		if(!compiled) {
	  			expect(meta["TodoList"].Component[0].properties).not.to.be(null);
	  			expect(meta["TodoList"].Component[0].properties).to.be.an('array');
	  			expect(meta["TodoList"].Component[0].properties).to.eql([ "lastValue", "todos" ]);
	  		} else {
				expect(alreadyConstructed["TodoList"]).to.be.a('boolean');
				expect(alreadyConstructed["TodoList"]).to.eql(true);
			}

	  		expect(anno["TodoList"][0].properties).not.to.be(null);
  			expect(anno["TodoList"][0].properties).to.be.an('array');
			expect(anno["TodoList"][0].properties).to.eql([ "lastValue", "todos" ]);
	  	});

	  	it('events');

		// Host conversion.
		// Should be Map<String, String> -> Map<String, String>
		// angular2haxe removes prefixed $__hx__ from keys that are strings.
		it('host');

		// Lifecycle conversion.
		// Should be Array<String> -> Array<ng.LifecycleEvent.(String)>
		it('lifecycle', function() {
			// Meta checks
			if(!compiled) {
				expect(meta["TodoList"].Component[0].lifecycle).not.to.be(null);
				expect(meta["TodoList"].Component[0].lifecycle.length).to.eql(4);
				expect(meta["TodoList"].Component[0].lifecycle).to.eql([
					"onInit", 
					"onChange", 
					"onAllChangesDone", 
					"onCheck"
				]);
			} else {
				expect(alreadyConstructed["TodoList"]).to.be.a('boolean');
				expect(alreadyConstructed["TodoList"]).to.eql(true);
			}

			// Annotation checks
			expect(anno["TodoList"]).not.to.be(null);
			expect(anno["TodoList"].length).to.eql(2);
			expect(anno["TodoList"][0]).not.to.be(null);
			expect(anno["TodoList"][0].lifecycle).not.to.be(null);
			expect(anno["TodoList"][0].lifecycle.length).to.eql(4);
			expect(anno["TodoList"][0].lifecycle).to.eql([
				browser.window.ng.LifecycleEvent.onInit,
				browser.window.ng.LifecycleEvent.onChange,
				browser.window.ng.LifecycleEvent.onAllChangesDone,
				browser.window.ng.LifecycleEvent.onCheck
			]);
		});

	  	// Bindings conversion.
	  	// Should be String -> Function mapping
		it('bindings');

		// ExportAs conversion.
		// Should be String -> String mapping
		it('exportAs', function() {
			if(!compiled) {
				expect(meta["HelloWorld"].Component[0].exportAs).not.to.be(null);
				expect(meta["HelloWorld"].Component[0].exportAs).to.be.a('string');
				expect(meta["HelloWorld"].Component[0].exportAs).to.eql('componentGreet');
			} else {
				expect(alreadyConstructed["HelloWorld"]).to.be.a('boolean');
				expect(alreadyConstructed["HelloWorld"]).to.eql(true);
			}

			expect(anno["HelloWorld"][0].exportAs).not.to.be(null);
			expect(anno["HelloWorld"][0].exportAs).to.be.a('string');
			expect(anno["HelloWorld"][0].exportAs).to.eql('componentGreet');
		});

		// CompileChildren conversion. (Defaults to true)
		// Should be Bool -> Bool mapping
		it('compileChildren', function() {
			expect(anno["HelloWorld"][0].compileChildren).not.to.be(null);
			expect(anno["HelloWorld"][0].compileChildren).to.be.a('boolean');
			expect(anno["HelloWorld"][0].compileChildren).to.eql(true);
		});

		it('viewBindings', function() {
			var expectedName;

			// Original Metadata
			if(!compiled) {
				expect(meta["HelloWorld"].Component.length).to.eql(1);
				expect(meta["HelloWorld"].Component[0].viewBindings.length).to.eql(1);
				expect(meta["HelloWorld"].Component[0].viewBindings[0]).to.be.a('string');
				expect(meta["HelloWorld"].Component[0].viewBindings[0]).to.eql('test.Greeter');
				expectedName = ["test", "Greeter"];
			} else {
				expect(alreadyConstructed["HelloWorld"]).to.be.a('boolean');
				expect(alreadyConstructed["HelloWorld"]).to.eql(true);
				expectedName = ["testcompile", "Greeter"];
			}

			expect(anno["HelloWorld"].length).to.eql(2);
			expect(anno["HelloWorld"][0]).not.to.be(null);
			expect(anno["HelloWorld"][0].viewBindings).not.to.be(null);
			expect(anno["HelloWorld"][0].viewBindings.length).to.eql(1);
			expect(anno["HelloWorld"][0].viewBindings[0]).to.be.a('function');
			expect(anno["HelloWorld"][0].viewBindings[0].__name__).to.eql(expectedName);
		});

		// CompileChildren conversion. (Defaults to "DEFAULT")
		// Should be String -> String mapping
		it('changeDetection', function() {
			if(!compiled) {
				expect(meta["TodoList"].Component.length).to.eql(1);
				expect(meta["TodoList"].Component[0].changeDetection).not.to.be(null);
				expect(meta["TodoList"].Component[0].changeDetection).to.be.a('string');
				expect(meta["TodoList"].Component[0].changeDetection).to.eql('CHECK_ALWAYS');
			} else {
				expect(alreadyConstructed["TodoList"]).to.be.a('boolean');
				expect(alreadyConstructed["TodoList"]).to.eql(true);
			}

			expect(anno["HelloWorld"][0].changeDetection).not.to.be(null);
			expect(anno["HelloWorld"][0].changeDetection).to.be.a('string');
			expect(anno["HelloWorld"][0].changeDetection).to.eql('DEFAULT');
			expect(anno["TodoList"][0].changeDetection).not.to.be(null);
			expect(anno["TodoList"][0].changeDetection).to.be.a('string');
			expect(anno["TodoList"][0].changeDetection).to.eql('CHECK_ALWAYS');
		});
	});

};