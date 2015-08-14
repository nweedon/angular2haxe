package angular2haxe;
import angular2haxe.ng.ViewEncapsulation;

/**
 * ...
 * @author Niall Frederick Weedon
 */
class ViewEncapsulationExtension
{
	private function new() 
	{
		
	}

	public static function toAngular(name : String) : Int
	{
		return switch(name) {
			case "EMULATED"	: ViewEncapsulation.EMULATED;
			case "NATIVE"	: ViewEncapsulation.NATIVE;
			case "NONE"		: ViewEncapsulation.NONE;
			default			: ViewEncapsulation.NONE;
		}
	}
}