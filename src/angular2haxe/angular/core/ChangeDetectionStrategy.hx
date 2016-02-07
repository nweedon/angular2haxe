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
package angular2haxe.angular.core;

@:native('ng.core.ChangeDetectionStrategy')
extern class ChangeDetectionStrategy {

    @:native('CheckOnce')
    public static var CheckOnce;

    @:native('Checked')
    public static var Checked;

    @:native('CheckAlways')
    public static var CheckAlways;

    @:native('Detached')
    public static var Detached;

    @:native('OnPush')
    public static var OnPush;

    @:native('Default')
    public static var Default;

    @:native('OnPushObserve')
    public static var OnPushObserve;

}
