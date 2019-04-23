/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/Object","sap/ui/core/ComponentContainer","sap/ui/core/routing/HashChanger","sap/ui/core/routing/History","sap/ui/core/routing/HistoryDirection","sap/suite/ui/generic/template/lib/ProcessObserver","sap/suite/ui/generic/template/lib/routingHelper","sap/suite/ui/generic/template/lib/TemplateComponent","sap/suite/ui/generic/template/lib/testableHelper","sap/ui/fl/ControlPersonalizationAPI","sap/base/Log"],function(q,B,C,H,a,b,P,r,T,t,c,L){"use strict";var h=a.getInstance();function n(s){if(s.indexOf("/")===0){return s;}return"/"+s;}function A(o){var D="";var R="";var p=Object.keys(o).sort();p.forEach(function(s){var v=o[s].sort();for(var i=0;i<v.length;i++){var V=v[i];R=R+D+s+"="+V;D="&";}});return R;}function f(p,s){return p+(s?"?"+s:"");}function d(p,o){var s=A(o);return f(p,s);}function g(o,R,i){var s=R.template;var E=R.entitySet;var v=R.viewLevel;var O=-1;if(o.oFlexibleColumnLayoutHandler){O=v<3?v:0;}var j=O<0?o.oNavigationObserver:o.aNavigationObservers[O];var m=new P();var p=O<0?o.oHeaderLoadingObserver:o.aHeaderLoadingObservers[O];p.addObserver(m);var u={};var S={appComponent:o.oAppComponent,isLeaf:!R.pages||!R.pages.length,entitySet:E,navigationProperty:R.navigationProperty,componentData:{registryEntry:{oAppComponent:o.oAppComponent,componentCreateResolve:i,route:R.name,routeConfig:R,viewLevel:v,routingSpec:R.routingSpec,oNavigationObserver:j,oHeaderLoadingObserver:m,preprocessorsData:u}}};if(R.component.settings){q.extend(S,R.component.settings);}var w;o.oAppComponent.runAsOwner(function(){try{var x=sap.ui.core.Component.create({name:s,settings:S,handleValidation:true,manifest:true});var y;w=new C({propagateModel:true,width:"100%",height:"100%",settings:S});y=x.then(function(z){w.setComponent(z);var D=o.mRoutingTree[R.name];D.componentId=z.getId();return w;});w.loaded=function(){return y;};}catch(e){throw new Error("Component "+s+" could not be loaded");}});return w;}function k(o,e){t.testable(g,"fnCreateComponentInstance");var m={};var p={iHashChangeCount:0,backTarget:0,aCurrentKeys:[]};var s=[];var u=Promise.resolve();var v=[];var w=[];function G(){var i=e.oRouter,j=i.getTargets()._mTargets,B1=[];Object.keys(j).forEach(function(C1){var D1=j[C1],E1=D1._oOptions,F1=i.getRoute(E1.viewName),G1=F1&&F1._oConfig;if(G1&&(!G1.navigation||!G1.navigation.display)){B1.push({oConfig:G1});}});return B1;}t.testable(G,"fnGetAllPages");function x(i){var j=i||G();if(!Array.isArray(j)){j=[j];}j.forEach(function(B1){B1.oComponentContainer=g(o,B1.oConfig,function(){});});return j;}t.testable(x,"fnCreatePages");function y(){var i=e.oRouter.getViews();i.getView({viewName:"root"});return o.mRouteToTemplateComponentPromise.root;}function z(){return e.oAppComponent.getManifestEntry("sap.app").title;}function D(){return p.iHashChangeCount;}function E(i,j,B1){var C1=i&&o.componentRegistry[i];var D1=C1&&C1.methods.getUrlParameterInfo;return D1?C1.viewRegistered.then(function(){return D1(j,C1.activationTakt===p.iHashChangeCount).then(function(E1){q.extend(B1,E1);});}):Promise.resolve();}function F(i,j,B1){var C1=o.mRoutingTree[i];return E(C1.componentId,B1,j);}function I(i,j){var B1=j?F("root",i):Promise.resolve();return B1.then(A.bind(null,i));}function J(j){for(var i=0;i<j.length;i++){if(j[i].title!==v[j.length-i-1]||""){j[i].subtitle=v[j.length-i-1]||"";}}w=j;o.oShellServicePromise.then(function(B1){B1.setHierarchy(j);});}function S(i,j){v[i]=j;var B1=w[w.length-i-1];if(B1){if(B1.title!==j){B1.subtitle=j;}o.oShellServicePromise.then(function(C1){C1.setHierarchy(w);});}}var K;function M(){if(!(K instanceof T)){J([]);return;}var j=K.getEntitySet();var B1=e.oTemplateContract.mEntityTree[j];if(!B1||B1.componentId!==K.getId()){J([]);return;}var C1=o.oFlexibleColumnLayoutHandler&&B1.level<3&&!o.oTemplatePrivateGlobalModel.getProperty("/generic/FCL/isVisuallyFullScreen");var D1=o.oApplicationProxy.getLinkToUpperLayersInfo(true,C1,j);Promise.all(D1.aInfoObjectPromises).then(function(E1){var F1=[];var G1=location.hash.split("&")[0]+"&/";for(var i=E1.length-1;i>=0;i--){var H1=E1[i];var I1={intent:G1+H1.fullLink};F1.push(I1);if(i===0){I1.title=z();}else{var B1=e.oTemplateContract.mEntityTree[H1.entitySet];I1.title=B1.headerTitle;I1.icon=B1.titleIconUrl;}}J(F1);});}function O(i,j){var B1;if(!i&&j instanceof T){var C1=j&&o.componentRegistry[j.getId()];var D1=C1&&C1.methods.getTitle;B1=D1&&D1();}else if(!i&&j&&j.title){B1=j.title;}B1=B1||z();K=j;o.oShellServicePromise.then(function(E1){E1.setTitle(B1);M();});}function Q(i){var j=[o.oPagesDataLoadedObserver.getProcessFinished(true)];var B1=null;var C1=p.iHashChangeCount;var D1=-1;for(var E1 in o.componentRegistry){var F1=o.componentRegistry[E1];var G1=F1.oControllerUtils&&F1.oControllerUtils.oServices.oTemplateCapabilities.oMessageButtonHelper;var H1=F1.activationTakt===C1;var I1=F1.utils.getTemplatePrivateModel();I1.setProperty("/generic/isActive",H1);if(H1){j.push(F1.oViewRenderedPromise);if(F1.viewLevel>D1){D1=F1.viewLevel;B1=F1.oComponent;}}else{F1.utils.suspendBinding();}if(G1){G1.setEnabled(H1);}}var J1=o.oFlexibleColumnLayoutHandler&&o.oFlexibleColumnLayoutHandler.isAppTitlePrefered();O(J1,i||B1);Promise.all(j).then(function(){if(C1===p.iHashChangeCount&&q.isEmptyObject(m)){o.oAppComponent.firePageDataLoaded();}});}var R=Q.bind(null,null);function U(i){L.info("Navigate back");if(p.backTarget&&n(h.getPreviousHash()||"")!==n(p.hash)){o.oBusyHelper.setBusyReason("HashChange",true);}p.LeaveByBack=!p.forwardingInfo;window.history.go(-i);}function V(j,B1,C1,D1){var E1=o.oAppComponent.getConfig();var F1=E1&&E1.settings&&E1.settings.objectPageDynamicHeaderTitleWithVM;var G1;var H1=q.sap.getUriParameters();if(H1.mParams["sap-ui-layer"]){var I1=H1.mParams["sap-ui-layer"];for(var i=0;i<I1.length;i++){if(I1[i].toUpperCase()==="VENDOR"){G1=true;break;}}}j=n(j||"");L.info("Navigate to hash: "+j);if(j===p.hash){L.info("Navigation suppressed since hash is the current hash");return;}p.targetHash=j;if(p.backTarget&&n(h.getPreviousHash()||"")===j){U(1);return;}if(p.oEvent){var J1=p.oEvent.getParameter("config").viewLevel;}if(F1&&G1){if(!D1){if(!o.oFlexibleColumnLayoutHandler){c.clearVariantParameterInURL();}else{if(J1>=C1){if(C1===1){c.clearVariantParameterInURL();}else if(C1===2){var K1;for(var L1 in o.componentRegistry){if(o.componentRegistry[L1].viewLevel===2){K1=o.componentRegistry[L1];break;}}var M1=K1.oController.byId("template::ObjectPage::ObjectPageVariant");c.clearVariantParameterInURL(M1);}}}}}o.oBusyHelper.setBusyReason("HashChange",true);p.LeaveByReplace=B1;if(B1){e.oHashChanger.replaceHash(j);}else{e.oHashChanger.setHash(j);}}function W(i,j,B1,C1,D1,E1){var F1=j.then(function(G1){i=f(i,G1);if(D1){p.backwardingInfo={count:D1.count,index:D1.index,targetHash:n(i)};U(D1.count);}else{V(i,C1,B1,E1);}return i;});o.oBusyHelper.setBusy(F1);return F1;}function X(){var i=0;var j=p.iHashChangeCount;for(var B1=p;B1.oEvent;i++){var C1=B1.oEvent.getParameter("config").viewLevel;if(C1===0){return{count:i,index:j};}if(B1.backTarget===0){return null;}j=B1.backTarget;B1=s[j];}return null;}function Y(i,j,B1){if(B1===0){return X();}var C1=s[p.backTarget];return C1&&C1.hash&&n(C1.hash.split("?")[0])===n(j)&&{count:1,index:p.backTarget};}function Z(i){if(o.oFlexibleColumnLayoutHandler){o.oFlexibleColumnLayoutHandler.setStoredTargetLayoutToOneColumn();}c1("root","",0,i);}function $(i){var j=o.mEntityTree[i.entitySet].sRouteName;var B1=o.mRouteToTemplateComponentPromise[j];return[B1];}function _(j,B1){var C1=p.iHashChangeCount;var D1=function(F1){var G1=o.componentRegistry[F1.getId()];(G1.methods.presetDisplayMode||q.noop)(B1,C1===G1.activationTakt);};for(var i=0;i<j.length;i++){var E1=j[i];E1.then(D1);}}function a1(i){var j=i&&o.mEntityTree[i.entitySet];var B1=j?j.level:1;return B1;}function b1(j,B1){var C1=o.oApplicationProxy.getHierarchySectionsFromCurrentHash();var D1=j;for(var i=B1-2;i>=0;i--){D1=C1[i]+"/"+D1;}return"/"+D1;}function c1(i,j,B1,C1,D1){var E1={};var F1=new Promise(function(G1){F(i,E1,j).then(function(){var H1=o.oFlexibleColumnLayoutHandler?o.oFlexibleColumnLayoutHandler.getAppStateParStringForNavigation(i,B1,E1):I(E1,false);var I1=Y(C1,j,B1);W(j,H1,B1,C1,I1,D1).then(G1);});});o.oBusyHelper.setBusy(F1);return F1;}function d1(i,j,B1,C1){var D1=b1(i,j);c1(B1,D1,j,C1);}function e1(j,B1,C1,D1,E1,F1){var G1;var H1,I1;var J1=[];if(typeof j==="string"){G1=j;var K1=n(G1).split("/");H1=K1.length-1;switch(H1){case 0:I1="root";break;case 1:I1=K1[1].split("(")[0];break;default:I1="";var L1="";for(var i=0;i<H1;i++){var M1=K1[i+1];var N1=M1.indexOf("(");if(N1>0){M1=M1.substring(0,N1);}I1=I1+L1+M1;L1="/";}I1=I1.replace("---","/");}}else{var O1=r.determineNavigationPath(j,B1);H1=a1(O1);G1=O1.path;J1=$(O1);I1=o.mEntityTree[O1.entitySet].sRouteName;}if(G1){if(B1){G1=b1(G1,H1);}_(J1,D1||0);if(E1){G1=d(G1,E1);V(G1,C1,H1,F1);return Promise.resolve(G1);}else{return c1(I1,G1,H1,C1,F1);}}}function f1(i,j,B1,C1,D1){return e1(i,j,B1,C1,undefined,D1);}function g1(){var i=p.oEvent?p.oEvent.getParameter("name"):"root";var j=i.substring(i.length-5,i.length);if(j==="query"){return i.substring(0,i.length-5);}return i;}function h1(){var i=p.oEvent?p.oEvent.getParameter("name"):"";return i.length>5&&i.lastIndexOf("query")===i.length-"query".length;}function i1(i,j,B1){var C1=q.extend(Object.create(null),p.oEvent.getParameter("arguments"));var D1=p.oEvent?p.oEvent.getParameter("name"):"root";if(h1()){C1.query=C1["?query"];if(j){C1.query[i]=j;}else{delete C1.query[i];if(q.isEmptyObject(C1.query)){delete C1.query;D1=g1();}}}else if(j){D1=D1+"query";C1.query=Object.create(null);C1.query[i]=j;}var E1=e.oRouter.getURL(D1,C1);E1=E1.replace("/?","?");V(E1,B1);}function j1(i){var j=p.iHashChangeCount;p.iHashChangeCount++;s.push(null);if(i){for(var B1 in o.componentRegistry){var C1=o.componentRegistry[B1];if(C1.activationTakt===j&&i[C1.viewLevel]){C1.activationTakt=p.iHashChangeCount;}}}return{iHashChangeCount:p.iHashChangeCount};}function k1(i){var j,B1,C1,D1,E1,F1=null,G1,H1;if(i){j=i.entitySet;B1=i.text;F1=i.icon;H1=i.description;}if(j){G1=o.oAppComponent.getModel().getMetaModel();if(G1){C1=G1.getODataEntitySet(j);D1=G1.getODataEntityType(C1.entityType);E1=D1["com.sap.vocabularies.UI.v1.HeaderInfo"];}if(E1&&E1.TypeImageUrl&&E1.TypeImageUrl.String){F1=E1.TypeImageUrl.String;}}o.oShellServicePromise.then(function(K1){if(K1.setBackNavigation){K1.setBackNavigation(undefined);}});o.oTemplatePrivateGlobalModel.setProperty("/generic/messagePage",{text:B1,icon:F1,description:H1});var I1;if(e.oTemplateContract.oFlexibleColumnLayoutHandler){I1=e.oTemplateContract.oFlexibleColumnLayoutHandler.displayMessagePage(i);}else{var J1=e.oRouter.getTargets();J1.display("messagePage");}j1(I1);Q(i);}function l1(){if(!q.isEmptyObject(m)){var j=null;for(var i=0;!j;i++){j=m[i];}m={};k1(j);}}function m1(i){if(e.oTemplateContract.oFlexibleColumnLayoutHandler){i.viewLevel=i.viewLevel||0;m[i.viewLevel]=i;var j=Promise.all([u,e.oTemplateContract.oPagesDataLoadedObserver.getProcessFinished(true)]);j.then(l1);j.then(o.oBusyHelper.setBusyReason.bind(null,"HashChange",false));return;}k1(i);o.oBusyHelper.setBusyReason("HashChange",false);}function n1(){var i=[];var j=p.iHashChangeCount;for(var B1 in o.componentRegistry){var C1=o.componentRegistry[B1];if(C1.activationTakt===j){i.push(B1);}}return i;}function o1(){var i=[];for(var j in o.componentRegistry){i.push(j);}return i;}function p1(i){return p.aCurrentKeys.slice(0,i+1);}function q1(j){var B1="";var C1=p.hash;var D1=C1.split("/");var E1="";for(var i=0;i<=j;i++){B1=B1+E1+D1[i];E1="/";}return B1;}function r1(i,B1){if(B1===0){return{name:"root",pattern:""};}var C1=i.getParameter("config");var D1=C1.viewLevel;if(D1<B1){return null;}var E1=o.mEntityTree;var F1=C1.entitySet;var G1;for(var j=D1;j>=B1;j--){G1=E1[F1];F1=G1.parent;}return{name:G1.sRouteName,pattern:G1.pattern};}function s1(i,j,B1){var C1=o.componentRegistry[B1.getId()]||{};var D1=(C1.activationTakt===j.iHashChangeCount-1);C1.activationTakt=j.iHashChangeCount;var E1=B1.onActivate(i,D1)||Promise.resolve();return Promise.all([E1,C1.viewRegistered]).then(function(){C1.aKeys=p1(C1.viewLevel);});}function t1(i,j,B1){return s1(i,j,B1).then(R);}function u1(i,j,B1){var C1={};if(j||B1){var D1=i.getParameter("config").viewLevel;for(var E1=0;E1<D1;E1++){C1[E1]=o.oPaginatorInfo[E1];}}o.oPaginatorInfo=C1;}function v1(i){return o.oApplicationProxy.getAlternativeContextPromise(i);}function w1(i){if(o.oFlexibleColumnLayoutHandler){o.oFlexibleColumnLayoutHandler.handleBeforeRouteMatched(i);}}function x1(i,j){p.aCurrentKeys=[""];for(var B1=1;B1<=j;B1++){var C1="keys"+B1;p.aCurrentKeys.push(i[C1]);}}function y1(j){o.oBusyHelper.setBusyReason("HashChange",false);var B1=j.getParameter("config").viewLevel;var C1=n(e.oHashChanger.getHash()||"");L.info("Route matched with hash "+C1);var D1;if(p.backwardingInfo){D1=p;s.push(D1);var E1=D1.iHashChangeCount+1;p={iHashChangeCount:E1,forwardingInfo:{bIsProgrammatic:true,bIsBack:true,iHashChangeCount:E1,targetHash:D1.backwardingInfo.targetHash},backTarget:s[D1.backwardingInfo.index].backTarget};}if(p.forwardingInfo&&p.forwardingInfo.targetHash&&p.forwardingInfo.targetHash!==C1){p.hash=C1;var F1=p.forwardingInfo.targetHash;delete p.forwardingInfo.targetHash;V(F1,true);return;}var G1=j.getParameter("config");var H1=r.determinePath(G1,j);var I1=false;for(var i=0;i<o.aStateChangers.length;i++){var J1=o.aStateChangers[i];if(J1.isStateChange(j)){I1=true;}}if(I1){p.hash=C1;M();if(o.oFlexibleColumnLayoutHandler){o.oFlexibleColumnLayoutHandler.handleRouteMatched(j,G1,H1);}return;}o.oTemplatePrivateGlobalModel.setProperty("/generic/routeLevel",B1);var K1=p.forwardingInfo;delete p.forwardingInfo;if(!K1){K1={};var L1=p.iHashChangeCount;K1.iHashChangeCount=L1+1;K1.bIsProgrammatic=(C1===p.targetHash);var M1=h.getDirection();K1.bIsBack=!!(p.LeaveByBack||(!K1.bIsProgrammatic&&(M1===b.Backwards)));K1.bIsForward=!K1.bIsBack&&(M1===b.Forwards);p.LeaveByBack=K1.bIsBack;p.LeaveByReplace=K1.bIsProgrammatic&&p.LeaveByReplace;D1=p;s.push(D1);p={iHashChangeCount:K1.iHashChangeCount};if(D1.LeaveByReplace){p.backTarget=D1.backTarget;}else if(K1.bIsBack){p.backTarget=s[D1.backTarget].backTarget;}else{p.backTarget=L1;}}p.oEvent=j;p.hash=C1;var N1=function(P1){var Q1=j.getParameter("arguments");if(P1){var R1=Q1["?query"];p.forwardingInfo=K1;e1(P1.context,null,true,P1.iDisplayMode,R1||{});return;}x1(Q1,B1);J([]);u1(j,K1.bIsProgrammatic,K1.bIsBack);if(o.oFlexibleColumnLayoutHandler){u=o.oFlexibleColumnLayoutHandler.handleRouteMatched(j,G1,H1,K1);}else{if(G1.viewLevel===0||!(K1.bIsProgrammatic||K1.bIsBack)){o.oApplicationProxy.setEditableNDC(false);}var S1=G1.target;var T1=o.mRouteToTemplateComponentPromise[S1];u=new Promise(function(U1,V1){T1.then(function(W1){t1(H1,K1,W1).then(U1,V1);});});}o.oBusyHelper.setBusy(u);};if(K1.bIsBack){var O1=B1<2?H1:r.determinePath(G1,j,r1(j,1).pattern);o.oBusyHelper.setBusy(v1(O1).then(N1));}else{N1();}}function z1(i){i=q.extend({},i);o.oStatePreserversAvailablePromise.then(y1.bind(null,i),o.oBusyHelper.setBusyReason.bind(null,"HashChange",false));}function A1(){m1({title:o.getText("ST_ERROR"),text:o.getText("ST_GENERIC_UNKNOWN_NAVIGATION_TARGET"),description:""});}if(o.sRoutingType==="f"){e.oRouter.attachBeforeRouteMatched(w1);}e.oRouter.attachRouteMatched(z1);e.oRouter.attachBypassed(A1);e.concatPathAndAppStates=d;e.navigate=V;e.navigateToParStringPromise=W;e.getAncestralRoute=r1;e.activateOneComponent=s1;e.afterActivation=R;e.addUrlParameterInfoForRoute=F;e.getParStringPromise=I;e.getApplicableStateForComponentAddedPromise=E;e.performPseudoHashChange=j1;e.getActiveComponents=n1;e.getAllComponents=o1;e.getRootComponentPromise=y;e.getCurrenActivationTakt=D;e.getCurrentKeys=p1;e.getCurrentHash=q1;e.getTargetLevel=a1;e.getAppTitle=z;e.subTitleForViewLevelChanged=S;e.navigateToSuffix=d1;e.navigateByExchangingQueryParam=i1;e.createComponentInstance=g;return{navigateToRoot:Z,navigateToContext:f1,navigateToMessagePage:m1,navigateBack:U.bind(null,1)};}function l(o,e){var i={oAppComponent:e.oAppComponent,oRouter:e.oAppComponent.getRouter(),oTemplateContract:e,oHashChanger:H.getInstance(),mRouteToComponentResolve:{}};e.oNavigationControllerProxy=i;var F=new Promise(function(R){i.fnInitializationResolve=R;});e.oBusyHelper.setBusy(F);q.extend(o,k(e,i));q.extend(i,o);i.oRouter._oViews._getViewWithGlobalId=function(v){v.viewName=v.name||v.viewName;for(var j in e.componentRegistry){if(e.componentRegistry[j].route===v.viewName){return e.componentRegistry[j].oComponent.getComponentContainer();}}var R=i.oRouter.getRoute(v.viewName);var m;if(R&&R._oConfig){m=g(e,R._oConfig,i.mRouteToComponentResolve[v.viewName]);}else{m=sap.ui.view({viewName:v.viewName,type:v.type,height:"100%"});}if(v.viewName==="root"){e.rootContainer=m;}return m.loaded();};r.startupRouter(i);}var N=B.extend("sap.suite.ui.generic.template.lib.NavigationController",{metadata:{library:"sap.suite.ui.generic.template"},constructor:function(o){B.apply(this,arguments);t.testableStatic(l,"NavigationController")(this,o);}});N._sChanges="Changes";return N;});