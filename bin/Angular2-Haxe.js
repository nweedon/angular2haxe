(function (console, $hx_exports) { "use strict";
$hx_exports.testcompile = $hx_exports.testcompile || {};
$hx_exports.test = $hx_exports.test || {};
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var BuildRegistry = function() {
};
$hxClasses["BuildRegistry"] = BuildRegistry;
BuildRegistry.__name__ = ["BuildRegistry"];
BuildRegistry.prototype = {
	__class__: BuildRegistry
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
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
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
var Main = function() { };
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.main = function() {
	new angular2haxe_Application([test_DisplayComponent,test_TodoList,test_ParentComponent,test_ChildComponent,test_MyDirective,test_NgModelDirective,test_Dependency,test_DependencyDisplayComponent,test_Greeter,test_NeedsGreeter,test_HelloWorld,test_InputDirective,testcompile_DisplayComponent,testcompile_TodoList,testcompile_ParentComponent,testcompile_ChildComponent,testcompile_MyDirective,testcompile_NgModelDirective,testcompile_Dependency,testcompile_DependencyDisplayComponent,testcompile_Greeter,testcompile_NeedsGreeter,testcompile_HelloWorld,testcompile_InputDirective]);
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
Type.getClass = function(o) {
	if(o == null) return null; else return js_Boot.getClass(o);
};
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
var angular2haxe_AngularExtension = function() {
};
$hxClasses["angular2haxe.AngularExtension"] = angular2haxe_AngularExtension;
angular2haxe_AngularExtension.__name__ = ["angular2haxe","AngularExtension"];
angular2haxe_AngularExtension.getAngularClasses = function() {
	return angular2haxe_AngularExtension.angularClasses;
};
angular2haxe_AngularExtension.getAngularClass = function(name) {
	if(angular2haxe_AngularExtension.angularClasses.exists(name)) return angular2haxe_AngularExtension.angularClasses.get(name);
	return null;
};
angular2haxe_AngularExtension.isAngularClass = function(name) {
	if(HxOverrides.substr(name,0,3) == "ng." || HxOverrides.substr(name,0,8) == "angular.") name = angular2haxe_AngularExtension.getFullyQualifiedName(name);
	return angular2haxe_AngularExtension.angularClasses.exists(name);
};
angular2haxe_AngularExtension.getBareName = function(name) {
	if(HxOverrides.substr(name,0,3) == "ng.") return name; else if(HxOverrides.substr(name,0,8) == "angular.") return HxOverrides.substr(name,8,null);
	return name;
};
angular2haxe_AngularExtension.getFullyQualifiedName = function(name) {
	if(angular2haxe_AngularExtension.isAngularClass(name)) return name;
	return "ng." + angular2haxe_AngularExtension.getBareName(name);
};
angular2haxe_AngularExtension.prototype = {
	__class__: angular2haxe_AngularExtension
};
var angular2haxe_Annotation = function(data) {
};
$hxClasses["angular2haxe.Annotation"] = angular2haxe_Annotation;
angular2haxe_Annotation.__name__ = ["angular2haxe","Annotation"];
angular2haxe_Annotation.prototype = {
	__class__: angular2haxe_Annotation
};
var angular2haxe_AnnotationExtension = function() {
};
$hxClasses["angular2haxe.AnnotationExtension"] = angular2haxe_AnnotationExtension;
angular2haxe_AnnotationExtension.__name__ = ["angular2haxe","AnnotationExtension"];
angular2haxe_AnnotationExtension.transform = function(input,annotations,parameters) {
	return input;
};
angular2haxe_AnnotationExtension.resolveInputAnnotation = function(input,outputType) {
	var output;
	output = Type.createInstance(outputType,[]);
	var _g = 0;
	var _g1 = Reflect.fields(input);
	while(_g < _g1.length) {
		var field = _g1[_g];
		++_g;
		if(Object.prototype.hasOwnProperty.call(output,field)) {
			var inputField = Reflect.field(input,field);
			var outputClass = Type.getClass(Reflect.field(output,field));
			if(js_Boot.__instanceof(inputField,outputClass) || outputClass == null) {
				var result = null;
				if((inputField instanceof Array) && inputField.__enum__ == null) {
					result = Type.createInstance(outputClass,[]);
					var _g3 = 0;
					var _g2 = inputField.length;
					while(_g3 < _g2) {
						var i = _g3++;
						result.push(inputField[i]);
					}
				} else result = inputField;
				output[field] = result;
			} else {
				var inputClassName = Type.getClassName(inputField == null?null:js_Boot.getClass(inputField));
				var outputClassName = Type.getClassName(outputClass);
				console.error("Input type of field \"" + field + "\" (" + inputClassName + ") does not match type of output field (" + outputClassName + ").");
			}
		} else angular2haxe_Trace.error("" + Type.getClassName(outputType) + " does not have field \"" + field + "\" and as such this field will be ignored.");
	}
	return output;
};
angular2haxe_AnnotationExtension.parseServiceParameters = function(injector) {
	var serviceParams = [];
	var index = 0;
	var _g = 0;
	while(_g < injector.length) {
		var app = injector[_g];
		++_g;
		if(app != null && app.length > 0) {
			var cl = Type.resolveClass(app);
			serviceParams.push(cl);
			injector[index] = cl;
		}
		index++;
	}
	return serviceParams;
};
angular2haxe_AnnotationExtension.parseInjector = function(parameters,injector) {
	var serviceParameter = angular2haxe_AnnotationExtension.parseServiceParameters(injector);
	if(serviceParameter != null && serviceParameter.length > 0) parameters.push(serviceParameter);
};
angular2haxe_AnnotationExtension.transformLifecycle = function(lifecycle) {
	var index = 0;
	while(index < lifecycle.length) {
		lifecycle[index] = angular2haxe_LifecycleEventExtension.toAngular(js_Boot.__cast(lifecycle[index] , String));
		index++;
	}
};
angular2haxe_AnnotationExtension.prototype = {
	__class__: angular2haxe_AnnotationExtension
};
var angular2haxe_Application = function(components) {
	window.angular = window.ng;
	this.bootstrap(components);
};
$hxClasses["angular2haxe.Application"] = angular2haxe_Application;
angular2haxe_Application.__name__ = ["angular2haxe","Application"];
angular2haxe_Application.prototype = {
	bootstrap: function(components) {
		var showDataInTrace = false;
		var validAnnotations;
		var _g = new haxe_ds_StringMap();
		_g.set("Component",{ annotation : ng.ComponentAnnotation, extension : angular2haxe_ComponentAnnotationExtension});
		_g.set("Directive",{ annotation : ng.DirectiveAnnotation, extension : angular2haxe_DirectiveAnnotationExtension});
		_g.set("View",{ annotation : ng.ViewAnnotation, extension : angular2haxe_ViewAnnotationExtension});
		validAnnotations = _g;
		var _g1 = 0;
		while(_g1 < components.length) {
			var component = [components[_g1]];
			++_g1;
			var anno = [haxe_rtti_Meta.getType(component[0])];
			var className = [Type.getClassName(component[0])];
			if((function($this) {
				var $r;
				var _this = Reflect.fields(component[0]);
				$r = HxOverrides.indexOf(_this,"__alreadyConstructed",0);
				return $r;
			}(this)) > -1) {
				if(angular2haxe_Trace.logLevel == "WARN" || angular2haxe_Trace.logLevel == "ALL") console.warn("WARNING: " + className[0] + " is using experimental :build annotation feature.");
				var annotations = Reflect.field(component[0],"annotations");
				if(annotations != null) {
					var metaNames = ["Component","View","Directive"];
					var index = 0;
					var _g3 = 0;
					var _g2 = annotations.length;
					while(_g3 < _g2) {
						var index1 = _g3++;
						if(annotations[index1] == null) HxOverrides.remove(annotations,null);
					}
					index = 0;
					var _g21 = 0;
					while(_g21 < annotations.length) {
						var data = annotations[_g21];
						++_g21;
						Reflect.callMethod(validAnnotations.get(metaNames[index]).extension,Reflect.field(validAnnotations.get(metaNames[index]).extension,"postCompileTransform"),[data]);
						index++;
					}
				}
			} else {
				component[0].annotations = [];
				component[0].parameters = [];
				var annotations1 = Reflect.field(component[0],"annotations");
				var parameters = Reflect.field(component[0],"parameters");
				if(annotations1 != null && annotations1.length == 0) {
					if(angular2haxe_Trace.logLevel == "ALL") console.log("=> Bootstrapping " + className[0]);
					var _g22 = 0;
					var _g31 = Reflect.fields(anno[0]);
					while(_g22 < _g31.length) {
						var name = _g31[_g22];
						++_g22;
						if(__map_reserved[name] != null?validAnnotations.existsReserved(name):validAnnotations.h.hasOwnProperty(name)) {
							var field = Reflect.field(anno[0],name);
							var input = field[0];
							var result = Reflect.callMethod((__map_reserved[name] != null?validAnnotations.getReserved(name):validAnnotations.h[name]).extension,Reflect.field((__map_reserved[name] != null?validAnnotations.getReserved(name):validAnnotations.h[name]).extension,"transform"),[input,annotations1,parameters]);
							annotations1.push(Type.createInstance((__map_reserved[name] != null?validAnnotations.getReserved(name):validAnnotations.h[name]).annotation,[result]));
						} else console.error(name + " is not a valid annotation.");
					}
					if(showDataInTrace) {
						if(angular2haxe_Trace.logLevel == "ALL") console.log("Annotations:\n" + Std.string(annotations1));
						if(angular2haxe_Trace.logLevel == "ALL") console.log("Parameters:\n" + Std.string(parameters));
					}
				} else console.error("" + className[0] + " does not have an \"annotations\" static variable in its class definition!");
			}
			window.document.addEventListener("DOMContentLoaded",(function(className,anno,component) {
				return function() {
					if((function($this) {
						var $r;
						var _this1 = Reflect.fields(anno[0]);
						$r = HxOverrides.indexOf(_this1,"Component",0);
						return $r;
					}(this)) >= 0) angular.bootstrap(component[0]);
					if(angular2haxe_Trace.logLevel == "ALL") console.log("=> Finished bootstrapping " + className[0]);
				};
			})(className,anno,component));
		}
	}
	,__class__: angular2haxe_Application
};
var angular2haxe_ComponentAnnotationExtension = function() {
	angular2haxe_AnnotationExtension.call(this);
};
$hxClasses["angular2haxe.ComponentAnnotationExtension"] = angular2haxe_ComponentAnnotationExtension;
angular2haxe_ComponentAnnotationExtension.__name__ = ["angular2haxe","ComponentAnnotationExtension"];
angular2haxe_ComponentAnnotationExtension.transform = function(input,annotations,parameters) {
	var output = angular2haxe_AnnotationExtension.resolveInputAnnotation(input,angular2haxe_ng_ComponentConstructorData);
	if(parameters != null && output.hostInjector != null) angular2haxe_AnnotationExtension.parseInjector(parameters,output.hostInjector);
	angular2haxe_AnnotationExtension.transformLifecycle(output.lifecycle);
	return output;
};
angular2haxe_ComponentAnnotationExtension.postCompileTransform = function(data) {
	if(data != null) {
		if(data.hostInjector != null) {
			var index = 0;
			var _g = 0;
			var _g1 = data.hostInjector;
			while(_g < _g1.length) {
				var element = _g1[_g];
				++_g;
				if(typeof(element) == "string") data.hostInjector[index] = angular2haxe_AngularExtension.getAngularClass(element);
				index++;
			}
		}
	}
};
angular2haxe_ComponentAnnotationExtension.__super__ = angular2haxe_AnnotationExtension;
angular2haxe_ComponentAnnotationExtension.prototype = $extend(angular2haxe_AnnotationExtension.prototype,{
	__class__: angular2haxe_ComponentAnnotationExtension
});
var angular2haxe_DirectiveAnnotationExtension = function() {
	angular2haxe_AnnotationExtension.call(this);
};
$hxClasses["angular2haxe.DirectiveAnnotationExtension"] = angular2haxe_DirectiveAnnotationExtension;
angular2haxe_DirectiveAnnotationExtension.__name__ = ["angular2haxe","DirectiveAnnotationExtension"];
angular2haxe_DirectiveAnnotationExtension.transform = function(input,annotations,parameters) {
	if(input.host != null) {
		var outputHost = { };
		var _g = 0;
		var _g1 = Reflect.fields(input.host);
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			var index = field.indexOf("@$__hx__");
			if(index > -1) {
				var key = field.substring(8);
				Reflect.setField(outputHost,key,Reflect.field(input.host,field));
			}
		}
		input.host = outputHost;
	}
	var output = angular2haxe_AnnotationExtension.resolveInputAnnotation(input,angular2haxe_ng_DirectiveConstructorData);
	if(parameters != null && output.hostInjector != null) angular2haxe_AnnotationExtension.parseInjector(parameters,output.hostInjector);
	if(output.lifecycle != null) angular2haxe_AnnotationExtension.transformLifecycle(output.lifecycle);
	return output;
};
angular2haxe_DirectiveAnnotationExtension.postCompileTransform = function(data) {
	if(data != null) {
		if(data.hostInjector != null) {
			var index = 0;
			var _g = 0;
			var _g1 = data.hostInjector;
			while(_g < _g1.length) {
				var element = _g1[_g];
				++_g;
				if(typeof(element) == "string") data.hostInjector[index] = angular2haxe_AngularExtension.getAngularClass(element);
				index++;
			}
		}
	}
};
angular2haxe_DirectiveAnnotationExtension.__super__ = angular2haxe_AnnotationExtension;
angular2haxe_DirectiveAnnotationExtension.prototype = $extend(angular2haxe_AnnotationExtension.prototype,{
	__class__: angular2haxe_DirectiveAnnotationExtension
});
var angular2haxe_KeyboardEvent = function(typeArg,keyboardEventInitDict) {
	KeyboardEvent.call(this,typeArg,keyboardEventInitDict);
};
$hxClasses["angular2haxe.KeyboardEvent"] = angular2haxe_KeyboardEvent;
angular2haxe_KeyboardEvent.__name__ = ["angular2haxe","KeyboardEvent"];
angular2haxe_KeyboardEvent.__super__ = KeyboardEvent;
angular2haxe_KeyboardEvent.prototype = $extend(KeyboardEvent.prototype,{
	__class__: angular2haxe_KeyboardEvent
});
var angular2haxe_LifecycleEventExtension = function() {
};
$hxClasses["angular2haxe.LifecycleEventExtension"] = angular2haxe_LifecycleEventExtension;
angular2haxe_LifecycleEventExtension.__name__ = ["angular2haxe","LifecycleEventExtension"];
angular2haxe_LifecycleEventExtension.init = function() {
	if(!angular2haxe_LifecycleEventExtension.initialised) {
		var _g = new haxe_ds_StringMap();
		var value = ng.LifecycleEvent.onChange;
		_g.set("onChange",value);
		var value1 = ng.LifecycleEvent.onInit;
		_g.set("onInit",value1);
		var value2 = ng.LifecycleEvent.onCheck;
		_g.set("onCheck",value2);
		var value3 = ng.LifecycleEvent.onAllChangesDone;
		_g.set("onAllChangesDone",value3);
		var value4 = ng.LifecycleEvent.onDestroy;
		_g.set("onDestroy",value4);
		angular2haxe_LifecycleEventExtension.supportedLifecycleEvents = _g;
		angular2haxe_LifecycleEventExtension.initialised = true;
	}
};
angular2haxe_LifecycleEventExtension.toAngular = function(lifecycleEvent) {
	angular2haxe_LifecycleEventExtension.init();
	if(angular2haxe_LifecycleEventExtension.supportedLifecycleEvents.exists(lifecycleEvent)) return angular2haxe_LifecycleEventExtension.supportedLifecycleEvents.get(lifecycleEvent); else {
		console.error("Angular does not have LifecycleEvent \"" + lifecycleEvent + "\"");
		return lifecycleEvent;
	}
};
angular2haxe_LifecycleEventExtension.prototype = {
	__class__: angular2haxe_LifecycleEventExtension
};
var angular2haxe_Trace = function() {
};
$hxClasses["angular2haxe.Trace"] = angular2haxe_Trace;
angular2haxe_Trace.__name__ = ["angular2haxe","Trace"];
angular2haxe_Trace.error = function(info) {
	console.error(info);
};
angular2haxe_Trace.warning = function(info) {
	if(angular2haxe_Trace.logLevel == "WARN" || angular2haxe_Trace.logLevel == "ALL") console.warn(info);
};
angular2haxe_Trace.log = function(info) {
	if(angular2haxe_Trace.logLevel == "ALL") console.log(info);
};
angular2haxe_Trace.prototype = {
	__class__: angular2haxe_Trace
};
var angular2haxe_ViewAnnotationExtension = function() {
	angular2haxe_AnnotationExtension.call(this);
};
$hxClasses["angular2haxe.ViewAnnotationExtension"] = angular2haxe_ViewAnnotationExtension;
angular2haxe_ViewAnnotationExtension.__name__ = ["angular2haxe","ViewAnnotationExtension"];
angular2haxe_ViewAnnotationExtension.transform = function(input,annotations,parameters) {
	var output = angular2haxe_AnnotationExtension.resolveInputAnnotation(input,angular2haxe_ng_ViewConstructorData);
	var index = 0;
	if(output.directives != null) {
		var _g = 0;
		var _g1 = output.directives;
		while(_g < _g1.length) {
			var directive = _g1[_g];
			++_g;
			if(directive != null && directive.length > 0) {
				directive = StringTools.htmlEscape(directive);
				var resolvedClass = Type.resolveClass(directive);
				if(resolvedClass != null) output.directives[index] = resolvedClass; else {
					var angularClass = angular2haxe_AngularExtension.getAngularClass(directive);
					if(angularClass != null) output.directives[index] = angularClass; else console.error("The definition for " + Std.string(directive) + " does not exist!");
				}
			}
			index++;
		}
	}
	return output;
};
angular2haxe_ViewAnnotationExtension.postCompileTransform = function(data) {
	if(data != null) {
		if(data.directives != null) {
			var index = 0;
			var _g = 0;
			var _g1 = data.directives;
			while(_g < _g1.length) {
				var element = _g1[_g];
				++_g;
				if(typeof(element) == "string") data.directives[index] = angular2haxe_AngularExtension.getAngularClass(element);
				index++;
			}
		}
	}
};
angular2haxe_ViewAnnotationExtension.__super__ = angular2haxe_AnnotationExtension;
angular2haxe_ViewAnnotationExtension.prototype = $extend(angular2haxe_AnnotationExtension.prototype,{
	__class__: angular2haxe_ViewAnnotationExtension
});
var angular2haxe_buildplugin_BuildPlugin = function() {
};
$hxClasses["angular2haxe.buildplugin.BuildPlugin"] = angular2haxe_buildplugin_BuildPlugin;
angular2haxe_buildplugin_BuildPlugin.__name__ = ["angular2haxe","buildplugin","BuildPlugin"];
angular2haxe_buildplugin_BuildPlugin.prototype = {
	__class__: angular2haxe_buildplugin_BuildPlugin
};
var angular2haxe_ng_ComponentConstructorData = function() {
	this.changeDetection = "DEFAULT";
	this.compileChildren = true;
	this.exportAs = null;
	this.hostInjector = [];
	this.lifecycle = [];
	this.host = new haxe_ds_StringMap();
	this.events = [];
	this.properties = [];
	this.selector = null;
};
$hxClasses["angular2haxe.ng.ComponentConstructorData"] = angular2haxe_ng_ComponentConstructorData;
angular2haxe_ng_ComponentConstructorData.__name__ = ["angular2haxe","ng","ComponentConstructorData"];
angular2haxe_ng_ComponentConstructorData.prototype = {
	__class__: angular2haxe_ng_ComponentConstructorData
};
var angular2haxe_ng_DirectiveConstructorData = function() {
	this.compileChildren = true;
	this.exportAs = null;
	this.hostInjector = [];
	this.lifecycle = [];
	this.host = null;
	this.events = [];
	this.properties = [];
	this.selector = null;
};
$hxClasses["angular2haxe.ng.DirectiveConstructorData"] = angular2haxe_ng_DirectiveConstructorData;
angular2haxe_ng_DirectiveConstructorData.__name__ = ["angular2haxe","ng","DirectiveConstructorData"];
angular2haxe_ng_DirectiveConstructorData.prototype = {
	__class__: angular2haxe_ng_DirectiveConstructorData
};
var angular2haxe_ng_ViewConstructorData = function() {
	this.styleUrls = [];
	this.styles = [];
	this.renderer = null;
	this.directives = [];
	this.template = null;
	this.templateUrl = null;
};
$hxClasses["angular2haxe.ng.ViewConstructorData"] = angular2haxe_ng_ViewConstructorData;
angular2haxe_ng_ViewConstructorData.__name__ = ["angular2haxe","ng","ViewConstructorData"];
angular2haxe_ng_ViewConstructorData.prototype = {
	__class__: angular2haxe_ng_ViewConstructorData
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
var haxe_macro_Constant = { __ename__ : true, __constructs__ : ["CInt","CFloat","CString","CIdent","CRegexp"] };
haxe_macro_Constant.CInt = function(v) { var $x = ["CInt",0,v]; $x.__enum__ = haxe_macro_Constant; $x.toString = $estr; return $x; };
haxe_macro_Constant.CFloat = function(f) { var $x = ["CFloat",1,f]; $x.__enum__ = haxe_macro_Constant; $x.toString = $estr; return $x; };
haxe_macro_Constant.CString = function(s) { var $x = ["CString",2,s]; $x.__enum__ = haxe_macro_Constant; $x.toString = $estr; return $x; };
haxe_macro_Constant.CIdent = function(s) { var $x = ["CIdent",3,s]; $x.__enum__ = haxe_macro_Constant; $x.toString = $estr; return $x; };
haxe_macro_Constant.CRegexp = function(r,opt) { var $x = ["CRegexp",4,r,opt]; $x.__enum__ = haxe_macro_Constant; $x.toString = $estr; return $x; };
var haxe_macro_Binop = { __ename__ : true, __constructs__ : ["OpAdd","OpMult","OpDiv","OpSub","OpAssign","OpEq","OpNotEq","OpGt","OpGte","OpLt","OpLte","OpAnd","OpOr","OpXor","OpBoolAnd","OpBoolOr","OpShl","OpShr","OpUShr","OpMod","OpAssignOp","OpInterval","OpArrow"] };
haxe_macro_Binop.OpAdd = ["OpAdd",0];
haxe_macro_Binop.OpAdd.toString = $estr;
haxe_macro_Binop.OpAdd.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpMult = ["OpMult",1];
haxe_macro_Binop.OpMult.toString = $estr;
haxe_macro_Binop.OpMult.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpDiv = ["OpDiv",2];
haxe_macro_Binop.OpDiv.toString = $estr;
haxe_macro_Binop.OpDiv.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpSub = ["OpSub",3];
haxe_macro_Binop.OpSub.toString = $estr;
haxe_macro_Binop.OpSub.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpAssign = ["OpAssign",4];
haxe_macro_Binop.OpAssign.toString = $estr;
haxe_macro_Binop.OpAssign.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpEq = ["OpEq",5];
haxe_macro_Binop.OpEq.toString = $estr;
haxe_macro_Binop.OpEq.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpNotEq = ["OpNotEq",6];
haxe_macro_Binop.OpNotEq.toString = $estr;
haxe_macro_Binop.OpNotEq.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpGt = ["OpGt",7];
haxe_macro_Binop.OpGt.toString = $estr;
haxe_macro_Binop.OpGt.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpGte = ["OpGte",8];
haxe_macro_Binop.OpGte.toString = $estr;
haxe_macro_Binop.OpGte.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpLt = ["OpLt",9];
haxe_macro_Binop.OpLt.toString = $estr;
haxe_macro_Binop.OpLt.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpLte = ["OpLte",10];
haxe_macro_Binop.OpLte.toString = $estr;
haxe_macro_Binop.OpLte.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpAnd = ["OpAnd",11];
haxe_macro_Binop.OpAnd.toString = $estr;
haxe_macro_Binop.OpAnd.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpOr = ["OpOr",12];
haxe_macro_Binop.OpOr.toString = $estr;
haxe_macro_Binop.OpOr.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpXor = ["OpXor",13];
haxe_macro_Binop.OpXor.toString = $estr;
haxe_macro_Binop.OpXor.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpBoolAnd = ["OpBoolAnd",14];
haxe_macro_Binop.OpBoolAnd.toString = $estr;
haxe_macro_Binop.OpBoolAnd.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpBoolOr = ["OpBoolOr",15];
haxe_macro_Binop.OpBoolOr.toString = $estr;
haxe_macro_Binop.OpBoolOr.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpShl = ["OpShl",16];
haxe_macro_Binop.OpShl.toString = $estr;
haxe_macro_Binop.OpShl.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpShr = ["OpShr",17];
haxe_macro_Binop.OpShr.toString = $estr;
haxe_macro_Binop.OpShr.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpUShr = ["OpUShr",18];
haxe_macro_Binop.OpUShr.toString = $estr;
haxe_macro_Binop.OpUShr.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpMod = ["OpMod",19];
haxe_macro_Binop.OpMod.toString = $estr;
haxe_macro_Binop.OpMod.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpAssignOp = function(op) { var $x = ["OpAssignOp",20,op]; $x.__enum__ = haxe_macro_Binop; $x.toString = $estr; return $x; };
haxe_macro_Binop.OpInterval = ["OpInterval",21];
haxe_macro_Binop.OpInterval.toString = $estr;
haxe_macro_Binop.OpInterval.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpArrow = ["OpArrow",22];
haxe_macro_Binop.OpArrow.toString = $estr;
haxe_macro_Binop.OpArrow.__enum__ = haxe_macro_Binop;
var haxe_macro_Unop = { __ename__ : true, __constructs__ : ["OpIncrement","OpDecrement","OpNot","OpNeg","OpNegBits"] };
haxe_macro_Unop.OpIncrement = ["OpIncrement",0];
haxe_macro_Unop.OpIncrement.toString = $estr;
haxe_macro_Unop.OpIncrement.__enum__ = haxe_macro_Unop;
haxe_macro_Unop.OpDecrement = ["OpDecrement",1];
haxe_macro_Unop.OpDecrement.toString = $estr;
haxe_macro_Unop.OpDecrement.__enum__ = haxe_macro_Unop;
haxe_macro_Unop.OpNot = ["OpNot",2];
haxe_macro_Unop.OpNot.toString = $estr;
haxe_macro_Unop.OpNot.__enum__ = haxe_macro_Unop;
haxe_macro_Unop.OpNeg = ["OpNeg",3];
haxe_macro_Unop.OpNeg.toString = $estr;
haxe_macro_Unop.OpNeg.__enum__ = haxe_macro_Unop;
haxe_macro_Unop.OpNegBits = ["OpNegBits",4];
haxe_macro_Unop.OpNegBits.toString = $estr;
haxe_macro_Unop.OpNegBits.__enum__ = haxe_macro_Unop;
var haxe_macro_ExprDef = { __ename__ : true, __constructs__ : ["EConst","EArray","EBinop","EField","EParenthesis","EObjectDecl","EArrayDecl","ECall","ENew","EUnop","EVars","EFunction","EBlock","EFor","EIn","EIf","EWhile","ESwitch","ETry","EReturn","EBreak","EContinue","EUntyped","EThrow","ECast","EDisplay","EDisplayNew","ETernary","ECheckType","EMeta"] };
haxe_macro_ExprDef.EConst = function(c) { var $x = ["EConst",0,c]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EArray = function(e1,e2) { var $x = ["EArray",1,e1,e2]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EBinop = function(op,e1,e2) { var $x = ["EBinop",2,op,e1,e2]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EField = function(e,field) { var $x = ["EField",3,e,field]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EParenthesis = function(e) { var $x = ["EParenthesis",4,e]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EObjectDecl = function(fields) { var $x = ["EObjectDecl",5,fields]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EArrayDecl = function(values) { var $x = ["EArrayDecl",6,values]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.ECall = function(e,params) { var $x = ["ECall",7,e,params]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.ENew = function(t,params) { var $x = ["ENew",8,t,params]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EUnop = function(op,postFix,e) { var $x = ["EUnop",9,op,postFix,e]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EVars = function(vars) { var $x = ["EVars",10,vars]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EFunction = function(name,f) { var $x = ["EFunction",11,name,f]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EBlock = function(exprs) { var $x = ["EBlock",12,exprs]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EFor = function(it,expr) { var $x = ["EFor",13,it,expr]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EIn = function(e1,e2) { var $x = ["EIn",14,e1,e2]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EIf = function(econd,eif,eelse) { var $x = ["EIf",15,econd,eif,eelse]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EWhile = function(econd,e,normalWhile) { var $x = ["EWhile",16,econd,e,normalWhile]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.ESwitch = function(e,cases,edef) { var $x = ["ESwitch",17,e,cases,edef]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.ETry = function(e,catches) { var $x = ["ETry",18,e,catches]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EReturn = function(e) { var $x = ["EReturn",19,e]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EBreak = ["EBreak",20];
haxe_macro_ExprDef.EBreak.toString = $estr;
haxe_macro_ExprDef.EBreak.__enum__ = haxe_macro_ExprDef;
haxe_macro_ExprDef.EContinue = ["EContinue",21];
haxe_macro_ExprDef.EContinue.toString = $estr;
haxe_macro_ExprDef.EContinue.__enum__ = haxe_macro_ExprDef;
haxe_macro_ExprDef.EUntyped = function(e) { var $x = ["EUntyped",22,e]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EThrow = function(e) { var $x = ["EThrow",23,e]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.ECast = function(e,t) { var $x = ["ECast",24,e,t]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EDisplay = function(e,isCall) { var $x = ["EDisplay",25,e,isCall]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EDisplayNew = function(t) { var $x = ["EDisplayNew",26,t]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.ETernary = function(econd,eif,eelse) { var $x = ["ETernary",27,econd,eif,eelse]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.ECheckType = function(e,t) { var $x = ["ECheckType",28,e,t]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EMeta = function(s,e) { var $x = ["EMeta",29,s,e]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
var haxe_macro_ComplexType = { __ename__ : true, __constructs__ : ["TPath","TFunction","TAnonymous","TParent","TExtend","TOptional"] };
haxe_macro_ComplexType.TPath = function(p) { var $x = ["TPath",0,p]; $x.__enum__ = haxe_macro_ComplexType; $x.toString = $estr; return $x; };
haxe_macro_ComplexType.TFunction = function(args,ret) { var $x = ["TFunction",1,args,ret]; $x.__enum__ = haxe_macro_ComplexType; $x.toString = $estr; return $x; };
haxe_macro_ComplexType.TAnonymous = function(fields) { var $x = ["TAnonymous",2,fields]; $x.__enum__ = haxe_macro_ComplexType; $x.toString = $estr; return $x; };
haxe_macro_ComplexType.TParent = function(t) { var $x = ["TParent",3,t]; $x.__enum__ = haxe_macro_ComplexType; $x.toString = $estr; return $x; };
haxe_macro_ComplexType.TExtend = function(p,fields) { var $x = ["TExtend",4,p,fields]; $x.__enum__ = haxe_macro_ComplexType; $x.toString = $estr; return $x; };
haxe_macro_ComplexType.TOptional = function(t) { var $x = ["TOptional",5,t]; $x.__enum__ = haxe_macro_ComplexType; $x.toString = $estr; return $x; };
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
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
};
var test_ChildComponent = $hx_exports.test.ChildComponent = function() {
	this.message = "I am the child.";
};
$hxClasses["test.ChildComponent"] = test_ChildComponent;
test_ChildComponent.__name__ = ["test","ChildComponent"];
test_ChildComponent.prototype = {
	__class__: test_ChildComponent
};
var test_Dependency = $hx_exports.test.Dependency = function() {
};
$hxClasses["test.Dependency"] = test_Dependency;
test_Dependency.__name__ = ["test","Dependency"];
test_Dependency.prototype = {
	onInit: function() {
		if(angular2haxe_Trace.logLevel == "ALL") console.log("Dependency.hx result:\n" + Std.string(this));
	}
	,onMouseEnter: function(event) {
		console.log("onMouseEnter: " + this.id);
	}
	,onMouseLeave: function() {
		console.log("onMouseLeave: " + this.id);
	}
	,onResize: function(event) {
		console.log("resize " + Std.string(event));
	}
	,__class__: test_Dependency
};
var test_MyDirective = $hx_exports.test.MyDirective = function(dependency) {
	if(dependency != null) this.dependency = dependency;
};
$hxClasses["test.MyDirective"] = test_MyDirective;
test_MyDirective.__name__ = ["test","MyDirective"];
test_MyDirective.prototype = {
	onInit: function() {
		if(angular2haxe_Trace.logLevel == "ALL") console.log("MyDirective Dependency:\n" + Std.string(this.dependency));
	}
	,__class__: test_MyDirective
};
var test_NgModelDirective = $hx_exports.test.NgModelDirective = function() {
	this.ngModelChanged = new angular.EventEmitter();
	this.ngModel = "";
};
$hxClasses["test.NgModelDirective"] = test_NgModelDirective;
test_NgModelDirective.__name__ = ["test","NgModelDirective"];
test_NgModelDirective.prototype = {
	modelChanged: function(event) {
		angular2haxe_Trace.log(event);
		this.ngModelChanged.next(event.target.value);
	}
	,__class__: test_NgModelDirective
};
var test_DependencyDisplayComponent = function() {
};
$hxClasses["test.DependencyDisplayComponent"] = test_DependencyDisplayComponent;
test_DependencyDisplayComponent.__name__ = ["test","DependencyDisplayComponent"];
test_DependencyDisplayComponent.prototype = {
	__class__: test_DependencyDisplayComponent
};
var test_DisplayComponent = function(friends) {
	this.myName = "Alice";
	if(friends != null) this.names = friends.names;
};
$hxClasses["test.DisplayComponent"] = test_DisplayComponent;
test_DisplayComponent.__name__ = ["test","DisplayComponent"];
test_DisplayComponent.prototype = {
	__class__: test_DisplayComponent
};
var test_FriendsService = $hx_exports.test.FriendsService = function() {
	this.names = ["Aarav","Martín","Shannon","Ariana","Kai"];
};
$hxClasses["test.FriendsService"] = test_FriendsService;
test_FriendsService.__name__ = ["test","FriendsService"];
test_FriendsService.prototype = {
	__class__: test_FriendsService
};
var test_Greeter = $hx_exports.test.Greeter = function() {
};
$hxClasses["test.Greeter"] = test_Greeter;
test_Greeter.__name__ = ["test","Greeter"];
test_Greeter.prototype = {
	greet: function(name) {
		return "Hello " + name + "!";
	}
	,__class__: test_Greeter
};
var test_NeedsGreeter = $hx_exports.test.NeedsGreeter = function(greeter) {
	this.greeter = greeter;
};
$hxClasses["test.NeedsGreeter"] = test_NeedsGreeter;
test_NeedsGreeter.__name__ = ["test","NeedsGreeter"];
test_NeedsGreeter.prototype = {
	__class__: test_NeedsGreeter
};
var test_HelloWorld = function(greeter) {
	this.greeter = greeter;
};
$hxClasses["test.HelloWorld"] = test_HelloWorld;
test_HelloWorld.__name__ = ["test","HelloWorld"];
test_HelloWorld.prototype = {
	__class__: test_HelloWorld
};
var test_InputDirective = $hx_exports.test.InputDirective = function() {
};
$hxClasses["test.InputDirective"] = test_InputDirective;
test_InputDirective.__name__ = ["test","InputDirective"];
test_InputDirective.prototype = {
	onInit: function() {
		console.log("InputDirective.onInit: " + Std.string(this));
	}
	,onChange: function() {
	}
	,onAllChangesDone: function() {
	}
	,onCheck: function() {
	}
	,onKeyUp: function(event) {
		console.log("You just pressed a key with key code: " + event.keyCode + "!");
	}
	,__class__: test_InputDirective
};
var test_ParentComponent = function() {
	this.message = "I am the parent.";
};
$hxClasses["test.ParentComponent"] = test_ParentComponent;
test_ParentComponent.__name__ = ["test","ParentComponent"];
test_ParentComponent.prototype = {
	__class__: test_ParentComponent
};
var test_TodoList = $hx_exports.test.TodoList = function() {
	this.lastValue = "";
	this.todos = ["Eat Breakfast","Walk Dog","Breathe"];
	this.lastValue = this.todos[this.todos.length - 1];
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
		this.lastValue = todo;
		this.todos.push(todo);
	}
	,onInit: function() {
		if(angular2haxe_Trace.logLevel == "ALL") console.log("Lifecycle onInit:\n" + Std.string(this));
	}
	,onCheck: function() {
		if(angular2haxe_Trace.logLevel == "ALL") console.log("Lifecycle onCheck");
	}
	,onChange: function(changes) {
		if(angular2haxe_Trace.logLevel == "ALL") console.log("Lifecycle onChange: " + Std.string(changes));
	}
	,onAllChangesDone: function() {
		if(angular2haxe_Trace.logLevel == "ALL") console.log("Lifecycle onAllChangesDone");
	}
	,__class__: test_TodoList
};
var testcompile_ChildComponent = $hx_exports.testcompile.ChildComponent = function() {
	this.message = "I am the child.";
};
$hxClasses["testcompile.ChildComponent"] = testcompile_ChildComponent;
testcompile_ChildComponent.__name__ = ["testcompile","ChildComponent"];
testcompile_ChildComponent.prototype = {
	__class__: testcompile_ChildComponent
};
var testcompile_Dependency = $hx_exports.testcompile.Dependency = function() {
};
$hxClasses["testcompile.Dependency"] = testcompile_Dependency;
testcompile_Dependency.__name__ = ["testcompile","Dependency"];
testcompile_Dependency.prototype = {
	onInit: function() {
		if(angular2haxe_Trace.logLevel == "ALL") console.log("Dependency.hx result:\n" + Std.string(this));
	}
	,onMouseEnter: function(event) {
		console.log("onMouseEnter: " + this.id);
	}
	,onMouseLeave: function() {
		console.log("onMouseLeave: " + this.id);
	}
	,onResize: function(event) {
		console.log("resize " + Std.string(event));
	}
	,__class__: testcompile_Dependency
};
var testcompile_MyDirective = $hx_exports.testcompile.MyDirective = function(dependency) {
	if(dependency != null) this.dependency = dependency;
};
$hxClasses["testcompile.MyDirective"] = testcompile_MyDirective;
testcompile_MyDirective.__name__ = ["testcompile","MyDirective"];
testcompile_MyDirective.prototype = {
	onInit: function() {
		if(angular2haxe_Trace.logLevel == "ALL") console.log("MyDirective Dependency:\n" + Std.string(this.dependency));
	}
	,__class__: testcompile_MyDirective
};
var testcompile_NgModelDirective = $hx_exports.testcompile.NgModelDirective = function() {
	this.ngModelChanged = new angular.EventEmitter();
	this.ngModel = "";
};
$hxClasses["testcompile.NgModelDirective"] = testcompile_NgModelDirective;
testcompile_NgModelDirective.__name__ = ["testcompile","NgModelDirective"];
testcompile_NgModelDirective.prototype = {
	modelChanged: function(event) {
		angular2haxe_Trace.log(event);
		this.ngModelChanged.next(event.target.value);
	}
	,__class__: testcompile_NgModelDirective
};
var testcompile_DependencyDisplayComponent = function() {
};
$hxClasses["testcompile.DependencyDisplayComponent"] = testcompile_DependencyDisplayComponent;
testcompile_DependencyDisplayComponent.__name__ = ["testcompile","DependencyDisplayComponent"];
testcompile_DependencyDisplayComponent.prototype = {
	__class__: testcompile_DependencyDisplayComponent
};
var testcompile_FriendsService = $hx_exports.testcompile.FriendsService = function() {
	this.names = ["Aarav","Martín","Shannon","Ariana","Kai"];
};
$hxClasses["testcompile.FriendsService"] = testcompile_FriendsService;
testcompile_FriendsService.__name__ = ["testcompile","FriendsService"];
testcompile_FriendsService.prototype = {
	__class__: testcompile_FriendsService
};
var testcompile_DisplayComponent = function(friends) {
	this.myName = "Alice";
	if(friends != null) this.names = friends.names;
};
$hxClasses["testcompile.DisplayComponent"] = testcompile_DisplayComponent;
testcompile_DisplayComponent.__name__ = ["testcompile","DisplayComponent"];
testcompile_DisplayComponent.prototype = {
	__class__: testcompile_DisplayComponent
};
var testcompile_Greeter = $hx_exports.testcompile.Greeter = function() {
};
$hxClasses["testcompile.Greeter"] = testcompile_Greeter;
testcompile_Greeter.__name__ = ["testcompile","Greeter"];
testcompile_Greeter.prototype = {
	greet: function(name) {
		return "Hello " + name + "!";
	}
	,__class__: testcompile_Greeter
};
var testcompile_NeedsGreeter = $hx_exports.testcompile.NeedsGreeter = function(greeter) {
	this.greeter = greeter;
};
$hxClasses["testcompile.NeedsGreeter"] = testcompile_NeedsGreeter;
testcompile_NeedsGreeter.__name__ = ["testcompile","NeedsGreeter"];
testcompile_NeedsGreeter.prototype = {
	__class__: testcompile_NeedsGreeter
};
var testcompile_HelloWorld = function(greeter) {
	this.greeter = greeter;
};
$hxClasses["testcompile.HelloWorld"] = testcompile_HelloWorld;
testcompile_HelloWorld.__name__ = ["testcompile","HelloWorld"];
testcompile_HelloWorld.prototype = {
	__class__: testcompile_HelloWorld
};
var testcompile_InputDirective = $hx_exports.testcompile.InputDirective = function() {
};
$hxClasses["testcompile.InputDirective"] = testcompile_InputDirective;
testcompile_InputDirective.__name__ = ["testcompile","InputDirective"];
testcompile_InputDirective.prototype = {
	onInit: function() {
		console.log("InputDirective.onInit: " + Std.string(this));
	}
	,onChange: function() {
	}
	,onAllChangesDone: function() {
	}
	,onCheck: function() {
	}
	,onKeyUp: function(event) {
		console.log("You just pressed a key with key code: " + event.keyCode + "!");
	}
	,__class__: testcompile_InputDirective
};
var testcompile_ParentComponent = function() {
	this.message = "I am the parent.";
};
$hxClasses["testcompile.ParentComponent"] = testcompile_ParentComponent;
testcompile_ParentComponent.__name__ = ["testcompile","ParentComponent"];
testcompile_ParentComponent.prototype = {
	__class__: testcompile_ParentComponent
};
var testcompile_TodoList = function() {
	this.lastValue = "";
	this.todos = ["Eat Breakfast","Walk Dog","Breathe"];
	this.lastValue = this.todos[this.todos.length - 1];
};
$hxClasses["testcompile.TodoList"] = testcompile_TodoList;
testcompile_TodoList.__name__ = ["testcompile","TodoList"];
testcompile_TodoList.prototype = {
	doneTyping: function(event) {
		if(event.which == 13) {
			this.addTodo(event.target.value);
			event.target.value = "";
		}
	}
	,addTodo: function(todo) {
		this.lastValue = todo;
		this.todos.push(todo);
	}
	,onInit: function() {
		if(angular2haxe_Trace.logLevel == "ALL") console.log("Lifecycle onInit:\n" + Std.string(this));
	}
	,onCheck: function() {
		if(angular2haxe_Trace.logLevel == "ALL") console.log("Lifecycle onCheck");
	}
	,onChange: function(changes) {
		if(angular2haxe_Trace.logLevel == "ALL") console.log("Lifecycle onChange: " + Std.string(changes));
	}
	,onAllChangesDone: function() {
		if(angular2haxe_Trace.logLevel == "ALL") console.log("Lifecycle onAllChangesDone");
	}
	,__class__: testcompile_TodoList
};
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
angular2haxe_AngularExtension.angularClasses = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	_g.set("NgFor",ng.NgFor);
	_g.set("NgIf",ng.NgIf);
	$r = _g;
	return $r;
}(this));
angular2haxe_LifecycleEventExtension.initialised = false;
angular2haxe_Trace.logLevel = "ERROR";
js_Boot.__toStr = {}.toString;
test_ChildComponent.__meta__ = { obj : { Component : [{ selector : "child"}], View : [{ template : "<p>{{ message }}</p>"}]}};
test_Dependency.__meta__ = { obj : { Directive : [{ selector : "[dependency]", properties : ["id: dependency"], lifecycle : ["onInit"]}]}};
test_MyDirective.__meta__ = { obj : { Directive : [{ selector : "[my-directive]", lifecycle : ["onInit"], hostInjector : ["test.Dependency"]}]}};
test_NgModelDirective.__meta__ = { obj : { Directive : [{ selector : "[ng-model]", properties : ["ngModel"]}]}};
test_DependencyDisplayComponent.__meta__ = { obj : { Component : [{ selector : "dependency-display", compileChildren : true}], View : [{ directives : ["test.Dependency","test.MyDirective","test.NgModelDirective"], templateUrl : "templates/dependency.tpl.html"}]}};
test_DisplayComponent.__meta__ = { obj : { Component : [{ selector : "display", hostInjector : ["test.FriendsService"]}], View : [{ directives : ["NgFor","NgIf"], template : "<p>My name: {{ myName }}</p><p>Friends:</p><ul><li *ng-for=\"#name of names\">{{ name }}</li></ul><p *ng-if=\"names.length > 3\">You have many friends!</p>"}]}};
test_NeedsGreeter.__meta__ = { obj : { Directive : [{ selector : "needs-greeter", hostInjector : ["test.Greeter"]}]}};
test_HelloWorld.__meta__ = { obj : { Component : [{ selector : "greet", hostInjector : ["test.Greeter"]}], View : [{ template : "<needs-greeter>{{ greeter.greet('World') }}</needs-greeter>", directives : ["test.NeedsGreeter"]}]}};
test_InputDirective.__meta__ = { obj : { Directive : [{ selector : "input", lifecycle : ["onInit","onChange","onAllChangesDone","onCheck"], host : { '@$__hx__(keyup)' : "onKeyUp($event)"}, exportAs : "input-directive"}]}};
test_ParentComponent.__meta__ = { obj : { Component : [{ selector : "parent"}], View : [{ directives : ["test.ChildComponent"], template : "<h1>{{ message }}</h1><child></child>"}]}};
test_TodoList.__meta__ = { obj : { Component : [{ selector : "todo-list", properties : ["lastValue","todos"], lifecycle : ["onInit","onChange","onAllChangesDone","onCheck"], changeDetection : "CHECK_ALWAYS"}], View : [{ directives : ["NgFor","NgIf","test.InputDirective"], template : "Last value: {{lastValue}}<ul><li *ng-for=\"#todo of todos\">{{ todo }}</li></ul><input #textbox (keyup)=\"doneTyping($event)\"><button (click)=\"addTodo(textbox.value)\">Add Todo</button>"}]}};
testcompile_ChildComponent.__meta__ = { obj : { Component : [{ selector : "c-child"}], View : [{ template : "<p>{{ message }}</p>"}]}};
testcompile_ChildComponent.annotations = [true ? new ng.ComponentAnnotation({ selector : "c-child"}) : null,true ? new ng.ViewAnnotation({ template : "<p>{{ message }}</p>"}) : null,false ? new ng.DirectiveAnnotation(null) : null];
testcompile_ChildComponent.parameters = [];
testcompile_ChildComponent.__alreadyConstructed = true;
testcompile_Dependency.__meta__ = { obj : { Directive : [{ selector : "[c-dependency]", properties : ["id: c-dependency"], lifecycle : ["onInit"]}]}};
testcompile_Dependency.annotations = [false ? new ng.ComponentAnnotation(null) : null,false ? new ng.ViewAnnotation(null) : null,true ? new ng.DirectiveAnnotation({ lifecycle : ["onInit"], selector : "[c-dependency]", properties : ["id: c-dependency"]}) : null];
testcompile_Dependency.parameters = [];
testcompile_Dependency.__alreadyConstructed = true;
testcompile_MyDirective.__meta__ = { obj : { Directive : [{ selector : "[my-directive]", lifecycle : ["onInit"], hostInjector : ["testcompile.Dependency"]}]}};
testcompile_MyDirective.annotations = [false ? new ng.ComponentAnnotation(null) : null,false ? new ng.ViewAnnotation(null) : null,true ? new ng.DirectiveAnnotation({ lifecycle : ["onInit"], selector : "[my-directive]", hostInjector : [testcompile_Dependency]}) : null];
testcompile_MyDirective.parameters = [[testcompile_Dependency]];
testcompile_MyDirective.__alreadyConstructed = true;
testcompile_NgModelDirective.__meta__ = { obj : { Directive : [{ selector : "[ng-model]", properties : ["ngModel"]}]}};
testcompile_NgModelDirective.annotations = [false ? new ng.ComponentAnnotation(null) : null,false ? new ng.ViewAnnotation(null) : null,true ? new ng.DirectiveAnnotation({ selector : "[ng-model]", properties : ["ngModel"]}) : null];
testcompile_NgModelDirective.parameters = [];
testcompile_NgModelDirective.__alreadyConstructed = true;
testcompile_DependencyDisplayComponent.__meta__ = { obj : { Component : [{ selector : "c-dependency-display", compileChildren : true}], View : [{ directives : ["testcompile.Dependency","testcompile.MyDirective","testcompile.NgModelDirective"], templateUrl : "templates/dependency.tpl.html"}]}};
testcompile_DependencyDisplayComponent.annotations = [true ? new ng.ComponentAnnotation({ selector : "c-dependency-display", compileChildren : haxe_macro_ExprDef.EConst(haxe_macro_Constant.CIdent("true"))}) : null,true ? new ng.ViewAnnotation({ directives : [testcompile_Dependency,testcompile_MyDirective,testcompile_NgModelDirective], templateUrl : "templates/dependency.tpl.html"}) : null,false ? new ng.DirectiveAnnotation(null) : null];
testcompile_DependencyDisplayComponent.parameters = [];
testcompile_DependencyDisplayComponent.__alreadyConstructed = true;
testcompile_DisplayComponent.__meta__ = { obj : { Component : [{ selector : "c-display", hostInjector : ["testcompile.FriendsService"]}], View : [{ directives : ["NgFor","NgIf"], template : "<p>My name: {{ myName }}</p><p>Friends:</p><ul><li *ng-for=\"#name of names\">{{ name }}</li></ul><p *ng-if=\"names.length > 3\">You have many friends!</p>"}]}};
testcompile_DisplayComponent.annotations = [true ? new ng.ComponentAnnotation({ selector : "c-display", hostInjector : [testcompile_FriendsService]}) : null,true ? new ng.ViewAnnotation({ template : "<p>My name: {{ myName }}</p><p>Friends:</p><ul><li *ng-for=\"#name of names\">{{ name }}</li></ul><p *ng-if=\"names.length > 3\">You have many friends!</p>", directives : ["NgFor","NgIf"]}) : null,false ? new ng.DirectiveAnnotation(null) : null];
testcompile_DisplayComponent.parameters = [[testcompile_FriendsService]];
testcompile_DisplayComponent.__alreadyConstructed = true;
testcompile_NeedsGreeter.__meta__ = { obj : { Directive : [{ selector : "c-needs-greeter", hostInjector : ["testcompile.Greeter"]}]}};
testcompile_NeedsGreeter.annotations = [false ? new ng.ComponentAnnotation(null) : null,false ? new ng.ViewAnnotation(null) : null,true ? new ng.DirectiveAnnotation({ selector : "c-needs-greeter", hostInjector : [testcompile_Greeter]}) : null];
testcompile_NeedsGreeter.parameters = [[testcompile_Greeter]];
testcompile_NeedsGreeter.__alreadyConstructed = true;
testcompile_HelloWorld.__meta__ = { obj : { Component : [{ selector : "c-greet", hostInjector : ["testcompile.Greeter"]}], View : [{ template : "<c-needs-greeter>{{ greeter.greet('World') }}</c-needs-greeter>", directives : ["testcompile.NeedsGreeter"]}]}};
testcompile_HelloWorld.annotations = [true ? new ng.ComponentAnnotation({ selector : "c-greet", hostInjector : [testcompile_Greeter]}) : null,true ? new ng.ViewAnnotation({ template : "<c-needs-greeter>{{ greeter.greet('World') }}</c-needs-greeter>", directives : [testcompile_NeedsGreeter]}) : null,false ? new ng.DirectiveAnnotation(null) : null];
testcompile_HelloWorld.parameters = [[testcompile_Greeter]];
testcompile_HelloWorld.__alreadyConstructed = true;
testcompile_InputDirective.__meta__ = { obj : { Directive : [{ selector : "input", lifecycle : ["onInit","onChange","onAllChangesDone","onCheck"], host : { '@$__hx__(keyup)' : "onKeyUp($event)"}, exportAs : "input-directive"}]}};
testcompile_ParentComponent.__meta__ = { obj : { Component : [{ selector : "c-parent"}], View : [{ directives : ["testcompile.ChildComponent"], template : "<h1>{{ message }}</h1><c-child></c-child>"}]}};
testcompile_ParentComponent.annotations = [true ? new ng.ComponentAnnotation({ selector : "c-parent"}) : null,true ? new ng.ViewAnnotation({ template : "<h1>{{ message }}</h1><c-child></c-child>", directives : [testcompile_ChildComponent]}) : null,false ? new ng.DirectiveAnnotation(null) : null];
testcompile_ParentComponent.parameters = [];
testcompile_ParentComponent.__alreadyConstructed = true;
testcompile_TodoList.__meta__ = { obj : { Component : [{ selector : "c-todo-list", properties : ["lastValue","todos"], lifecycle : ["onInit","onChange","onAllChangesDone","onCheck"], changeDetection : "CHECK_ALWAYS"}], View : [{ directives : ["NgFor","NgIf","testcompile.InputDirective"], template : "Last value: {{lastValue}}<ul><li *ng-for=\"#todo of todos\">{{ todo }}</li></ul><input #textbox (keyup)=\"doneTyping($event)\"><button (click)=\"addTodo(textbox.value)\">Add Todo</button>"}]}};
testcompile_TodoList.annotations = [true ? new ng.ComponentAnnotation({ changeDetection : "CHECK_ALWAYS", lifecycle : ["onInit","onChange","onAllChangesDone","onCheck"], selector : "c-todo-list", properties : ["lastValue","todos"]}) : null,true ? new ng.ViewAnnotation({ template : "Last value: {{lastValue}}<ul><li *ng-for=\"#todo of todos\">{{ todo }}</li></ul><input #textbox (keyup)=\"doneTyping($event)\"><button (click)=\"addTodo(textbox.value)\">Add Todo</button>", directives : ["NgFor","NgIf",testcompile_InputDirective]}) : null,false ? new ng.DirectiveAnnotation(null) : null];
testcompile_TodoList.parameters = [];
testcompile_TodoList.__alreadyConstructed = true;
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);

//# sourceMappingURL=Angular2-Haxe.js.map