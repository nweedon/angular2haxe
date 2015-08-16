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
package test;

import angular2haxe.ng.Angular;
import angular2haxe.ng.LifecycleEvent;
import test.Dependency.MyDirective;

/*
 * Reference:
 * https://angular.io/docs/js/latest/guide/displaying-data.html
 */

@Component({ 
	selector: 'dependency-display',
	compileChildren: true
})
@View({ 
	directives: ["test.Dependency", "test.MyDirective", "test.NgModelDirective"],
	templateUrl: "templates/dependency.tpl.html"
})
@:expose
class DependencyDisplayComponent
{	
    public function new()
    {
    }
}
