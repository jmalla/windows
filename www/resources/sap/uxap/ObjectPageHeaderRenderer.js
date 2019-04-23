/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ObjectImageHelper","sap/ui/Device"],function(O,D){"use strict";var a={};a.render=function(r,c){var n=c.getNavigationBar(),t=(c.getIsObjectIconAlwaysVisible()||c.getIsObjectTitleAlwaysVisible()||c.getIsObjectSubtitleAlwaysVisible()||c.getIsActionAreaAlwaysVisible()),p=c.getParent(),e=c.getAggregation("_expandButton"),o=c._lazyLoadInternalAggregation("_objectImage",true),P,I=D.system.desktop,b=p&&p.isA("sap.uxap.ObjectPageLayout")&&((p.getHeaderContent()&&p.getHeaderContent().length>0&&p.getShowHeaderContent())||(p.getShowHeaderContent()&&p.getShowTitleInHeaderContent()));r.write("<div");r.writeControlData(c);r.addClass('sapUxAPObjectPageHeader');r.addClass('sapUxAPObjectPageHeaderDesign-'+c.getHeaderDesign());r.writeClasses();r.write(">");if(n){r.write("<div");r.addClass('sapUxAPObjectPageHeaderNavigation');r.writeClasses();r.write(">");r.renderControl(n);r.write("</div>");}r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-identifierLine");r.addClass('sapUxAPObjectPageHeaderIdentifier');if(t){r.addClass('sapUxAPObjectPageHeaderIdentifierForce');}r.writeClasses();r.write(">");if(p&&p.isA("sap.uxap.ObjectPageLayout")&&p.getIsChildPage()){r.write("<div");r.addClass('sapUxAPObjectChildPage');r.writeClasses();r.write("></div>");}if(c.getShowPlaceholder()){P=c._lazyLoadInternalAggregation("_placeholder",true);}O._renderImageAndPlaceholder(r,{oHeader:c,oObjectImage:o,oPlaceholder:P,bIsObjectIconAlwaysVisible:c.getIsObjectIconAlwaysVisible(),bAddSubContainer:true,sBaseClass:'sapUxAPObjectPageHeaderObjectImageContainer'});r.write("<span ");r.writeAttributeEscaped("id",c.getId()+"-identifierLineContainer");r.addClass('sapUxAPObjectPageHeaderIdentifierContainer');r.writeClasses();r.write(">");this._renderObjectPageTitle(r,c);r.write("</span>");r.write("<span");r.writeAttributeEscaped("id",c.getId()+"-actions");r.addClass('sapUxAPObjectPageHeaderIdentifierActions');if(c.getIsActionAreaAlwaysVisible()){r.addClass('sapUxAPObjectPageHeaderIdentifierActionsForce');}r.writeClasses();r.write(">");if(I&&b){e.addStyleClass("sapUxAPObjectPageHeaderExpandButton");r.renderControl(e);}var A=c.getActions();for(var i=0;i<A.length;i++){var d=A[i];r.renderControl(d);}var f=c.getAggregation("_overflowButton");r.renderControl(f);this._renderSideContentBtn(r,c);r.write("</span>");r.write("</div>");r.write("</div>");};a._renderObjectPageTitle=function(r,c,t){var o=c.getObjectTitle(),m=(c.getShowMarkers()&&(c.getMarkFavorite()||c.getMarkFlagged())),b=c._getBreadcrumbsAggregation(),T=c.getTooltip_Text();if(!t&&b){r.renderControl(b);}r.write("<h1");r.addClass('sapUxAPObjectPageHeaderIdentifierTitle');if(c.getIsObjectTitleAlwaysVisible()){r.addClass('sapUxAPObjectPageHeaderIdentifierTitleForce');}if(t){r.addClass('sapUxAPObjectPageHeaderIdentifierTitleInContent');}if(c.getShowTitleSelector()){r.addClass('sapUxAPObjectPageHeaderTitleFollowArrow');}r.writeClasses();r.writeAttributeEscaped("id",c.getId()+"-title");r.write(">");r.write("<span");r.addClass("sapUxAPObjectPageHeaderTitleTextWrappable");r.writeClasses();r.writeAttributeEscaped("id",c.getId()+"-innerTitle");if(T){r.writeAttributeEscaped("title",T);}r.write(">");if(m||c.getShowTitleSelector()||c.getMarkLocked()||c.getMarkChanges()){var s=o.substr(o.lastIndexOf(" ")+1);var d=o.substr(0,o.lastIndexOf(" ")+1);if(s.length===1){s=o;d='';}r.writeEscaped(d);r.write("</span>");r.write("<span");r.addClass('sapUxAPObjectPageHeaderNowrapMarkers');if(c.getMarkLocked()||c.getMarkChanges()){r.addClass('sapUxAPObjectPageHeaderMarks');}r.writeClasses();r.write(">");r.writeEscaped(s);this._renderMarkers(r,c);if(c.getMarkLocked()){this._renderLock(r,c,t);}else if(c.getMarkChanges()){this._renderMarkChanges(r,c,t);}this._renderSelectTitleArrow(r,c,t);r.write("</span>");}else{r.writeEscaped(o);r.write("</span>");}r.write("</h1>");r.write("<span");r.addClass('sapUxAPObjectPageHeaderIdentifierDescription');if(c.getIsObjectSubtitleAlwaysVisible()&&c.getObjectSubtitle()){r.addClass('sapUxAPObjectPageHeaderIdentifierDescriptionForce');}if(t){r.addClass('sapUxAPObjectPageHeaderIdentifierSubTitleInContent');}r.writeClasses();r.writeAttributeEscaped("id",c.getId()+"-subtitle");r.write(">");r.writeEscaped(c.getObjectSubtitle());r.write("</span>");};a._renderSelectTitleArrow=function(r,c,t){if(c.getShowTitleSelector()){r.write("<span");r.addClass("sapUxAPObjectPageHeaderTitleArrow");r.writeClasses();r.write(">");if(t){r.renderControl(c._oTitleArrowIconCont);}else{r.renderControl(c._oTitleArrowIcon);}r.write("</span>");}};a._renderSideContentBtn=function(r,c){var s=c.getSideContentButton();if(s){r.write("<span");r.addClass("sapUxAPObjectPageHeaderSideContentBtn");r.writeClasses();r.write(">");r.write("<span");r.addClass("sapUxAPObjectPageHeaderSeparator");r.writeClasses();r.write("></span>");r.renderControl(s);r.write("</span>");}};a._renderMarkChanges=function(r,c,t){r.write("<span");r.addClass("sapUxAPObjectPageHeaderChangesBtn");r.addClass("sapUiSizeCompact");r.writeClasses();r.write(">");if(t){r.renderControl(c._oChangesIconCont);}else{r.renderControl(c._oChangesIcon);}r.write("</span>");};a._renderLock=function(r,c,t){r.write("<span");r.addClass("sapUxAPObjectPageHeaderLockBtn");r.addClass("sapUiSizeCompact");r.writeClasses();r.write(">");if(t){r.renderControl(c._oLockIconCont);}else{r.renderControl(c._oLockIcon);}r.write("</span>");};a._renderMarkers=function(r,c){var I=[];if(c.getShowMarkers()){I.push(c._oFavIcon);I.push(c._oFlagIcon);this._renderMarkersAria(r,c);r.write("<span");r.addClass("sapMObjStatusMarker");r.writeClasses();r.writeAttributeEscaped("id",c.getId()+"-markers");r.writeAttributeEscaped("aria-describedby",c.getId()+"-markers-aria");r.write(">");for(var i=0;i<I.length;i++){r.renderControl(I[i]);}r.write("</span>");}};a._renderMarkersAria=function(r,c){var A="";if(c.getMarkFlagged()){A+=(c.oLibraryResourceBundle.getText("ARIA_FLAG_MARK_VALUE")+" ");}if(c.getMarkFavorite()){A+=(c.oLibraryResourceBundle.getText("ARIA_FAVORITE_MARK_VALUE")+" ");}if(A!==""){r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-markers-aria");r.writeAttribute("aria-hidden","false");r.addClass("sapUiHidden");r.writeClasses();r.write(">");r.writeEscaped(A);r.write("</div>");}};return a;},true);
