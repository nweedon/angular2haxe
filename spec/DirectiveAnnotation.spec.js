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

module.exports.spec = function(zombie, expect) {

	describe('Directive parsing', function() {
		let meta = { };
		let anno = { };
		let params = { };
		const browser = new zombie({ 
			waitFor: 2000,
			loadCSS: false,
			runScripts: true
		});

		before(function(done) {
			browser.visit('/index.html', { debug: false }, function() {
				meta = browser.window.test.NeedsGreeter.__meta__.obj;
				anno = browser.window.test.NeedsGreeter.annotations;
				params = browser.window.test.NeedsGreeter.parameters;

				done();
			});
	  	});

	  	it('selector', function() {
			expect(meta.Directive.length).to.eql(1);
			expect(anno.length).to.eql(1);
			expect(anno[0]).not.to.be(null);
			expect(anno[0].selector).not.to.be(null);
	  		expect(meta.Directive[0].selector).to.eql(anno[0].selector);
	  	});

		it('hostInjector', function() {
			var expectedName = ["test", "Greeter"];

			// Original Metadata
			expect(meta.Directive.length).to.eql(1);
			expect(meta.Directive[0].hostInjector.length).to.eql(1);
			expect(meta.Directive[0].hostInjector[0]).to.eql('test.Greeter');

			// Parsed data
			expect(anno.length).to.eql(1);
			expect(anno[0]).not.to.be(null);
			expect(anno[0].hostInjector).not.to.be(null);
			expect(anno[0].hostInjector.length).to.eql(1);
			expect(anno[0].hostInjector[0]).to.be.a('function');
			expect(anno[0].hostInjector[0].__name__).to.eql(expectedName);
		});
	});

};