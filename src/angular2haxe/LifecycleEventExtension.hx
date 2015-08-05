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

import angular2haxe.LifecycleEvent;

class LifecycleEventExtension
{
	private static var supportedLifecycleEvents : Map<String, Dynamic>;
	private static var initialised : Bool = false;
	
	private function new() { }
	
	private static function init()
	{
		if (!initialised) 
		{
			supportedLifecycleEvents = [
				"onChange" 			=> LifecycleEvent.onChange,
				"onInit"			=> LifecycleEvent.onInit,
				"onCheck"			=> LifecycleEvent.onCheck,
				"onAllChangesDone"	=> LifecycleEvent.onAllChangesDone,
				"onDestroy"			=> LifecycleEvent.onDestroy
			];
			
			initialised = true;
		}
	}
	
	/**
	 * Convert string to an Angular Lifecycle object. If the
	 * object does not exist, null is returned.
	 * @param	lifecycleEvent	String representing an Angular Lifecycle event (i.e. onInit).
	 * @return
	 */
	public static function toAngular(lifecycleEvent : String) : Dynamic
	{
		init();
		
		if (supportedLifecycleEvents.exists(lifecycleEvent))
		{
			return supportedLifecycleEvents[lifecycleEvent];
		} 
		else 
		{
			Trace.error('Angular does not have LifecycleEvent "${lifecycleEvent}"');
			return null;
		}
	}
}