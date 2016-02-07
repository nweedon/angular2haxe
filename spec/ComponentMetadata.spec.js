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

module.exports.spec = function(browser, expect) {

    describe('ComponentMetadata', function() {
        var ng;
        var HelloWorld, TestApp, BadClass, BadClass2;

        before(function(done) {
            browser.visit('/index.html', { debug: false }, function() {
                ng = browser.window.ng;
                HelloWorld = browser.window.test.HelloWorld;
                TestApp = browser.window.test.TestApp;
                BadClass = browser.window.test.BadClass;
                BadClass2 = browser.window.test.BadClass2;
                done();
            });
        });

        it('maps ChangeDetectionStrategy to correctly when changeDetection is specified', function() {
            expect(TestApp.annotations.length).to.be.greaterThan(0);
            expect(TestApp.annotations[0].changeDetection).to.eql(ng.core.ChangeDetectionStrategy.CheckAlways);
        });

        it('maps ChangeDetectionStrategy to Default when not specified', function() {
            expect(HelloWorld.annotations.length).to.be.greaterThan(0);
            expect(HelloWorld.annotations[0].changeDetection).to.eql(ng.core.ChangeDetectionStrategy.Default);
        });

        it('maps ChangeDetectionStrategy to Default when an invalid key is used', function() {
            expect(BadClass.annotations.length).to.be.greaterThan(0);
            expect(BadClass.annotations[0].changeDetection).to.eql(ng.core.ChangeDetectionStrategy.Default);
        });

        it('maps ChangeDetectionStrategy to Default when an invalid value is used', function() {
            expect(BadClass2.annotations.length).to.be.greaterThan(0);
            expect(BadClass2.annotations[0].changeDetection).to.eql(ng.core.ChangeDetectionStrategy.Default);
        });

        it('maps ViewEncapsulation to correctly when encapsulation is specified', function() {
            expect(TestApp.annotations.length).to.be.greaterThan(0);
            expect(TestApp.annotations[0].encapsulation).to.eql(ng.core.ViewEncapsulation.Emulated);
        });

        it('maps ViewEncapsulation to None when not specified', function() {
            expect(HelloWorld.annotations.length).to.be.greaterThan(0);
            expect(HelloWorld.annotations[0].encapsulation).to.eql(ng.core.ViewEncapsulation.None);
        });

        it('maps ViewEncapsulation to None when an invalid key is used', function() {
            expect(BadClass.annotations.length).to.be.greaterThan(0);
            expect(BadClass.annotations[0].encapsulation).to.eql(ng.core.ViewEncapsulation.None);
        });

        it('maps ViewEncapsulation to None when an invalid value is used', function() {
            expect(BadClass2.annotations.length).to.be.greaterThan(0);
            expect(BadClass2.annotations[0].encapsulation).to.eql(ng.core.ViewEncapsulation.None);
        });

    });

};
