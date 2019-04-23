/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/ui/Device","sap/ui/core/InvisibleText"],function(l,D,I){"use strict";var F=l.FacetFilterType;var a={};a.render=function(r,c){switch(c.getType()){case F.Simple:a.renderSimpleFlow(r,c);break;case F.Light:a.renderSummaryBar(r,c);break;}};a.renderSimpleFlow=function(r,c){r.write("<div");r.writeControlData(c);r.addClass("sapMFF");r.writeAccessibilityState(c,{"role":"toolbar"});if(c.getShowSummaryBar()){r.write(">");a.renderSummaryBar(r,c);}else{if(c._lastScrolling){r.addClass("sapMFFScrolling");}else{r.addClass("sapMFFNoScrolling");}if(c.getShowReset()){r.addClass("sapMFFResetSpacer");}r.writeClasses();r.write(">");if(D.system.desktop){r.renderControl(c._getScrollingArrow("left"));}r.write("<div");r.writeAttribute("id",c.getId()+"-head");r.addClass("sapMFFHead");r.writeClasses();r.write(">");a.renderFacetFilterListButtons(c,r);if(c.getShowPersonalization()){r.renderControl(c.getAggregation("addFacetButton"));}r.write("</div>");if(D.system.desktop){r.renderControl(c._getScrollingArrow("right"));}if(c.getShowReset()){r.write("<div");r.addClass("sapMFFResetDiv");r.writeClasses();r.write(">");r.renderControl(c.getAggregation("resetButton"));r.write("</div>");}}r.write("</div>");};a.renderSummaryBar=function(r,c){r.write("<div");r.writeControlData(c);r.addClass("sapMFF");r.writeClasses();r.write(">");r.renderControl(c.getAggregation("summaryBar"));r.write("</div>");};a.getAriaAnnouncement=function(k,b){return I.getStaticId("sap.m",b||"FACETFILTER_"+k.toUpperCase());};a.getAriaDescribedBy=function(c){var d=[];if(c.getShowPersonalization()){d.push(this.getAriaAnnouncement("ARIA_REMOVE"));}d=d.concat(c._aAriaPositionTextIds);return d.join(" ");};a.getAccessibilityState=function(c){return{describedby:{value:this.getAriaDescribedBy(c),append:true}};};a.renderFacetFilterListButtons=function(c,r){var L=c._getSequencedLists(),b=L.length,B,i,p,A,o=[],n=[],f=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("FACETFILTER_ARIA_FACET_FILTER"),R=this.getAriaAnnouncement("ARIA_REMOVE");for(i=0;i<b;i++){B=c._getButtonForList(L[i]);o=B.removeAllAriaDescribedBy();o.forEach(d);p=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("FACETFILTERLIST_ARIA_POSITION",[(i+1),b]);A=new I({text:f+" "+p}).toStatic();c._aOwnedLabels.push(A.getId());B.addAriaDescribedBy(A);n.push(A.getId());if(c.getShowPersonalization()){B.addAriaDescribedBy(a.getAriaAnnouncement("ARIA_REMOVE"));}r.renderControl(B);if(c.getShowPersonalization()){r.renderControl(c._getFacetRemoveIcon(L[i]));}}c._aAriaPositionTextIds=n;function d(s){if(R!==s){var e=sap.ui.getCore().byId(s);if(e){e.destroy();}}}};return a;},true);
