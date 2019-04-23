﻿/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Opa','./OpaPlugin','./PageObjectFactory','sap/ui/base/Object','sap/ui/Device','./launchers/iFrameLauncher','./launchers/componentLauncher','sap/ui/core/routing/HashChanger','./matchers/Matcher','./matchers/AggregationFilled','./matchers/PropertyStrictEquals','./pipelines/MatcherPipeline','./pipelines/ActionPipeline','./_ParameterValidator','./_LogCollector','./_OpaLogger','sap/ui/thirdparty/URI','sap/ui/base/EventProvider','sap/ui/qunit/QUnitUtils'],function($,O,a,P,U,D,f,c,H,M,A,b,d,e,_,g,h,i,E,Q){"use strict";var l=h.getLogger("sap.ui.test.Opa5"),p=new a(),o=new e(),F="OpaFrame",v=new _({errorPrefix:"sap.ui.test.Opa5#waitFor"}),C=["visible","viewNamespace","viewName","autoWait"].concat(O._aConfigValuesForWaitFor),j=["check","error","success"].concat(O._aConfigValuesForWaitFor),k=[],m=new E();O._extractAppParams=function(){var B=[/opa.*/,/hidepassed/,/noglobals/,/notrycatch/,/coverage/,/module/,/filter/];var x={};var y=new i().search(true);for(var z in y){var G=false;for(var I=0;I<B.length;I++){if(z.match(B[I])){l.debug("Skipping uri parameter: "+z+" as blacklisted with pattern: "+B[I]);G=true;break;}}if(!G){x[z]=O._parseParam(y[z]);}}return x;};var r=function(T,x){for(var K in x){if(T.hasOwnProperty(K)&&x.hasOwnProperty(K)){if(typeof T[K]=="object"&&typeof x[K]=="object"){r(T[K],x[K]);}else{delete T[K];}}}return T;};var n=O._extractAppParams();var q=U.extend("sap.ui.test.Opa5",$.extend({},O.prototype,{constructor:function(){O.apply(this,arguments);}}));function s(S,T){var x=this;if(S&&typeof S!=="string"){S=S.toString();}var y=new i(S);y.search($.extend(y.search(true),O.config.appParams));var z=w();z.success=function(){u(y.toString());};this.waitFor(z);var B=w();B.check=f.hasLaunched;B.timeout=T||80;B.errorMessage="unable to load the IFrame with the url: "+S;x.waitFor(B);var L=w();L.success=function(){x._loadExtensions(f.getWindow());};return this.waitFor(L);}q.prototype.iStartMyUIComponent=function iStartMyUIComponent(x){var y=this;var z=false;x=x||{};var B=w();B.success=function(){var I=new i();I.search($.extend(I.search(true),O.config.appParams));window.history.replaceState({},"",I.toString());};this.waitFor(B);var S=w();S.success=function(){var I=jQuery.sap.getModulePath("sap.ui.test.OpaCss",".css");$.sap.includeStyleSheet(I);H.getInstance().setHash(x.hash||"");c.start(x.componentConfig).then(function(){z=true;});};this.waitFor(S);var G=w();G.errorMessage="Unable to load the component with the name: "+x.name;G.check=function(){return z;};if(x.timeout){G.timeout=x.timeout;}y.waitFor(G);var L=w();L.success=function(){y._loadExtensions(window);};return this.waitFor(L);};q.prototype.iTeardownMyUIComponent=function iTeardownMyUIComponent(){var x=w();x.success=function(){c.teardown();};var y=w();y.success=function(){var z=new i();z.search(r(z.search(true),O.config.appParams));window.history.replaceState({},"",z.toString());};return $.when(this.waitFor(x),this.waitFor(y));};q.prototype.iTeardownMyApp=function(){var x=this;var y=w();y.success=function(){x._unloadExtensions(q.getWindow());};var z=w();z.success=function(){if(f.hasLaunched()){this.iTeardownMyAppFrame();}else if(c.hasLaunched()){this.iTeardownMyUIComponent();}else{var B="A teardown was called but there was nothing to tear down use iStartMyComponent or iStartMyAppInAFrame";l.error(B,"Opa");throw new Error(B);}}.bind(this);return $.when(this.waitFor(y),this.waitFor(z));};q.iStartMyAppInAFrame=s;q.prototype.iStartMyAppInAFrame=s;function t(){var W=w();W.success=function(){f.teardown();};return this.waitFor(W);}q.iTeardownMyAppFrame=t;q.prototype.iTeardownMyAppFrame=t;q.prototype.hasAppStartedInAFrame=function(){return f.hasLaunched();};q.prototype.hasUIComponentStarted=function(){return c.hasLaunched();};q.prototype.hasAppStarted=function(){return f.hasLaunched()||c.hasLaunched();};q.prototype.waitFor=function(x){var y=x.actions,z=O._createFilteredConfig(C),B;x=$.extend({},z,x);x.actions=y;v.validate({validationInfo:q._validationInfo,inputToValidate:x});var G=x.check,I=null,J=x.success,R,K;B=O._createFilteredOptions(j,x);B.check=function(){var p=q.getPlugin();R=p._getFilteredControls(x,I);if(f.hasLaunched()&&$.isArray(R)){var L=[];R.forEach(function(N){L.push(N);});R=L;}if(R===a.FILTER_FOUND_NO_CONTROLS){return false;}if(G){return this._executeCheck(G,R);}return true;};B.success=function(){var W=O._getWaitForCounter();if(y&&(R||!K)){o.process({actions:y,control:R});}if(!J){return;}var L=[];if(R){L.push(R);}if(W.get()===0){J.apply(this,L);return;}var N=w();N.autoWait=x.autoWait;N.success=function(){J.apply(this,L);};this.waitFor(N);};return O.prototype.waitFor.call(this,B);};q.getPlugin=function(){return f.getPlugin()||p;};q.getJQuery=function(){return f.getJQuery()||$;};q.getWindow=function(){return f.getWindow()||window;};q.getUtils=function(){return f.getUtils()||Q;};q.getHashChanger=function(){return f.getHashChanger()||H.getInstance();};q.extendConfig=function(x){O.extendConfig(x);O.extendConfig({appParams:n});};q.resetConfig=function(){O.resetConfig();O.extendConfig({viewNamespace:"",arrangements:new q(),actions:new q(),assertions:new q(),visible:true,autoWait:false,_stackDropCount:1});O.extendConfig({appParams:n});};q.getTestLibConfig=function(T){return O.config.testLibs&&O.config.testLibs[T]?O.config.testLibs[T]:{};};q.emptyQueue=O.emptyQueue;q.stopQueue=O.stopQueue;q.getContext=O.getContext;q.matchers={};q.matchers.Matcher=M;q.matchers.AggregationFilled=A;q.matchers.PropertyStrictEquals=b;q.createPageObjects=function(x){return P.create(x,q);};q.prototype._executeCheck=function(x,y){var z=[];y&&z.push(y);l.debug("Opa is executing the check: "+x);var R=x.apply(this,z);l.debug("Opa check was "+R);return R;};q.resetConfig();function u(S){var I=$.sap.getModulePath("sap.ui.test.OpaCss",".css");$.sap.includeStyleSheet(I);return f.launch({frameId:F,source:S,opaLogLevel:O.config.logLevel});}function w(){return{viewName:null,controlType:null,id:null,searchOpenDialogs:false,autoWait:false};}$(function(){if($("#"+F).length){u();}$("body").addClass("sapUiBody");$("html").height("100%");});q._validationInfo=$.extend({_stack:"string",viewName:"string",viewNamespace:"string",visible:"bool",matchers:"any",actions:"any",id:"any",controlType:"any",searchOpenDialogs:"bool",autoWait:"bool"},O._validationInfo);q._getEventProvider=function(){return m;};q.prototype._loadExtensions=function(x){var y=this;var z=O.config.extensions?O.config.extensions:[];var B=$.when($.map(z,function(G){var I;var J=$.Deferred();x.sap.ui.require([G],function(K){I=new K();I.name=G;y._executeExtensionOnAfterInit(I,x).done(function(){q._getEventProvider().fireEvent('onExtensionAfterInit',{extension:I,appWindow:x});y._addExtension(I);J.resolve();}).fail(function(L){l.error(new Error("Error during extension init: "+L),"Opa");J.resolve();});});return J.promise();}));return this._schedulePromiseOnFlow(B);};q.prototype._unloadExtensions=function(x){var y=this;var z=$.when($.map(this._getExtensions(),function(B){var G=$.Deferred();q._getEventProvider().fireEvent('onExtensionBeforeExit',{extension:B});y._executeExtensionOnBeforeExit(B,x).done(function(){G.resolve();}).fail(function(I){l.error(new Error("Error during extension init: "+I),"Opa");G.resolve();});return G.promise();}));this._schedulePromiseOnFlow(z);};q.prototype._addExtension=function(x){k.push(x);};q.prototype._getExtensions=function(){return k;};q.prototype._executeExtensionOnAfterInit=function(x,y){var z=$.Deferred();var B=x.onAfterInit;if(B){B.bind(y)().done(function(){z.resolve();}).fail(function(G){z.reject(new Error("Error while waiting for extension: "+x.name+" to init, details: "+G));});}else{z.resolve();}return z.promise();};q.prototype._executeExtensionOnBeforeExit=function(x,y){var z=$.Deferred();var B=x.onBeforeExit;if(B){B.bind(y)().done(function(){z.resolve();}).fail(function(G){z.reject(new Error("Error while waiting for extension: "+x.name+" to exit, details: "+G));});}else{z.resolve();}return z.promise();};return q;},true);
