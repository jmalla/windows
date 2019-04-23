// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(['sap/ui/core/mvc/Controller','sap/ushell/ui/launchpad/AccessibilityCustomData','sap/ushell/ui5service/ShellUIService','sap/ushell/EventHub','sap/ushell/components/CatalogsManager'],function(C,A,S,E,a){"use strict";return C.extend("sap.ushell.components.appfinder.AppFinder",{onInit:function(){sap.ushell.Container.getRenderer("fiori2").createExtendedShellState("appFinderExtendedShellState",function(){sap.ushell.Container.getRenderer("fiori2").showHeaderItem('backBtn',true);sap.ushell.Container.getRenderer("fiori2").showHeaderItem('homeBtn',true);});var v=this.getView(),m=v.getModel(),s=v.showEasyAccessMenu;var c={model:m};this.oCatalogsManager=new a("catalogsMgr",c);this.getView().setModel(this._getSubHeaderModel(),"subHeaderModel");this.oConfig=v.parentComponent.getComponentData().config;this.catalogView=sap.ui.view("catalogView",{type:sap.ui.core.mvc.ViewType.JS,viewName:"sap.ushell.components.appfinder.Catalog",height:"100%",viewData:{parentComponent:v.parentComponent,subHeaderModel:this._getSubHeaderModel()}});this.catalogView.addStyleClass('sapUiGlobalBackgroundColor sapUiGlobalBackgroundColorForce');this._addViewCustomData(this.catalogView,"appFinderCatalogTitle");this.oRouter=this.getView().parentComponent.getRouter();this.oRouter.attachRouteMatched(this._handleAppFinderNavigation.bind(this));v.createSubHeader();if(!s){v.oPage.addContent(this.catalogView);setTimeout(function(){jQuery('#catalogSelect').focus();},0);}sap.ui.Device.resize.attachHandler(this._resizeHandler.bind(this));this.oRouter.initialize();},_resizeHandler:function(){var s=this._showOpenCloseSplitAppButton();var c=this.oSubHeaderModel.getProperty('/openCloseSplitAppButtonVisible');if(s!=c){this.oSubHeaderModel.setProperty('/openCloseSplitAppButtonVisible',s);if(s){this.oSubHeaderModel.setProperty('/openCloseSplitAppButtonToggled',false);}}this._toggleViewWithToggleButtonClass(s);},_handleAppFinderNavigation:function(e){var v=this.getView();this._preloadAppHandler();this._getPathAndHandleGroupContext(e);this._toggleViewWithToggleButtonClass(this._showOpenCloseSplitAppButton());if(v.showEasyAccessMenu){this.onShow(e);}else if(v._showSearch('catalog')){v.updateSubHeader('catalog',false);this._toggleViewWithSearchAndTagsClasses('catalog');}sap.ui.getCore().getEventBus().publish("showCatalog");E.emit("CenterViewPointContentRendered","appFinder");E.emit("showCatalog",{sId:"showCatalog",oData:Date.now()});sap.ui.getCore().getEventBus().publish("launchpad","contentRendered");},_showOpenCloseSplitAppButton:function(){return!sap.ui.Device.orientation.landscape||sap.ui.Device.system.phone;},_resetSubHeaderModel:function(){this.oSubHeaderModel.setProperty('/activeMenu',null);this.oSubHeaderModel.setProperty('/search',{searchMode:false,searchTerm:null});this.oSubHeaderModel.setProperty('/tag',{tagMode:false,selectedTags:[]});this.oSubHeaderModel.setProperty('/openCloseSplitAppButtonVisible',this._showOpenCloseSplitAppButton());this.oSubHeaderModel.setProperty('/openCloseSplitAppButtonToggled',false);},_getSubHeaderModel:function(){if(this.oSubHeaderModel){return this.oSubHeaderModel;}this.oSubHeaderModel=new sap.ui.model.json.JSONModel();this._resetSubHeaderModel();return this.oSubHeaderModel;},onTagsFilter:function(e){var t=e.getSource(),s=t.getModel('subHeaderModel'),b=e.getSource().getSelectedItems(),T=b.length>0,o={tagMode:T,selectedTags:[]};b.forEach(function(c,i){o.selectedTags.push(c.getText());});s.setProperty('/activeMenu',this.getCurrentMenuName());s.setProperty('/tag',o);sap.ui.getCore().byId("catalogView").getController().onTag(o);},searchHandler:function(e){var c=sap.ushell.components.getCatalogsManager();c.loadCustomTilesKeyWords();var s=e.getSource().getValue(),b=false;if(s==null){return;}var o=this.oSubHeaderModel.getProperty('/search');var d=this.oSubHeaderModel.getProperty('/activeMenu');if(this.getCurrentMenuName()!=d){d=this.getCurrentMenuName();}if(!o.searchMode&&!e.getParameter('clearButtonPressed')){o.searchMode=true;}if(o.searchMode&&sap.ui.Device.system.phone){this.oSubHeaderModel.setProperty("/openCloseSplitAppButtonToggled",false);}if(s!=o.searchTerm){if(this.containsOnlyWhiteSpac(s)){s='*';}o.searchTerm=s;b=true;}this.oSubHeaderModel.setProperty("/search",o);this.oSubHeaderModel.setProperty("/activeMenu",d);this.oSubHeaderModel.refresh(true);if(b){sap.ui.getCore().byId("catalogView").getController().onSearch(o);}},_preloadAppHandler:function(){setTimeout(function(){if(sap.ushell.Container){sap.ushell.Container.getRenderer("fiori2").applyExtendedShellState("appFinderExtendedShellState");}this._updateShellHeader(this.oView.oPage.getTitle());}.bind(this),0);},getCurrentMenuName:function(){return this.currentMenu;},_navigateTo:function(n,m){var g=this.oView.getModel().getProperty("/groupContext");var G=g?g.path:null;if(G){this.oRouter.navTo(n,{filters:JSON.stringify({targetGroup:encodeURIComponent(G)})},true);}else{this.oRouter.navTo(n,{},true);}},getSystemsModels:function(){var t=this;if(this.getSystemsPromise){return this.getSystemsPromise;}var g=new jQuery.Deferred();this.getSystemsPromise=g.promise();var m=["userMenu","sapMenu"].map(function(b){var s=new sap.ui.model.json.JSONModel();s.setProperty("/systemSelected",null);s.setProperty("/systemsList",[]);return t.getSystems(b).then(function(r){s.setProperty("/systemsList",r);return s;});});jQuery.when.apply(jQuery,m).then(function(u,s){g.resolve(u,s);});return this.getSystemsPromise;},onSegmentButtonClick:function(e){switch(e.getParameters().id){case"catalog":this._navigateTo("catalog");break;case"userMenu":this._navigateTo("userMenu");break;case"sapMenu":this._navigateTo("sapMenu");break;}},onShow:function(e){var p=e.getParameter("name");if(p===this.getCurrentMenuName()){return;}var v=this.getView();v._updateSearchWithPlaceHolder(p);this._updateCurrentMenuName(p);this.getSystemsModels().then(function(u,s){var b=s.getProperty("/systemsList");var c=u.getProperty("/systemsList");v.oPage.removeAllContent();var d=(this.currentMenu==='sapMenu'?b:c);if(d&&d.length){v.updateSubHeader(this.currentMenu,true);}else if(v._showSearch(this.currentMenu)){v.updateSubHeader(this.currentMenu,false);}if(this.currentMenu==='catalog'){v.oPage.addContent(this.catalogView);}else if(this.currentMenu==='userMenu'){if(!this.userMenuView){this.userMenuView=new sap.ui.view("userMenuView",{type:sap.ui.core.mvc.ViewType.JS,viewName:"sap.ushell.components.appfinder.EasyAccess",height:"100%",viewData:{menuName:"USER_MENU",easyAccessSystemsModel:u,parentComponent:v.parentComponent,subHeaderModel:this._getSubHeaderModel(),enableSearch:this.getView()._showSearch("userMenu")}});this._addViewCustomData(this.userMenuView,"appFinderUserMenuTitle");}v.oPage.addContent(this.userMenuView);}else if(this.currentMenu==='sapMenu'){if(!this.sapMenuView){this.sapMenuView=new sap.ui.view("sapMenuView",{type:sap.ui.core.mvc.ViewType.JS,viewName:"sap.ushell.components.appfinder.EasyAccess",height:"100%",viewData:{menuName:"SAP_MENU",easyAccessSystemsModel:s,parentComponent:v.parentComponent,subHeaderModel:this._getSubHeaderModel(),enableSearch:this.getView()._showSearch("sapMenu")}});this._addViewCustomData(this.sapMenuView,"appFinderSapMenuTitle");}v.oPage.addContent(this.sapMenuView);}this._setFocusToSegmentedButton(d);this.oSubHeaderModel.setProperty("/activeMenu",this.currentMenu);if(this.oSubHeaderModel.getProperty("/openCloseSplitAppButtonVisible")){this.oSubHeaderModel.setProperty("/openCloseSplitAppButtonToggled",false);}this.oSubHeaderModel.refresh(true);}.bind(this));},_updateCurrentMenuName:function(m){var v=this.getView();if(!v.showEasyAccessMenu||(m==="sapMenu"&&!v.enableEasyAccessSAPMenu)||(m==="userMenu"&&!v.enableEasyAccessUserMenu)){this.currentMenu="catalog";}else{this.currentMenu=m;}this._toggleViewWithSearchAndTagsClasses(m);},_toggleViewWithSearchAndTagsClasses:function(m){var v=this.getView();if(v._showSearch(m)){v.oPage.addStyleClass('sapUshellAppFinderSearch');}else{v.oPage.removeStyleClass('sapUshellAppFinderSearch');}if(v._showSearchTag(m)){v.oPage.addStyleClass('sapUshellAppFinderTags');}else{v.oPage.removeStyleClass('sapUshellAppFinderTags');}},_toggleViewWithToggleButtonClass:function(b){var v=this.getView();if(b){v.oPage.addStyleClass('sapUshellAppFinderToggleButton');}else{v.oPage.removeStyleClass('sapUshellAppFinderToggleButton');}},_setFocusToSegmentedButton:function(s){var v=this.getView();if(s&&s.length){var b=v.segmentedButton.getSelectedButton();setTimeout(function(){jQuery("#"+b).focus();},0);}else{setTimeout(function(){jQuery('#catalogSelect').focus();},0);}},_getPathAndHandleGroupContext:function(e){var p=e.getParameter('arguments');var d=p.filters;var D=d?JSON.parse(d):d;var P=(D&&decodeURIComponent(D.targetGroup))||"";P=P==='undefined'?undefined:P;this._updateModelWithGroupContext(P);},_updateModelWithGroupContext:function(p){var l=sap.ushell.Container.getService("LaunchPage"),m=this.oView.getModel(),g,G={path:p,id:"",title:""};if(p&&p!==""){var t=function(){var M=m.getProperty("/groups");if(M.length){g=m.getProperty(p);G.id=l.getGroupId(g.object);G.title=g.title||l.getGroupTitle(g.object);return;}setTimeout(t,100);};t();}m.setProperty("/groupContext",G);},getSystems:function(m){var d=new jQuery.Deferred();var c=sap.ushell.Container.getService("ClientSideTargetResolution");if(!c){d.reject("cannot get ClientSideTargetResolution service");}else{c.getEasyAccessSystems(m).done(function(s){var b=[];var e=Object.keys(s);for(var i=0;i<e.length;i++){var f=e[i];b[i]={"systemName":s[f].text,"systemId":f};}d.resolve(b);}).fail(function(e){d.reject("An error occurred while retrieving the systems: "+e);});}return d.promise();},_addViewCustomData:function(v,t){var r=sap.ushell.resources.i18n;v.addCustomData(new A({key:"role",value:"region",writeToDom:true}));v.addCustomData(new A({key:"aria-label",value:r.getText(t),writeToDom:true}));},_initializeShellUIService:function(){this.oShellUIService=new S({scopeObject:this.getOwnerComponent(),scopeType:"component"});},_updateShellHeader:function(t){if(!this.oShellUIService){this._initializeShellUIService();}this.oShellUIService.setTitle(t);this.oShellUIService.setHierarchy();},containsOnlyWhiteSpac:function(t){if(!t||t===""){return false;}var T=t;return(!T.replace(/\s/g,'').length);}});},false);
