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

#if macro
import haxe.macro.Context;
#end

/**
 * Debug Level:
 * 
 * ALL: Show all log messages (trace, warning, error)
 * WARN: Show warning and error messages
 * ERROR: Show just error messages
 */
class Trace
{
	#if (debug_level=="WARN")
	private static var logLevel : String = "WARN";
	#elseif (debug_level == "ERROR")
	private static var logLevel : String = "ERROR";
	#else
	private static var logLevel : String = "ALL";
	#end
	
	private function new() 
	{		
	}
	
	/**
	 * Feed string to console.error
	 * @param	info 	String to display as an error.
	 */
	public static inline function error(info : String)
	{
		#if macro
			Context.error(info, Context.currentPos());
		#else
			untyped
			{
				console.error(info);
			}
		#end
	}
	
	public static inline function warning(info : String)
	{
		#if macro
			Context.warning(info, Context.currentPos());
		#else
			if (logLevel == "WARN" || logLevel == "ALL")
			{
				untyped
				{
					console.warn(info);
				}
			}
		#end
	}
	
	/**
	 * Feed string to console.log
	 * @param	info	String to display as a log message.
	 */
	public static inline function log(info : String)
	{
		if (logLevel == "ALL")
		{
			trace(info);
		}
	}
}