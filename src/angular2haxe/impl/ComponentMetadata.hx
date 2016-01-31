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
package angular2haxe.impl;

import angular2haxe.logger.Logger;

class ComponentMetadata {

    public var selector(default, null) : String = null;
    public var inputs(default, null) : Array<String> = null;
    public var outputs(default, null) : Array<String> = null;
    public var properties(default, null) : Array<String> = null;
    public var events(default, null) : Array<String> = null;
    // host
    public var bindings(default, null) : Array<Dynamic> = null;
    public var providers(default, null) : Array<Dynamic> = null;
    public var exportAs(default, null) : String = null;
    public var moduleId(default, null) : String = null;
    public var viewBindings(default, null) : Array<Dynamic> = null;
    public var viewProviders(default, null) : Array<Dynamic> = null;
    // queries
    public var changeDetection(default, null) : Dynamic = 5; // TODO: Implement ChangeDetectionStrategy
    public var templateUrl(default, null) : String = null;
    public var template(default, null) : String = null;
    public var styleUrls(default, null) : Array<String> = null;
    public var styles(default, null) : Array<String> = null;
    public var directives(default, null) : Array<Class<Dynamic>> = null;
    public var pipes(default, null) : Array<Class<Dynamic>> = null;
    public var encapsulation(default, null) : Dynamic = null; // TODO: Implement ViewEncapsulation

    private var deprecatedProperties = ["bindings", "viewBindings"];

    public function new(input : Dynamic) {
        var fields : Array<String> = Reflect.fields(input);
        var field : String;

        for(field in fields) {
            if(Reflect.hasField(this, field)) {
                var value = Reflect.field(input, field);

                if(field == 'directives' || field == 'pipes') {
                    // Enters constructor as a string, set as a Class
                    var classNames : Array<String> = Reflect.field(input, field);
                    var className : String;
                    value = [];

                    for(className in classNames) {
                        value.push(Type.resolveClass(className));
                    }
                }

                Reflect.setProperty(this, field, value);

                if(deprecatedProperties.indexOf(field) > -1) {
                    Logger.warn('Field "${field}" is deprecated.');
                }
            } else {
                Logger.warn('ComponentMetadata does not have field "${field}". As such, it has been ignored.');
            }
        }
    }

}
