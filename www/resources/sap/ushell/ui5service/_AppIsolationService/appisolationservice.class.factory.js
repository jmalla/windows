sap.ui.define(["sap/ui/base/EventProvider",'sap/ushell/EventHub'],function(E,a){"use strict";return function(s){var S=s.serviceRegistry,b=s.serviceFactory,c=s.service;var e=new E(),A;var o=undefined;var d=c.extend("sap.ushell.ui5service.AppIsolationService",{init:function(){var t=this,p=this.getInterface();p.init=function(){t._amendPublicServiceInstance.call(t,this);};S.register("sap.ushell.ui5service.AppIsolationService",new b(p));},_setActiveComponentId:function(i){A=i;},_getActiveComponentId:function(){return A;},_getEventProvider:function(){return e;},_ensureArrayOfObjectOfStrings:function(v,m){var V=jQuery.isArray(v)&&v.every(function(O){return jQuery.isPlainObject(O)&&Object.keys(O).length>0&&Object.keys(O).every(function(k){return typeof O[k]==="string";});});if(!V){jQuery.sap.log.error("'"+m+"' was called with invalid parameters","An array of non-empty objects with string values is expected","sap.ushell.ui5service.AppIsolationService");}return V;},_ensureFunction:function(v,m){var t=typeof v;if(t!=="function"){jQuery.sap.log.error("'"+m+"' was called with invalid arguments","the parameter should be a function, got '"+t+"' instead","sap.ushell.ui5service.AppIsolationService");return false;}return true;},_ensureString:function(v,m){var t=typeof v;if(t!=="string"){jQuery.sap.log.error("'"+m+"' was called with invalid arguments","the parameter should be a string, got '"+t+"' instead","sap.ushell.ui5service.AppIsolationService");return false;}return true;},_addCallAllowedCheck:function(p,P){var t=this;p[P]=function(){var C=p.getContext();if(!C||C.scopeObject.getId()!==A){jQuery.sap.log.warning("Call to "+P+" is not allowed","This may be caused by an app component other than the active '"+A+"' that tries to call the method","sap.ushell.ui5service.AppIsolationService");return undefined;}return t[P].apply(p,arguments);};},_amendPublicServiceInstance:function(p){var C;var P={AppLifeCycle:undefined};sap.ui.getCore().getEventBus().publish("sap.ushell","getAppLifeCycle",P);o=P.AppLifeCycle;C=p.getContext();if(typeof C==="undefined"){return;}if(C.scopeType==="component"){this._setActiveComponentId(C.scopeObject.getId());return;}jQuery.sap.log.error("Invalid context for AppIsolationService interface","The context must be empty or an object like { scopeType: ..., scopeObject: ... }","sap.ushell.ui5service.AppIsolationService");},getUxdVersion:function(){if((new jQuery.sap.Version(sap.ui.version).compareTo("1.37.0"))>=0){return 2;}return 1;},registerShellCommunicationHandler:function(C,f){o.registerShellCommunicationHandler(C,f);},registerIframeCommunicationHandler:function(h,f){o.registerIframeCommunicationHandler(h,f);},getCurrentAppHash:function(){return o.getCurrentApplication().hash;},getCurrentAppTargetResolution:function(){return o.getCurrentApplication().target;},getIframeHandelrs:function(){return o.getCurrentApplication().container.getIframeHandlers();},jsonStringifyFn:function(j){var r=JSON.stringify(j,function(k,v){return(typeof v==='function')?v.toString():v;});return r;}});return d;};});
