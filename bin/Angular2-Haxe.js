(function (console, $hx_exports) { "use strict";
$hx_exports.test = $hx_exports.test || {};
var $hxClasses = {};
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Main = function() { };
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.main = function() {
	new test_DisplayComponent();
	new test_TodoList();
	new test_ParentComponent();
	new test_ChildComponent();
};
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.htmlEscape = function(s,quotes) {
	s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	if(quotes) return s.split("\"").join("&quot;").split("'").join("&#039;"); else return s;
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
var angular_Annotation = function(data) {
};
$hxClasses["angular.Annotation"] = angular_Annotation;
angular_Annotation.__name__ = ["angular","Annotation"];
angular_Annotation.prototype = {
	__class__: angular_Annotation
};
var angular_AngularElement = function(annotations,parameters) {
	if(annotations != null && annotations.length == 0) {
		var cl = js_Boot.getClass(this);
		var anno = haxe_rtti_Meta.getType(cl);
		var className = Type.getClassName(cl);
		console.log("--- Bootstrapping " + className + " ---");
		var _g = 0;
		var _g1 = Reflect.fields(anno);
		while(_g < _g1.length) {
			var name = _g1[_g];
			++_g;
			if(angular_AngularElement.validAnnotations.exists(name)) {
				var field = Reflect.field(anno,name);
				if(field[0].directives != null) {
					var _g2 = 0;
					var _g3 = Reflect.fields(field[0].directives);
					while(_g2 < _g3.length) {
						var directive = _g3[_g2];
						++_g2;
						var directiveName = Reflect.field(field[0].directives,directive);
						if(directiveName != null && directiveName.length > 0) {
							directiveName = StringTools.htmlEscape(directiveName);
							Reflect.setField(field[0].directives,directive,eval(directiveName));
						}
					}
				}
				if(parameters != null && field[0].appInjector != null) {
					var serviceParams = [];
					var _g21 = 0;
					var _g31 = Reflect.fields(field[0].appInjector);
					while(_g21 < _g31.length) {
						var app = _g31[_g21];
						++_g21;
						var appName = Reflect.field(field[0].appInjector,app);
						if(appName != null && appName.length > 0) {
							var cl1 = Type.resolveClass(appName);
							serviceParams.push(cl1);
							field[0].appInjector[app] = cl1;
						}
					}
					if(serviceParams.length > 0) parameters.push(serviceParams);
				}
				annotations.push(Type.createInstance(angular_AngularElement.validAnnotations.get(name),[field[0]]));
			} else console.error(name + " is not a valid annotation.");
		}
		window.document.addEventListener("DOMContentLoaded",function() {
			if(angular_AngularElement.showDataInTrace) {
				console.log("Annotations:\n" + Std.string(annotations));
				console.log("Parameters:\n" + Std.string(parameters));
			}
			angular.bootstrap(cl);
			console.log("--- Finished bootstrapping " + className + " ---");
		});
	}
};
$hxClasses["angular.AngularElement"] = angular_AngularElement;
angular_AngularElement.__name__ = ["angular","AngularElement"];
angular_AngularElement.prototype = {
	__class__: angular_AngularElement
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = ["haxe","IMap"];
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,__class__: haxe_ds_StringMap
};
var haxe_rtti_Meta = function() { };
$hxClasses["haxe.rtti.Meta"] = haxe_rtti_Meta;
haxe_rtti_Meta.__name__ = ["haxe","rtti","Meta"];
haxe_rtti_Meta.getType = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	if(meta == null || meta.obj == null) return { }; else return meta.obj;
};
haxe_rtti_Meta.getMeta = function(t) {
	return t.__meta__;
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = ["js","Boot"];
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__resolveNativeClass = function(name) {
	return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
};
var test_ChildComponent = $hx_exports.test.ChildComponent = function() {
	this.message = "I am the child.";
	angular_AngularElement.call(this,test_ChildComponent.annotations,test_ChildComponent.parameters);
};
$hxClasses["test.ChildComponent"] = test_ChildComponent;
test_ChildComponent.__name__ = ["test","ChildComponent"];
test_ChildComponent.__super__ = angular_AngularElement;
test_ChildComponent.prototype = $extend(angular_AngularElement.prototype,{
	__class__: test_ChildComponent
});
var test_DisplayComponent = function(friends) {
	angular_AngularElement.call(this,test_DisplayComponent.annotations,test_DisplayComponent.parameters);
	this.myName = "Alice";
	if(friends != null) this.names = friends.names;
};
$hxClasses["test.DisplayComponent"] = test_DisplayComponent;
test_DisplayComponent.__name__ = ["test","DisplayComponent"];
test_DisplayComponent.__super__ = angular_AngularElement;
test_DisplayComponent.prototype = $extend(angular_AngularElement.prototype,{
	__class__: test_DisplayComponent
});
var test_FriendsService = $hx_exports.test.FriendsService = function() {
	this.names = ["Aarav","Martín","Shannon","Ariana","Kai"];
};
$hxClasses["test.FriendsService"] = test_FriendsService;
test_FriendsService.__name__ = ["test","FriendsService"];
test_FriendsService.prototype = {
	__class__: test_FriendsService
};
var test_ParentComponent = function() {
	this.message = "I am the parent.";
	angular_AngularElement.call(this,test_ParentComponent.annotations,test_ParentComponent.parameters);
};
$hxClasses["test.ParentComponent"] = test_ParentComponent;
test_ParentComponent.__name__ = ["test","ParentComponent"];
test_ParentComponent.__super__ = angular_AngularElement;
test_ParentComponent.prototype = $extend(angular_AngularElement.prototype,{
	__class__: test_ParentComponent
});
var test_TodoList = function() {
	angular_AngularElement.call(this,test_TodoList.annotations,test_TodoList.parameters);
	this.todos = ["Eat Breakfast","Walk Dog","Breathe"];
};
$hxClasses["test.TodoList"] = test_TodoList;
test_TodoList.__name__ = ["test","TodoList"];
test_TodoList.__super__ = angular_AngularElement;
test_TodoList.prototype = $extend(angular_AngularElement.prototype,{
	doneTyping: function(event) {
		if(event.which == 13) {
			this.addTodo(event.target.value);
			event.target.value = "";
		}
	}
	,addTodo: function(todo) {
		this.todos.push(todo);
	}
	,__class__: test_TodoList
});
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
var __map_reserved = {}
angular_AngularElement.showDataInTrace = false;
angular_AngularElement.validAnnotations = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	_g.set("Component",angular.ComponentAnnotation);
	_g.set("View",angular.ViewAnnotation);
	$r = _g;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
test_ChildComponent.__meta__ = { obj : { Component : [{ selector : "child"}], View : [{ template : "<p>{{ message }}</p>"}]}};
test_ChildComponent.annotations = [];
test_ChildComponent.parameters = [];
test_DisplayComponent.__meta__ = { obj : { Component : [{ selector : "display", appInjector : ["test.FriendsService"]}], View : [{ directives : ["angular.NgFor","angular.NgIf"], template : "<p>My name: {{ myName }}</p><p>Friends:</p><ul><li *ng-for=\"#name of names\">{{ name }}</li></ul><p *ng-if=\"names.length > 3\">You have many friends!</p>"}]}};
test_DisplayComponent.annotations = [];
test_DisplayComponent.parameters = [];
test_ParentComponent.__meta__ = { obj : { Component : [{ selector : "parent"}], View : [{ directives : ["test.ChildComponent"], template : "<h1>{{ message }}</h1><child></child>"}]}};
test_ParentComponent.annotations = [];
test_ParentComponent.parameters = [];
test_TodoList.__meta__ = { obj : { Component : [{ selector : "todo-list"}], View : [{ directives : ["angular.NgFor","angular.NgIf"], template : "<ul><li *ng-for=\"#todo of todos\">{{ todo }}</li></ul><input #textbox (keyup)=\"doneTyping($event)\"><button (click)=\"addTodo(textbox.value)\">Add Todo</button>"}]}};
test_TodoList.annotations = [];
test_TodoList.parameters = [];
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);

//# sourceMappingURL=Angular2-Haxe.js.map