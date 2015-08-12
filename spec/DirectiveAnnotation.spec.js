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
	let desc = 'DirectiveAnnotation parsing';

	if(compiled) {
		desc += ' (Compiled)';
	} 

	describe(desc, function() {
		let meta = { };
		let anno = { };
		let params = { };

		before(function(done) {
			browser.visit('/index.html', { debug: false }, function() {
				let ns = 'test';
				let packs = ["NeedsGreeter", "InputDirective", "Dependency"];

				if(compiled) {
					ns += 'compile';
				}
				
				for(var pack of packs) {
					meta[pack] 		= browser.window[ns][pack].__meta__.obj;
					anno[pack] 		= browser.window[ns][pack].annotations;
					params[pack] 	= browser.window[ns][pack].parameters;
				}

				done();
			});
	  	});

		// Selector conversion.
		// Should be one-to-one mapping (String -> String)
	  	it('selector', function() {
	  		if(!compiled) {
				expect(meta["NeedsGreeter"].Directive.length).to.eql(1);
			}

			expect(anno["NeedsGreeter"].length).to.eql(1);
			expect(anno["NeedsGreeter"][0]).not.to.be(null);
			expect(anno["NeedsGreeter"][0].selector).not.to.be(null);
	  		expect(meta["NeedsGreeter"].Directive[0].selector).to.eql(anno["NeedsGreeter"][0].selector);
	  	});

	  	// Properties conversion.
	  	// Should be Array<String> -> Array<String> mapping
	  	it('properties', function() {
	  		if(!compiled) {
	  			expect(meta["Dependency"].Directive[0].properties).not.to.be(null);
	  			expect(meta["Dependency"].Directive[0].properties).to.be.an('array');
	  			expect(meta["Dependency"].Directive[0].properties).to.eql([ "id: dependency" ]);
	  		}

	  		expect(anno["Dependency"][0].properties).not.to.be(null);
  			expect(anno["Dependency"][0].properties).to.be.an('array');

  			if(compiled) {
  				expect(anno["Dependency"][0].properties).to.eql([ "id: c-dependency" ]);	
  			} else {
  				expect(anno["Dependency"][0].properties).to.eql([ "id: dependency" ]);	
  			}
	  	});

	  	it('events');

		// Host conversion.
		// Should be Map<String, String> -> Map<String, String>
		// angular2haxe removes prefixed $__hx__ from keys that are strings.
		it('host', function() {
			if(!compiled) {
				expect(meta["InputDirective"].Directive[0].host).not.to.be(null);
				expect(meta["InputDirective"].Directive[0].host['(keyup)']).not.to.be(null);
				expect(meta["InputDirective"].Directive[0].host['(keyup)']).to.eql('onKeyUp($event)');
			}

			expect(anno["InputDirective"]).not.to.be(null);
			expect(anno["InputDirective"].length).to.eql(1);
			expect(anno["InputDirective"][0]).not.to.be(null);
			expect(anno["InputDirective"][0].host).not.to.be(null);
			expect(anno["InputDirective"][0].host['(keyup)']).not.to.be(null);
			expect(anno["InputDirective"][0].host['(keyup)']).to.eql('onKeyUp($event)');
		});

		// Lifecycle conversion.
		// Should be Array<String> -> Array<ng.LifecycleEvent.(String)>
		it('lifecycle', function() {
			// Meta checks
			if(!compiled) {
				expect(meta["InputDirective"].Directive[0].lifecycle).not.to.be(null);
				expect(meta["InputDirective"].Directive[0].lifecycle.length).to.eql(4);
				expect(meta["InputDirective"].Directive[0].lifecycle).to.eql([
					"onInit", 
					"onChange", 
					"onAllChangesDone", 
					"onCheck"
				]);
			}

			// Annotation checks
			expect(anno["InputDirective"]).not.to.be(null);
			expect(anno["InputDirective"].length).to.eql(1);
			expect(anno["InputDirective"][0]).not.to.be(null);
			expect(anno["InputDirective"][0].lifecycle).not.to.be(null);
			expect(anno["InputDirective"][0].lifecycle.length).to.eql(meta["InputDirective"].Directive[0].lifecycle.length);
			expect(anno["InputDirective"][0].lifecycle).to.eql([
				browser.window.ng.LifecycleEvent.onInit,
				browser.window.ng.LifecycleEvent.onChange,
				browser.window.ng.LifecycleEvent.onAllChangesDone,
				browser.window.ng.LifecycleEvent.onCheck
			]);
		});

	  	// HostInjector conversion.
	  	// Should be String -> Function mapping
		it('hostInjector', function() {
			// Original Metadata
			if(!compiled) {
				expect(meta["NeedsGreeter"].Directive.length).to.eql(1);
				expect(meta["NeedsGreeter"].Directive[0].hostInjector.length).to.eql(1);
				expect(meta["NeedsGreeter"].Directive[0].hostInjector[0]).to.be.a('string');
				expect(meta["NeedsGreeter"].Directive[0].hostInjector[0]).to.eql('test.Greeter');
			}

			// Parsed data
			var expectedName = meta["NeedsGreeter"].Directive[0].hostInjector[0].split('.');
			expect(anno["NeedsGreeter"].length).to.eql(1);
			expect(anno["NeedsGreeter"][0]).not.to.be(null);
			expect(anno["NeedsGreeter"][0].hostInjector).not.to.be(null);
			expect(anno["NeedsGreeter"][0].hostInjector.length).to.eql(1);
			expect(anno["NeedsGreeter"][0].hostInjector[0]).to.be.a('function');
			expect(anno["NeedsGreeter"][0].hostInjector[0].__name__).to.eql(expectedName);
		});

		// ExportAs conversion.
		// Should be String -> String mapping
		it('exportAs', function() {
			if(!compiled) {
				expect(meta["InputDirective"].Directive[0].exportAs).not.to.be(null);
				expect(meta["InputDirective"].Directive[0].exportAs).to.be.a('string');
				expect(meta["InputDirective"].Directive[0].exportAs).to.eql('input-directive');
			}

			expect(anno["InputDirective"][0].exportAs).not.to.be(null);
			expect(anno["InputDirective"][0].exportAs).to.be.a('string');
			expect(anno["InputDirective"][0].exportAs).to.eql('input-directive');
		});

		// CompileChildren conversion. (Defaults to true)
		// Should be Bool -> Bool mapping
		it('compileChildren', function() {
			expect(anno["InputDirective"][0].compileChildren).not.to.be(null);
			expect(anno["InputDirective"][0].compileChildren).to.be.a('boolean');
			expect(anno["InputDirective"][0].compileChildren).to.eql(true);
		});
	});

};