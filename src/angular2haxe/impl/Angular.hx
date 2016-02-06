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

class Angular {

    public static function bootstrap(appClass : Class<Dynamic>) {
        if(appClass != null) {
            var meta : Dynamic = haxe.rtti.Meta.getType(appClass);

            // Patch toString method of Function prototype. As of 2.0.0-beta.1, anonymous functions
            // don't work properly with Angular 2 + ES5, so the toString function needs to be patched
            // to return a proper classname (generated later in this function);
            untyped __js__('Function.prototype._toString = Function.prototype.toString');
            untyped __js__('Function.prototype.toString = function() { return this.angular2haxe_className || this._toString(); }');

            // Get Component.directives field. If it has one, instantiate
            // all directives classes, so their annotations array populates.
            if(Reflect.hasField(meta, 'Component')) {
                var componentMeta : Dynamic = Reflect.field(meta, 'Component')[0];

                if(Reflect.hasField(componentMeta, 'directives')) {
                    var directives : Array<String> = Reflect.field(componentMeta, 'directives');
                    var directive : String;

                    // Add app class to directives
                    directives.push(Type.getClassName(appClass));

                    for(directive in directives) {
                        var directiveClass = Type.resolveClass(directive);

                        if(directiveClass != null) {
                            // Bootstrap annotations array (if the class doesn't have one)
                            if(!Reflect.hasField(directiveClass, 'annotations')) {
                                Reflect.setField(directiveClass, 'annotations', []);
                            }

                            var localJsClassName : String = StringTools.replace(directive, ".", "_");
                            Reflect.setField(directiveClass, 'angular2haxe_className', localJsClassName);
                            
                            if(Reflect.field(directiveClass, 'annotations').length == 0) {
                                Type.createInstance(directiveClass, []);
                            }
                        } else {
                            Logger.error('Cannot resolve class: "${directive}". Make sure the class has been imported.');
                        }
                    }
                }
            }

            untyped {
                document.addEventListener('DOMContentLoaded', function() {
                    ng.platform.browser.bootstrap(appClass);
                });
            }
        } else {
            Logger.error('Provided app class is null.');
        }
    }

}
