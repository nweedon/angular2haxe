package angular2haxe.ng;

/**
 * @author Niall Frederick Weedon
 */
@:native('ng.ViewEncapsulation')
extern class ViewEncapsulation
{
	@:native('EMULATED')
	public static var EMULATED : Int;
	@:native('NATIVE')
	public static var NATIVE : Int;
	@:native('NONE')
	public static var NONE : Int;
	
	private function new() { }
}