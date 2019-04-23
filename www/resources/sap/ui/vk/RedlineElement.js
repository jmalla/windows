/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Element"],function(q,E){"use strict";var R=E.extend("sap.ui.vk.RedlineElement",{metadata:{library:"sap.ui.vk",properties:{originX:{type:"float",defaultValue:0},originY:{type:"float",defaultValue:0},opacity:{type:"float",defaultValue:1},strokeWidth:{type:"float",defaultValue:2},strokeColor:{type:"sap.ui.core.CSSColor",defaultValue:"#e6600d"},strokeDashArray:{type:"float[]",defaultValue:[]}}}});R.prototype.init=function(){};R.prototype.applyZoom=function(){};R.prototype.render=function(r){};R.prototype.exportJSON=function(){var j={originX:this.getOriginX(),originY:this.getOriginY(),opacity:this.getOpacity(),strokeColor:this.getStrokeColor(),strokeWidth:this.getStrokeWidth()};if(this.getStrokeDashArray().length>0){j["strokeDashArray"]=this.getStrokeDashArray();}return j;};R.prototype.importJSON=function(j){if(j.hasOwnProperty("originX")){this.setOriginX(j.originX);}if(j.hasOwnProperty("originY")){this.setOriginY(j.originY);}if(j.hasOwnProperty("opacity")){this.setOpacity(j.opacity);}if(j.hasOwnProperty("strokeColor")){this.setStrokeColor(j.strokeColor);}if(j.hasOwnProperty("strokeWidth")){this.setStrokeWidth(j.strokeWidth);}if(j.hasOwnProperty("strokeDashArray")){this.setStrokeDashArray(j.strokeDashArray);}return this;};R.prototype.exportSVG=function(){return null;};R.prototype.importSVG=function(s){if(s.getAttribute("x")){this.setOriginX(parseFloat(s.getAttribute("x")));}if(s.getAttribute("y")){this.setOriginY(parseFloat(s.getAttribute("y")));}if(s.getAttribute("opacity")){this.setOpacity(parseFloat(s.getAttribute("opacity")));}if(s.getAttribute("stroke")){this.setStrokeColor(s.getAttribute("stroke"));}if(s.getAttribute("stroke-width")){this.setStrokeWidth(parseFloat(s.getAttribute("stroke-width")));}if(s.getAttribute("stroke-dasharray")){this.setStrokeDashArray(s.getAttribute("stroke-dasharray").split(",").map(parseFloat));}return this;};return R;});