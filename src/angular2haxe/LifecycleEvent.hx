package angular2haxe;

/**
 * ...
 * @author Niall Weedon, Lewis Weedon, Jon Langford, Will Hurst, Ben Beagley, Matt Higgins
 */

 @:native('ng.LifecycleEvent')
extern class LifecycleEvent
{
	@:native('onChange')
	public static var onChange : Dynamic;
	
	@:native('onInit')
	public static var onInit : Dynamic;
	
	@:native('onCheck')
	public static var onCheck : Dynamic;
	
	@:native('onAllChangesDone')
	public static var onAllChangesDone : Dynamic;
	
	@:native('onDestroy')
	public static var onDestroy : Dynamic;
	
	private function new() { }
}