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

/*
 * Reference:
 * https://angular.io/docs/js/latest/guide/user-input.html
 */

@Component({ 
	selector: 'todo-list'
})
@View({ 
	directives: ["angular.NgFor", "angular.NgIf"],
	template: '<ul><li *ng-for="#todo of todos">{{ todo }}</li></ul><input #textbox (keyup)="doneTyping($event)"><button (click)="addTodo(textbox.value)">Add Todo</button>',
})
class TodoList
{
	private static var annotations : Array<Dynamic> = [];
	private static var parameters : Array<Dynamic> = [];
	private var todos : Array<String>;
	
	public function new() 
	{
		todos = ["Eat Breakfast", "Walk Dog", "Breathe"];
	}
	
	public function doneTyping(event : KeyboardEvent)
	{
		if (event.which == 13)
		{
			addTodo(event._target.value);
			event._target.value = "";
		}
	}
	
	public function addTodo(todo : String)
	{
		todos.push(todo);
	}
}