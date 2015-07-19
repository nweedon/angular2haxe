(function (console, $hx_exports) { "use strict";
$hx_exports.test = $hx_exports.test || {};
var $hxClasses = {};
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
var Main = function() { };
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.main = function() {
	new angular2haxe_Application([test_DisplayComponent,test_TodoList,test_ParentComponent,test_ChildComponent,test_MyDirective,test_NgModelDirective,test_Dependency,test_DependencyDisplayComponent,test_Greeter,test_NeedsGreeter,test_HelloWorld]);
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
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
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
var angular2haxe_Annotation = function(data) {
};
$hxClasses["angular2haxe.Annotation"] = angular2haxe_Annotation;
angular2haxe_Annotation.__name__ = ["angular2haxe","Annotation"];
var angular2haxe_AnnotationExtension = function() {
};
$hxClasses["angular2haxe.AnnotationExtension"] = angular2haxe_AnnotationExtension;
angular2haxe_AnnotationExtension.__name__ = ["angular2haxe","AnnotationExtension"];
angular2haxe_AnnotationExtension.transform = function(input,annotations,parameters) {
	return input;
};
angular2haxe_AnnotationExtension.parseServiceParameters = function(injector) {
	var serviceParams = [];
	var _g = 0;
	var _g1 = Reflect.fields(injector);
	while(_g < _g1.length) {
		var app = _g1[_g];
		++_g;
		var appName = Reflect.field(injector,app);
		if(appName != null && appName.length > 0) {
			var cl = Type.resolveClass(appName);
			serviceParams.push(cl);
			injector[app] = cl;
		}
	}
	return serviceParams;
};
angular2haxe_AnnotationExtension.parseInjector = function(parameters,injector) {
	var serviceParameter = angular2haxe_AnnotationExtension.parseServiceParameters(injector);
	if(serviceParameter != null && serviceParameter.length > 0) parameters.push(serviceParameter);
};
var angular2haxe_Application = function(components) {
	this.bootstrap(components);
};
$hxClasses["angular2haxe.Application"] = angular2haxe_Application;
angular2haxe_Application.__name__ = ["angular2haxe","Application"];
angular2haxe_Application.prototype = {
	bootstrap: function(components) {
		var showDataInTrace = false;
		var validAnnotations;
		var _g = new haxe_ds_StringMap();
		_g.set("Component",{ annotation : angular.ComponentAnnotation, extension : angular2haxe_ComponentAnnotationExtension});
		_g.set("Directive",{ annotation : angular.DirectiveAnnotation, extension : angular2haxe_DirectiveAnnotationExtension});
		_g.set("View",{ annotation : angular.ViewAnnotation, extension : angular2haxe_ViewAnnotationExtension});
		validAnnotations = _g;
		var _g1 = 0;
		while(_g1 < components.length) {
			var component = [components[_g1]];
			++_g1;
			var anno = [haxe_rtti_Meta.getType(component[0])];
			var className = [Type.getClassName(component[0])];
			var annotations = [Reflect.field(component[0],"annotations")];
			var parameters = [Reflect.field(component[0],"parameters")];
			if(annotations[0] != null && annotations[0].length == 0) {
				console.log("=> Bootstrapping " + className[0]);
				var _g2 = 0;
				var _g3 = Reflect.fields(anno[0]);
				while(_g2 < _g3.length) {
					var name = _g3[_g2];
					++_g2;
					if(__map_reserved[name] != null?validAnnotations.existsReserved(name):validAnnotations.h.hasOwnProperty(name)) {
						var field = Reflect.field(anno[0],name);
						Reflect.callMethod((__map_reserved[name] != null?validAnnotations.getReserved(name):validAnnotations.h[name]).extension,Reflect.field((__map_reserved[name] != null?validAnnotations.getReserved(name):validAnnotations.h[name]).extension,"transform"),[field[0],annotations[0],parameters[0]]);
						annotations[0].push(Type.createInstance((__map_reserved[name] != null?validAnnotations.getReserved(name):validAnnotations.h[name]).annotation,[field[0]]));
					} else console.error(name + " is not a valid annotation.");
				}
				window.document.addEventListener("DOMContentLoaded",(function(parameters,annotations,className,anno,component) {
					return function() {
						if(showDataInTrace) {
							console.log("Annotations:\n" + Std.string(annotations[0]));
							console.log("Parameters:\n" + Std.string(parameters[0]));
						}
						if((function($this) {
							var $r;
							var _this = Reflect.fields(anno[0]);
							$r = HxOverrides.indexOf(_this,"Component",0);
							return $r;
						}(this)) >= 0) angular.bootstrap(component[0]);
						console.log("=> Finished bootstrapping " + className[0]);
					};
				})(parameters,annotations,className,anno,component));
			} else console.error(className[0] + " does not have an 'annotations' static variable in its class definition!");
		}
	}
};
var angular2haxe_ComponentAnnotationExtension = function() {
	angular2haxe_AnnotationExtension.call(this);
};
$hxClasses["angular2haxe.ComponentAnnotationExtension"] = angular2haxe_ComponentAnnotationExtension;
angular2haxe_ComponentAnnotationExtension.__name__ = ["angular2haxe","ComponentAnnotationExtension"];
angular2haxe_ComponentAnnotationExtension.transform = function(input,annotations,parameters) {
	if(parameters != null && input.appInjector != null) angular2haxe_AnnotationExtension.parseInjector(parameters,input.appInjector);
	if(parameters != null && input.viewInjector != null) angular2haxe_AnnotationExtension.parseInjector(parameters,input.viewInjector);
	return input;
};
angular2haxe_ComponentAnnotationExtension.__super__ = angular2haxe_AnnotationExtension;
angular2haxe_ComponentAnnotationExtension.prototype = $extend(angular2haxe_AnnotationExtension.prototype,{
});
var angular2haxe_DirectiveAnnotationExtension = function() {
	angular2haxe_AnnotationExtension.call(this);
};
$hxClasses["angular2haxe.DirectiveAnnotationExtension"] = angular2haxe_DirectiveAnnotationExtension;
angular2haxe_DirectiveAnnotationExtension.__name__ = ["angular2haxe","DirectiveAnnotationExtension"];
angular2haxe_DirectiveAnnotationExtension.transform = function(input,annotations,parameters) {
	if(parameters != null && input.hostInjector != null) angular2haxe_AnnotationExtension.parseInjector(parameters,input.hostInjector);
	return input;
};
angular2haxe_DirectiveAnnotationExtension.__super__ = angular2haxe_AnnotationExtension;
angular2haxe_DirectiveAnnotationExtension.prototype = $extend(angular2haxe_AnnotationExtension.prototype,{
});
var angular2haxe_KeyboardEvent = function(typeArg,keyboardEventInitDict) {
	KeyboardEvent.call(this,typeArg,keyboardEventInitDict);
};
$hxClasses["angular2haxe.KeyboardEvent"] = angular2haxe_KeyboardEvent;
angular2haxe_KeyboardEvent.__name__ = ["angular2haxe","KeyboardEvent"];
angular2haxe_KeyboardEvent.__super__ = KeyboardEvent;
angular2haxe_KeyboardEvent.prototype = $extend(KeyboardEvent.prototype,{
});
var angular2haxe_ViewAnnotationExtension = function() {
	angular2haxe_AnnotationExtension.call(this);
};
$hxClasses["angular2haxe.ViewAnnotationExtension"] = angular2haxe_ViewAnnotationExtension;
angular2haxe_ViewAnnotationExtension.__name__ = ["angular2haxe","ViewAnnotationExtension"];
angular2haxe_ViewAnnotationExtension.transform = function(input,annotations,parameters) {
	if(input.directives != null) {
		var _g = 0;
		var _g1 = Reflect.fields(input.directives);
		while(_g < _g1.length) {
			var directive = _g1[_g];
			++_g;
			var directiveName = Reflect.field(input.directives,directive);
			if(directiveName != null && directiveName.length > 0) {
				directiveName = StringTools.htmlEscape(directiveName);
				Reflect.setField(input.directives,directive,eval(directiveName));
			}
		}
	}
	return input;
};
angular2haxe_ViewAnnotationExtension.__super__ = angular2haxe_AnnotationExtension;
angular2haxe_ViewAnnotationExtension.prototype = $extend(angular2haxe_AnnotationExtension.prototype,{
});
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
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = ["js","Boot"];
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
var test_ChildComponent = $hx_exports.test.ChildComponent = function() {
	this.message = "I am the child.";
};
$hxClasses["test.ChildComponent"] = test_ChildComponent;
test_ChildComponent.__name__ = ["test","ChildComponent"];
var test_Dependency = $hx_exports.test.Dependency = function() {
	var _g = this;
	setTimeout(function() {
		console.log("Dependency.hx result:\n" + Std.string(_g));
	},1);
};
$hxClasses["test.Dependency"] = test_Dependency;
test_Dependency.__name__ = ["test","Dependency"];
test_Dependency.prototype = {
	onMouseEnter: function(event) {
		console.log("onMouseEnter: " + this.id);
	}
	,onMouseLeave: function() {
		console.log("onMouseLeave: " + this.id);
	}
	,onResize: function(event) {
		console.log("resize " + Std.string(event));
	}
};
var test_MyDirective = $hx_exports.test.MyDirective = function(dependency) {
	var _g = this;
	if(dependency != null) setTimeout(function() {
		_g.dependency = dependency;
	},1);
};
$hxClasses["test.MyDirective"] = test_MyDirective;
test_MyDirective.__name__ = ["test","MyDirective"];
var test_NgModelDirective = $hx_exports.test.NgModelDirective = function() {
	this.ngModelChanged = new angular.EventEmitter();
	this.ngModel = "";
};
$hxClasses["test.NgModelDirective"] = test_NgModelDirective;
test_NgModelDirective.__name__ = ["test","NgModelDirective"];
test_NgModelDirective.prototype = {
	modelChanged: function(event) {
		console.log(event);
		this.ngModelChanged.next(event.target.value);
	}
};
var test_DependencyDisplayComponent = function() {
};
$hxClasses["test.DependencyDisplayComponent"] = test_DependencyDisplayComponent;
test_DependencyDisplayComponent.__name__ = ["test","DependencyDisplayComponent"];
var test_DisplayComponent = function(friends) {
	this.myName = "Alice";
	if(friends != null) this.names = friends.names;
};
$hxClasses["test.DisplayComponent"] = test_DisplayComponent;
test_DisplayComponent.__name__ = ["test","DisplayComponent"];
var test_FriendsService = $hx_exports.test.FriendsService = function() {
	this.names = ["Aarav","Martín","Shannon","Ariana","Kai"];
};
$hxClasses["test.FriendsService"] = test_FriendsService;
test_FriendsService.__name__ = ["test","FriendsService"];
var test_Greeter = $hx_exports.test.Greeter = function() {
};
$hxClasses["test.Greeter"] = test_Greeter;
test_Greeter.__name__ = ["test","Greeter"];
test_Greeter.prototype = {
	greet: function(name) {
		return "Hello " + name + "!";
	}
};
var test_NeedsGreeter = $hx_exports.test.NeedsGreeter = function(greeter) {
	this.greeter = greeter;
};
$hxClasses["test.NeedsGreeter"] = test_NeedsGreeter;
test_NeedsGreeter.__name__ = ["test","NeedsGreeter"];
var test_HelloWorld = function(greeter) {
	this.greeter = greeter;
};
$hxClasses["test.HelloWorld"] = test_HelloWorld;
test_HelloWorld.__name__ = ["test","HelloWorld"];
var test_ParentComponent = function() {
	this.message = "I am the parent.";
};
$hxClasses["test.ParentComponent"] = test_ParentComponent;
test_ParentComponent.__name__ = ["test","ParentComponent"];
var test_TodoList = function() {
	this.todos = ["Eat Breakfast","Walk Dog","Breathe"];
};
$hxClasses["test.TodoList"] = test_TodoList;
test_TodoList.__name__ = ["test","TodoList"];
test_TodoList.prototype = {
	doneTyping: function(event) {
		if(event.which == 13) {
			this.addTodo(event.target.value);
			event.target.value = "";
		}
	}
	,addTodo: function(todo) {
		this.todos.push(todo);
	}
};
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
var __map_reserved = {}
test_ChildComponent.__meta__ = { obj : { Component : [{ selector : "child"}], View : [{ template : "<p>{{ message }}</p>"}]}};
test_ChildComponent.annotations = [];
test_ChildComponent.parameters = [];
test_Dependency.__meta__ = { obj : { Directive : [{ selector : "[dependency]", properties : ["id: dependency"]}]}};
test_Dependency.annotations = [];
test_Dependency.parameters = [];
test_MyDirective.__meta__ = { obj : { Directive : [{ selector : "[my-directive]", hostInjector : ["test.Dependency"]}]}};
test_MyDirective.annotations = [];
test_MyDirective.parameters = [];
test_NgModelDirective.__meta__ = { obj : { Directive : [{ selector : "[ng-model]", properties : ["ngModel"]}]}};
test_NgModelDirective.annotations = [];
test_NgModelDirective.parameters = [];
test_DependencyDisplayComponent.__meta__ = { obj : { Component : [{ selector : "dependency-display", compileChildren : true}], View : [{ directives : ["test.Dependency","test.MyDirective","test.NgModelDirective"], templateUrl : "templates/dependency.tpl.html"}]}};
test_DependencyDisplayComponent.annotations = [];
test_DependencyDisplayComponent.parameters = [];
test_DisplayComponent.__meta__ = { obj : { Component : [{ selector : "display", appInjector : ["test.FriendsService"]}], View : [{ directives : ["angular.NgFor","angular.NgIf"], template : "<p>My name: {{ myName }}</p><p>Friends:</p><ul><li *ng-for=\"#name of names\">{{ name }}</li></ul><p *ng-if=\"names.length > 3\">You have many friends!</p>"}]}};
test_DisplayComponent.annotations = [];
test_DisplayComponent.parameters = [];
test_Greeter.annotations = [];
test_Greeter.parameters = [];
test_NeedsGreeter.__meta__ = { obj : { Directive : [{ selector : "needs-greeter", hostInjector : ["test.Greeter"]}]}};
test_NeedsGreeter.annotations = [];
test_NeedsGreeter.parameters = [];
test_HelloWorld.__meta__ = { obj : { Component : [{ selector : "greet", viewInjector : ["test.Greeter"]}], View : [{ template : "<needs-greeter>{{ greeter.greet('World') }}</needs-greeter>", directives : ["test.NeedsGreeter"]}]}};
test_HelloWorld.annotations = [];
test_HelloWorld.parameters = [];
test_ParentComponent.__meta__ = { obj : { Component : [{ selector : "parent"}], View : [{ directives : ["test.ChildComponent"], template : "<h1>{{ message }}</h1><child></child>"}]}};
test_ParentComponent.annotations = [];
test_ParentComponent.parameters = [];
test_TodoList.__meta__ = { obj : { Component : [{ selector : "todo-list"}], View : [{ directives : ["angular.NgFor","angular.NgIf"], template : "<ul><li *ng-for=\"#todo of todos\">{{ todo }}</li></ul><input #textbox (keyup)=\"doneTyping($event)\"><button (click)=\"addTodo(textbox.value)\">Add Todo</button>"}]}};
test_TodoList.annotations = [];
test_TodoList.parameters = [];
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);

//# sourceMappingURL=Angular2-Haxe.js.map