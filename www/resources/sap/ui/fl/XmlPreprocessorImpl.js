/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Component","sap/ui/fl/FlexControllerFactory","sap/ui/fl/Utils","sap/ui/fl/ChangePersistenceFactory","sap/ui/fl/ChangePersistence"],function(C,F,U,a,b){"use strict";var X=function(){};X.process=function(v,p){try{if(!p||p.sync){U.log.warning("Flexibility feature for applying changes on an XML view is only available for "+"asynchronous views; merge is be done later on the JS controls.");return(v);}p.viewId=p.id;var c=C.get(p.componentId);if(!c){U.log.warning("View is generated without a component. Flexibility features are not possible.");return Promise.resolve(v);}var A=U.getAppComponentForControl(c);if(!U.isApplication(A.getManifestObject())){return Promise.resolve(v);}var f=U.getComponentClassName(A);var s=U.getAppVersionFromManifest(A.getManifest());var o=F.create(f,s);return o.processXmlView(v,p).then(function(){U.log.debug("flex processing view "+p.id+" finished");return v;}).catch(function(){U.log.warning("Error happens when getting flex cache key! flexibility XML view preprocessing is skipped. "+"The processing will be done later on the JS controls.");return Promise.resolve(v);});}catch(e){var E="view "+p.id+": "+e;U.log.info(E);return Promise.resolve(v);}};X.getCacheKey=function(p){var c=C.get(p.componentId);var A=U.getAppComponentForControl(c);if(U.isVariantByStartupParameter(A)){return Promise.resolve();}var f=U.getComponentClassName(A);var s=U.getAppVersionFromManifest(A.getManifest());var o=a.getChangePersistenceForComponent(f,s);return o.getCacheKey();};return X;},true);
