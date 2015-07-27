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
package angular2haxe;

class LifecycleEvent
{
	private static var supportedLifecycleEvents : Map<String, Dynamic> = [
		"onChange" 			=> untyped ng.onChange,
		"onInit"			=> untyped ng.onInit,
		"onCheck"			=> untyped ng.onCheck,
		"onAllChangesDone"	=> untyped ng.onAllChangesDone,
		"onDestroy"			=> untyped ng.onDestroy
	];
	
	private function new() { }
	
	public static function toAngular(lifecycleEvent : String) : Dynamic
	{		
		if (supportedLifecycleEvents.exists(lifecycleEvent))
		{
			return supportedLifecycleEvents[lifecycleEvent];
		} 
		else 
		{
			Trace.error('Angular does not have LifecycleEvent "${lifecycleEvent}"');
			return { };
		}
	}
}