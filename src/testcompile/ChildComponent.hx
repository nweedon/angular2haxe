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
package testcompile;

import ng.Angular;

/*
 * Reference:
 * https://angular.io/docs/js/latest/guide/making-components.html
 */

@Component({ 
	selector: 'c-child'
})
@View({
	template: '<p>{{ message }}</p>'
})
#if !macro
@:build(angular2haxe.buildplugin.BuildPlugin.compile())
#end
@:expose
class ChildComponent
{
	private var message = "I am the child.";
	
    public function new()
    {
        
    }
}
