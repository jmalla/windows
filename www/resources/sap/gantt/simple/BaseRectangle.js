/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["./TitlePropagator","./BaseShape","./RenderUtils","./GanttUtils","../misc/Format"],function(T,B,R,G,F){"use strict";var a=B.extend("sap.gantt.simple.BaseRectangle",{metadata:{properties:{x:{type:"sap.gantt.SVGLength"},y:{type:"sap.gantt.SVGLength"},width:{type:"sap.gantt.SVGLength"},height:{type:"sap.gantt.SVGLength",defaultValue:"auto"},rx:{type:"sap.gantt.SVGLength",group:"Appearance",defaultValue:0},ry:{type:"sap.gantt.SVGLength",group:"Appearance",defaultValue:0}}}});var A=["x","y","width","height","style","rx","ry","filter","opacity","transform"];T.call(a.prototype,true);a.prototype.init=function(){B.prototype.init.apply(this,arguments);this.bHasInvalidPropValue=false;};a.prototype.getX=function(){return G.getValueX(this);};a.prototype.getY=function(){var y=this.getProperty("y");if(y===null||y===undefined){y=this.getRowYCenter()-(this.getHeight()/2);}return y;};a.prototype.getWidth=function(){var w=this.getProperty("width");if(w!==null&&w!==undefined){return w;}var o=this.getAxisTime();if(o==null){return 0;}var n,s=o.timeToView(F.abapTimestampToDate(this.getTime())),e=o.timeToView(F.abapTimestampToDate(this.getEndTime()));if(!jQuery.isNumeric(s)||!jQuery.isNumeric(e)){return 0;}n=Math.abs(e-s);n=n<=0?1:n;return n;};a.prototype.getHeight=function(){var h=this.getProperty("height");if(h==="auto"){return parseFloat(this._iBaseRowHeight*0.625,10);}if(h==="inherit"){return this._iBaseRowHeight;}return h;};a.prototype.getStyle=function(){var i=B.prototype.getStyle.apply(this,arguments);var s={"fill":this.determineValueColor(this.getFill()),"stroke-dasharray":this.getStrokeDasharray(),"fill-opacity":this.getFillOpacity(),"stroke-opacity":this.getStrokeOpacity()};return i+this.getInlineStyle(s);};a.prototype.renderElement=function(r,e){if(this.bHasInvalidPropValue){return;}r.write("<rect");this.writeElementData(r);r.writeClasses(this);R.renderAttributes(r,e,A);r.write(">");R.renderTooltip(r,e);r.write("</rect>");if(this.getShowTitle()){R.renderElementTitle(r,e);}B.prototype.renderElement.apply(this,arguments);};a.prototype.getShapeAnchors=function(){return{head:{x:this.getX(),y:this.getRowYCenter(),dx:0,dy:this.getHeight()/2},tail:{x:this.getX()+this.getWidth(),y:this.getRowYCenter(),dx:0,dy:this.getHeight()/2}};};return a;},true);