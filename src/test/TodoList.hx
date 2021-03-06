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

import angular2haxe.KeyboardEvent;
import angular2haxe.Trace;
import test.InputDirective;

/*
 * Reference:
 * https://angular.io/docs/js/latest/guide/user-input.html
 */

@Component({ 
	selector: 'todo-list',
	properties: ["lastValue", "todos"],
	lifecycle: ["onInit", "onChange", "onAllChangesDone", "onCheck"],
	changeDetection: "CHECK_ALWAYS"
})
@View({ 
	directives: ["NgFor", "NgIf", "test.InputDirective"],
	template: 'Last value: {{lastValue}}<ul><li *ng-for="#todo of todos">{{ todo }}</li></ul><input #textbox (keyup)="doneTyping($event)"><button (click)="addTodo(textbox.value)">Add Todo</button>',
})
@:expose
@:keep
class TodoList
{
	private var todos : Array<String>;
	public var lastValue : String = "";
	
	public function new() 
	{
		todos = ["Eat Breakfast", "Walk Dog", "Breathe"];
		lastValue = todos[todos.length - 1];
	}
#if !macro
	public function doneTyping(event : KeyboardEvent)
	{
		if (event.which == 13)
		{
			addTodo(event._target.value);
			event._target.value = "";
		}
	}
#end
	public function addTodo(todo : String)
	{
		lastValue = todo;
		todos.push(todo);
	}
	
	public function onInit()
	{
		Trace.log('Lifecycle onInit:\n${this}');
	}
	
	public function onCheck()
	{
		Trace.log('Lifecycle onCheck');
	}
	
	public function onChange(changes : Dynamic)
	{
		Trace.log('Lifecycle onChange: ${changes}');
	}
	
	public function onAllChangesDone()
	{
		Trace.log('Lifecycle onAllChangesDone');
	}
}