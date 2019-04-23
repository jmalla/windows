﻿/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Control","sap/ui/vk/dvl/Viewport","sap/m/OverflowToolbar","./ViewportHandler","sap/ui/vk/FlexibleControl","sap/ui/vk/FlexibleControlLayoutData"],function(q,S,a,b,c,d,e){"use strict";var V=S.extend("sap.ui.vtm.Viewport",{metadata:{properties:{backgroundGradientTopColor:{type:"sap.ui.core.CSSColor",defaultValue:"black"},backgroundGradientBottomColor:{type:"sap.ui.core.CSSColor",defaultValue:"white"},overrideDisplayGroups:{type:"object[]",defaultValue:[]},contextDisplayGroups:{type:"object[]",defaultValue:[]}},aggregations:{_container:{type:"sap.m.VBox",multiple:false,visibility:"hidden"}},associations:{headerControls:{type:"sap.ui.core.Control",multiple:true}},events:{selectionChanged:{parameters:{selectedIds:{type:"string[]"},unselectedIds:{type:"string[]"},userInteraction:{type:"boolean"}}},nodeClicked:{sceneNode:{type:"sap.ui.vtm.SceneNode"}},visibilityChanged:{parameters:{visibleIds:{type:"string[]"},hiddenIds:{type:"string[]"},userInteraction:{type:"boolean"}}},viewChanged:{parameters:{cameraInfo:{type:"object"}}},refreshRequested:{},hover:{parameters:{x:{type:"float"},y:{type:"float"},nodeId:{type:"string"}}},beginGesture:{},endGesture:{}}},_getVkViewport:function(){return this.vkViewport;},_getContainer:function(){return this.getAggregation("_container");},init:function(){this._programmaticSelectionChangeInProgress=false;this._programmaticVisibilityChangeInProgress=false;},_initialize:function(){var v=this.getPanel().getVtm();if(v){var s=v.getScene();this._setScene(s);var f=this._getVkViewport();var l=f._loco;if(f._viewportHandler){l.removeHandler(f._viewportHandler);}if(f._smart2DHandler){l.removeHandler(f._smart2DHandler);}var g=new c(this);l.addHandler(g);s.attachEvent("sceneCreated",function(){this._onSceneCreated();}.bind(this));}},renderer:function(r,C){r.write("<div");r.writeControlData(C);r.addStyle("height","inherit");r.addStyle("overflow","hidden");r.writeStyles();r.writeClasses();r.write(">");var f=C._getContainer();r.renderControl(f);r.write("</div>");},onBeforeRendering:function(){if(!this._initialized){this._initialized=true;this._initialize();}},getInitialized:function(){return this._initialized;},refresh:function(){sap.ui.vtm.measure(this,"fireRefreshRequested",function(){this.fireRefreshRequested();}.bind(this));return this;},_raiseHover:function(x,y,n){this.fireHover({x:x,y:y,nodeId:n});},_raiseBeginGesture:function(){this.fireBeginGesture();},_raiseEndGesture:function(){this.fireEndGesture();},setBackgroundGradientTopColor:function(C){this.setProperty("backgroundGradientTopColor",C);this._getVkViewport().setBackgroundColorTop(C);return this;},setBackgroundGradientBottomColor:function(C){this.setProperty("backgroundGradientBottomColor",C);this._getVkViewport().setBackgroundColorBottom(C);return this;},_getAncestor:function(f){var g=this.getParent();while(g&&g.getMetadata().getName()!==f){g=g.getParent();}return g;},getPanel:function(){if(!this._panel){this._panel=this._getAncestor("sap.ui.vtm.Panel");}return this._panel;},getScene:function(){return this._scene;},_onSceneCreated:function(f){var s=this.getScene();var v=s._vkScene;if(!this._vkScene&&v){var g=this._getVkViewport();this._vkScene=v;g.setScene(v);this._vkDefaultNodeHierarchy=v.getDefaultNodeHierarchy();if(this._vkDefaultNodeHierarchy&&this._vkGraphicsCore){this._vkViewStateManager=this._vkGraphicsCore.createViewStateManager(this._vkDefaultNodeHierarchy,true,true);if(this._vkViewStateManager){g.setViewStateManager(this._vkViewStateManager);this._vkViewStateManager.attachSelectionChanged(function(f){var h=f.getParameter("selected");var u=f.getParameter("unselected");sap.ui.vtm.measure(this,"fireSelectionChanged",function(){this.fireSelectionChanged({selectedIds:h,unselectedIds:u,userInteraction:!this._programmaticSelectionChangeInProgress});}.bind(this));}.bind(this));this._vkViewStateManager.attachVisibilityChanged(function(f){var h=f.getParameter("visible");var i=f.getParameter("hidden");sap.ui.vtm.measure(this,"fireVisibilityChanged",function(){this.fireVisibilityChanged({visibleIds:h,hiddenIds:i,userInteraction:!this._programmaticVisibilityChangeInProgress});}.bind(this));}.bind(this));var o=function(){sap.ui.vtm.measure(this,"fireViewChanged",function(){this.fireViewChanged({cameraInfo:this.getCameraInfo()});}.bind(this));}.bind(this);g.attachZoom(o);g.attachPan(o);g.attachRotate(o);g.attachNodeClicked(function(f){var n=f.getParameters().nodeId;sap.ui.vtm.measure(this,"fireNodeClicked",function(){var h=s._getSceneNode(n);try{this.fireNodeClicked({sceneNode:h});}finally{h.destroy();}}.bind(this));}.bind(this));g.attachFrameRenderingFinished(function(f){this.fireEvent("frameRenderingFinished",f);}.bind(this));}}}},getHeaderControls:function(){var i=this.getAssociation("headerControls");var f=[];if(i){i.forEach(function(g){var h=sap.ui.getCore().byId(g);if(h){f.push(h);}});}return f;},_setScene:function(s){if(!s||this._scene){return this;}var v=new sap.ui.vk.dvl.Viewport(this.getId()+"_sapUiVkViewport",{height:"100%"});this.vkViewport=v;this._scene=s;if(s){this._vkGraphicsCore=this._scene._vkGraphicsCore;if(this._vkGraphicsCore){v.setGraphicsCore(this._vkGraphicsCore);v.setBackgroundColorTop(this.getBackgroundGradientTopColor());v.setBackgroundColorBottom(this.getBackgroundGradientBottomColor());}}var h=this.getHeaderControls();h.forEach(function(g){if(g){g.setLayoutData(new sap.m.FlexItemData({growFactor:0,shrinkFactor:0}));}});v.setLayoutData(new sap.m.FlexItemData({growFactor:1,shrinkFactor:1,minHeight:"10px"}));var f=new sap.m.VBox({fitContainer:true,renderType:sap.ui.Device.browser.msie?sap.m.FlexRendertype.Div:sap.m.FlexRendertype.Bare,items:[h,v]});this.setAggregation("_container",f);return this;},zoomToSelected:function(f){sap.ui.vtm.measure(this,"zoomToSelected",function(){if(f===null||f===undefined){f=0.2;}this._getVkViewport().zoomTo(sap.ui.vk.ZoomTo.Selected,null,f,0);}.bind(this));return this;},zoomToVisible:function(f){sap.ui.vtm.measure(this,"zoomToVisible",function(){if(f===null||f===undefined){f=0.2;}this._getVkViewport().zoomTo(sap.ui.vk.ZoomTo.Visible,null,f,0);}.bind(this));return this;},zoomToFit:function(f){var g=false;if(this._vkViewStateManager){this._vkViewStateManager.enumerateSelection(function(){g=true;});}if(g){this.zoomToSelected(f);}else{this.zoomToVisible(f);}return this;},zoomToAll:function(f){sap.ui.vtm.measure(this,"zoomToAll",function(){if(f===null||f===undefined){f=0.2;}this._getVkViewport().zoomTo(sap.ui.vk.ZoomTo.All,null,f,0);}.bind(this));return this;},getVisibility:function(s){var v;sap.ui.vtm.measure(this,"getVisibility",function(){if(this._vkViewStateManager){v=this._vkViewStateManager.getVisibilityState(s);}}.bind(this));return v;},setVisibility:function(s,v,r){if(q.sap.debug()){var p={viewport:this.getId(),visibility:v,recursive:r,sceneNodeIds:s};q.sap.log.warning("setVisibility "+JSON.stringify(p));}sap.ui.vtm.measure(this,"setVisibility",function(){if(Array.isArray(s)&&!s.length){return this;}if(this._vkViewStateManager){try{this._programmaticVisibilityChangeInProgress=true;this._vkViewStateManager.setVisibilityState(s,v,r);}finally{this._programmaticVisibilityChangeInProgress=false;}}}.bind(this));return this;},getOpacity:function(s){var o;sap.ui.vtm.measure(this,"getOpacity",function(){if(this._vkViewStateManager){o=this._vkViewStateManager.getOpacity(s);this._scene.traverseNodes(s,function(f,i){if(Array.isArray(s)){if(o[i]==null){o[i]=f._vkNodeProxy.getOpacity();}}else if(o==null){o=f._vkNodeProxy.getOpacity();}});}}.bind(this));return o;},setOpacity:function(s,o,r){if(q.sap.debug()){var p={viewport:this.getId(),opacity:o,recursive:r,sceneNodeIds:s};q.sap.log.warning("setOpacity "+JSON.stringify(p));}sap.ui.vtm.measure(this,"setOpacity",function(){if(Array.isArray(s)&&!s.length){return this;}if(this._vkViewStateManager){this._vkViewStateManager.setOpacity(s,o,r);}}.bind(this));return this;},getHighlightColor:function(s){var h;sap.ui.vtm.measure(this,"getHighlightColor",function(){if(this._vkViewStateManager){h=this._vkViewStateManager.getTintColor(s);this._scene.traverseNodes(s,function(f,i){if(Array.isArray(s)){if(h[i]==null){h[i]=f._vkNodeProxy.getTintColor();}}else if(h==null){h=f._vkNodeProxy.getTintColor();}});}}.bind(this));return h;},setHighlightColor:function(s,f,r){if(q.sap.debug()){var p={viewport:this.getId(),color:f,recursive:r,sceneNodeIds:s};q.sap.log.warning("setHighlightColor "+JSON.stringify(p));}sap.ui.vtm.measure(this,"setHighlightColor",function(){if(Array.isArray(s)&&!s.length){return this;}if(this._vkViewStateManager){this._vkViewStateManager.setTintColor(s,f,r);}}.bind(this));return this;},getSelected:function(s){var f;sap.ui.vtm.measure(this,"getSelected",function(){if(this._vkViewStateManager){f=this._vkViewStateManager.getSelectionState(s);}}.bind(this));return f;},setSelected:function(s,f,r){if(q.sap.debug()){var p={viewport:this.getId(),selected:f,recursive:r,sceneNodeIds:s};q.sap.log.warning("setSelected "+JSON.stringify(p));}sap.ui.vtm.measure(this,"setSelected",function(){if(Array.isArray(s)&&!s.length){return this;}if(this._vkViewStateManager){try{this._programmaticSelectionChangeInProgress=true;this._vkViewStateManager.setSelectionState(s,f,r);}finally{this._programmaticSelectionChangeInProgress=false;}}}.bind(this));return this;},getSelectedIds:function(){var i=[];sap.ui.vtm.measure(this,"getSelectedIds",function(){if(this._vkViewStateManager){this._vkViewStateManager.enumerateSelection(function(f){i.push(f);});}}.bind(this));return i;},setPredefinedView:function(v){var z;switch(v){case sap.ui.vtm.PredefinedView.Top:z=sap.ui.vk.ZoomTo.ViewTop;break;case sap.ui.vtm.PredefinedView.Bottom:z=sap.ui.vk.ZoomTo.ViewBottom;break;case sap.ui.vtm.PredefinedView.Front:z=sap.ui.vk.ZoomTo.ViewFront;break;case sap.ui.vtm.PredefinedView.Back:z=sap.ui.vk.ZoomTo.ViewBack;break;case sap.ui.vtm.PredefinedView.Left:z=sap.ui.vk.ZoomTo.ViewLeft;break;case sap.ui.vtm.PredefinedView.Right:z=sap.ui.vk.ZoomTo.ViewRight;break;default:throw"Unexpected view value: '"+v+"'.";}this._getVkViewport().zoomTo(z,null,0.2,0);return this;},getCameraInfo:function(){var v=this._getVkViewport().getViewInfo({camera:{useTransitionCamera:true},animation:false});return v.camera;},setCameraInfo:function(f,g){var v={camera:f,flyToDuration:g||0};this._getVkViewport().setViewInfo(v);return this;},addOverrideDisplayGroup:function(o){var f=this.getOverrideDisplayGroups();f.push(o);this.setOverrideDisplayGroups(f);return this;},addContextDisplayGroup:function(f){var g=this.getContextDisplayGroups();g.push(f);this.setContextDisplayGroups(g);return this;}});return V;});
