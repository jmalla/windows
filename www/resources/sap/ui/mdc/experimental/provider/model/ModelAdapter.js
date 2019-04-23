﻿/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/Object"],function(q,B){"use strict";var M=B.extend("sap.ui.mdc.experimental.provider.model.ModelAdapter",{oMetaModel:undefined,sModelName:undefined,_mPropertyBag:{},constructor:function(m,s,a,c){this.oModel=m;this.oMetaModel=m.getMetaModel();this.sModelName=s;c=c||false;if(a){this.switchMetaContext(a,c);}this.putProperty("propertyValue",this.propertyValue);this.putProperty("key",this.key);this.putProperty("visible",this.visible);this.putProperty("hidden",this.hidden);this.putProperty("enabled",this.enabled);this.putProperty("disabled",this.disabled);this.putProperty("required",this.required);this.putProperty("semantics",this.semantics);this.putProperty("ui5Type",this.ui5Type);this.putProperty("formatOptions",this.formatOptions);this.putProperty("tooltip",this.tooltip);this.putProperty("label",this.label);this.putProperty("filterable",this.filterable);this.putProperty("requiredInFilter",this.requiredInFilter);this.putProperty("sortable",this.sortable);},ready:function(){if(this.oMetaModel.loaded){return this.oMetaModel.loaded();}},switchMetaContext:function(m,c){var C;if(c){C=m;}else{this.oMetaContext=this.oMetaModel.getMetaContext(m);C=this.oMetaContext.getPath();}if(C&&C!=this.sMetaContext){this.sMetaContext=C;if(!this._mPropertyBag[this.sMetaContext]){this._mPropertyBag[this.sMetaContext]={};}}this.afterMetaContextSwitch(this.sMetaContext,m);},afterMetaContextSwitch:function(m){throw new Error("sap.ui.mdc.experimental.provider.model.ModelAdapter:  method afterMetaContextSwitch must be redefined");},getModelName:function(){return this.sModelName;},putProperty:function(p,g,a,c){if(!c){c=this;}Object.defineProperty(this,p,{configurable:true,get:function(){if(!this._mPropertyBag[this.sMetaContext].hasOwnProperty(p)){this._mPropertyBag[this.sMetaContext][p]=g.apply(c,a);}return this._mPropertyBag[this.sMetaContext][p];}});},propertyValue:function(){return this.asPath(this.key);},key:function(){throw new Error("sap.ui.mdc.experimental.provider.model.ModelAdapter:  method key must be redefined");},visible:function(){throw new Error("sap.ui.mdc.experimental.provider.model.ModelAdapter:  method visible must be redefined");},hidden:function(){throw new Error("sap.ui.mdc.experimental.provider.model.ModelAdapter:  method isHidden must be redefined");},enabled:function(){throw new Error("sap.ui.mdc.experimental.provider.model.ModelAdapter:  method isEnabled must be redefined");},disabled:function(){throw new Error("sap.ui.mdc.experimental.provider.model.ModelAdapter:  method isDisabled must be redefined");},required:function(){throw new Error("sap.ui.mdc.experimental.provider.model.ModelAdapter:  method isRequired must be redefined");},semantics:function(){throw new Error("sap.ui.mdc.experimental.provider.model.ModelAdapter:  method semantics must be redefined");},url:function(){throw new Error("sap.ui.mdc.experimental.provider.model.ModelAdapter:  method isURL must be redefined");},password:function(){throw new Error("sap.ui.mdc.experimental.provider.model.ModelAdapter:  method isPassword must be redefined");},phoneNumber:function(){throw new Error("sap.ui.mdc.experimental.provider.model.ModelAdapter:  method isPhoneNumber must be redefined");},eMail:function(){throw new Error("sap.ui.mdc.experimental.provider.model.ModelAdapter:  method isEmail must be redefined");},label:function(){throw new Error("sap.ui.mdc.experimental.provider.model.ModelAdapter:  method getLabel must be redefined");},tooltip:function(){throw new Error("sap.ui.mdc.experimental.provider.model.ModelAdapter:  method getTooltip must be redefined");},ui5Type:function(){throw new Error("sap.ui.mdc.experimental.provider.model.ModelAdapter:  method getUI5Type must be redefined");},formatOptions:function(){throw new Error("sap.ui.mdc.experimental.provider.model.ModelAdapter:  method formatOptions must be redefined");},filterable:function(){throw new Error("sap.ui.mdc.experimental.provider.model.ModelAdapter:  method filterable must be redefined");},requiredInFilter:function(){throw new Error("sap.ui.mdc.experimental.provider.model.ModelAdapter:  method requiredInFilter must be redefined");},sortable:function(){throw new Error("sap.ui.mdc.experimental.provider.model.ModelAdapter:  method sortable must be redefined");},asPath:function(s,w){var p=this.sModelName?this.sModelName+">"+s:s;if(!w){p="{path: '"+p+"'}";}return p;}});M.Semantics={eMail:1,password:2,url:3,phoneNumber:4,currency:5,measure:6};return M;});
