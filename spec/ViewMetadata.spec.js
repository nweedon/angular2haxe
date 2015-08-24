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
	let desc = 'ViewMetadata parsing';

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
				let packs = ["HelloWorld", "TodoList", "DependencyDisplayComponent"];

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

	  	// TemplateUrl conversion.
	  	// Should be String -> String mapping
	  	it('templateUrl', function() {
	  		if(!compiled) {
				expect(meta["DependencyDisplayComponent"].View.length).to.eql(1);
				expect(meta["DependencyDisplayComponent"].View[0].templateUrl).not.to.be(null);
				expect(meta["DependencyDisplayComponent"].View[0].templateUrl).to.be.a('string');
				expect(meta["DependencyDisplayComponent"].View[0].templateUrl).to.eql("templates/dependency.tpl.html");
			} else {
				expect(alreadyConstructed["DependencyDisplayComponent"]).to.be.a('boolean');
				expect(alreadyConstructed["DependencyDisplayComponent"]).to.eql(true);
			}

			expect(anno["DependencyDisplayComponent"].length).to.eql(2);
			expect(anno["DependencyDisplayComponent"][1]).not.to.be(null);
			expect(anno["DependencyDisplayComponent"][1].templateUrl).not.to.be(null);
			expect(anno["DependencyDisplayComponent"][1].templateUrl).to.be.a('string');
  			expect(anno["DependencyDisplayComponent"][1].templateUrl).to.eql("templates/dependency.tpl.html");
	  	});

		// Template conversion.
		// Should be one-to-one mapping (String -> String)
	  	it('template', function() {
	  		if(!compiled) {
				expect(meta["HelloWorld"].View.length).to.eql(1);
				expect(meta["HelloWorld"].View[0].template).not.to.be(null);
				expect(meta["HelloWorld"].View[0].template).to.be.a('string');
				expect(meta["HelloWorld"].View[0].template).to.eql("<needs-greeter>{{ greeter.greet('World') }}</needs-greeter>");
			} else {
				expect(alreadyConstructed["HelloWorld"]).to.be.a('boolean');
				expect(alreadyConstructed["HelloWorld"]).to.eql(true);
			}

			expect(anno["HelloWorld"].length).to.eql(2);
			expect(anno["HelloWorld"][1]).not.to.be(null);
			expect(anno["HelloWorld"][1].template).not.to.be(null);
			expect(anno["HelloWorld"][1].template).to.be.a('string');

			if(compiled) {
	  			expect(anno["HelloWorld"][1].template).to.eql("<c-needs-greeter>{{ greeter.greet('World') }}</c-needs-greeter>");
	  		} else {
	  			expect(anno["HelloWorld"][1].template).to.eql("<needs-greeter>{{ greeter.greet('World') }}</needs-greeter>");
	  		}
	  	});

	  	// Directives conversion.
	  	it('directives', function() {
	  		var expectedNames = null;

	  		if(!compiled) {
	  			expectedNames = ["test.Dependency", "test.MyDirective", "test.NgModelDirective"];
	  			expect(meta["DependencyDisplayComponent"].View.length).to.eql(1);
				expect(meta["DependencyDisplayComponent"].View[0].directives).not.to.be(null);
				expect(meta["DependencyDisplayComponent"].View[0].directives).to.be.an('array');
				expect(meta["DependencyDisplayComponent"].View[0].directives).to.eql(expectedNames);
	  		} else {
	  			expectedNames = ["testcompile.Dependency", "testcompile.MyDirective", "testcompile.NgModelDirective"];
				expect(alreadyConstructed["DependencyDisplayComponent"]).to.be.a('boolean');
				expect(alreadyConstructed["DependencyDisplayComponent"]).to.eql(true);
	  		}

	  		for(var name in expectedNames) {
	  			expectedNames[name] = expectedNames[name].split('.');
	  		}

	  		expect(anno["DependencyDisplayComponent"].length).to.eql(2);
			expect(anno["DependencyDisplayComponent"][1].directives).not.to.be(null);
			expect(anno["DependencyDisplayComponent"][1].directives).to.be.an('array');

			for(var i in expectedNames) {
				expect(anno["DependencyDisplayComponent"][1].directives[i]).to.be.a('function');
				expect(anno["DependencyDisplayComponent"][1].directives[i].__name__).to.eql(expectedNames[i]);
			}
	  	});

		// Encapsulation conversion.
		it('encapsulation', function() {
			if(!compiled) {
				expect(meta["DependencyDisplayComponent"].View.length).to.eql(1);
				expect(meta["DependencyDisplayComponent"].View[0].encapsulation).to.be(undefined);
				expect(meta["HelloWorld"].View.length).to.eql(1);
				expect(meta["HelloWorld"].View[0].encapsulation).not.to.be(null);
				expect(meta["HelloWorld"].View[0].encapsulation).to.be.a('string');
				expect(meta["HelloWorld"].View[0].encapsulation).to.eql("NONE");
			} else {
				expect(alreadyConstructed["DependencyDisplayComponent"]).to.be.a('boolean');
				expect(alreadyConstructed["DependencyDisplayComponent"]).to.eql(true);
				expect(alreadyConstructed["HelloWorld"]).to.be.a('boolean');
				expect(alreadyConstructed["HelloWorld"]).to.eql(true);
			}

			expect(anno["DependencyDisplayComponent"].length).to.eql(2);
			expect(anno["DependencyDisplayComponent"][1].encapsulation).not.to.be(null);
			expect(anno["DependencyDisplayComponent"][1].encapsulation).to.be.a('number');
			expect(anno["DependencyDisplayComponent"][1].encapsulation).to.be(browser.window.ng.ViewEncapsulation.NONE);
			expect(anno["HelloWorld"].length).to.eql(2);
			expect(anno["HelloWorld"][1].encapsulation).not.to.be(null);
			expect(anno["HelloWorld"][1].encapsulation).to.be.a('number');
			expect(anno["HelloWorld"][1].encapsulation).to.eql(browser.window.ng.ViewEncapsulation.NONE);
		});

		// Styles conversion.
		it('styles');

	  	// StyleUrls conversion.
	  	it('styleUrls');
	});
};