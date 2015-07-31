package test;
import angular2haxe.KeyboardEvent;

@Directive({
	selector: 'input',
	lifecycle: ["onInit"],
	host: '{ "(keyup)" : "onKeyUp($event)" }'
})
@:expose
class InputDirective
{
	private static var annotations : Array<Dynamic> = [];
	private static var parameters : Array<Dynamic> = [];
	
	public function new() 
	{
		
	}
	
	public function onInit()
	{
		trace('InputDirective.onInit: ${this}');
	}
	
	public function onKeyUp(event : KeyboardEvent)
	{
		trace('You just pressed a key with key code: ${event.keyCode}!');
	}
}