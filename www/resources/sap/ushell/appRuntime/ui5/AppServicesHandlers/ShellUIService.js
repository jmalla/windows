// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/appRuntime/ui5/AppRuntimeService"],function(A){"use strict";var S={init:function(){function a(){this.setTitle=function(t){};this.createInstance=function(){var d=new jQuery.Deferred();d.resolve(this);return d.promise();};this.setHierarchy=function(){};};var s=new a();sap.ui.core.service.ServiceFactoryRegistry.register("sap.ushell.ui5service.ShellUIService",s);},getId:function(){return"sap.ushell.services.ShellUIService";},isTrustedPostMessageSource:function(){return true;},getHandlers:function(){return{};}};return S;},false);
