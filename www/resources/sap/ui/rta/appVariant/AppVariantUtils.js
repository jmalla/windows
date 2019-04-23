/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/descriptorRelated/api/DescriptorVariantFactory","sap/ui/fl/descriptorRelated/api/DescriptorInlineChangeFactory","sap/ui/fl/Utils","sap/m/MessageBox","sap/ui/rta/Utils","sap/ui/fl/descriptorRelated/internal/Utils","sap/base/util/uid","sap/base/Log","sap/ui/thirdparty/hasher"],function(D,a,F,M,R,b,u,L,h){"use strict";var A={};var H=56;A._newAppVariantId=null;A.getManifirstSupport=function(r){var s='/sap/bc/ui2/app_index/ui5_app_mani_first_supported/?id='+r;return b.sendRequest(s,'GET');};A.isStandAloneApp=function(){if(sap.ushell_abap){return false;}else{return true;}};A.getNewAppVariantId=function(){return A._newAppVariantId;};A.setNewAppVariantId=function(n){A._newAppVariantId=n;};A.trimIdIfRequired=function(i){return i.substr(0,H);};A.getId=function(B){var c;var i=B.split('.');if(i[0]!=="customer"){i[0]="customer."+i[0];}var r=false;var d=/^id.*/i;i.forEach(function(s,e,f){if(s.match(d)){s=s.replace(d,u().replace(/-/g,"_"));f[e]=s;r=true;}});c=i.join(".");if(!r){c=c+"."+u().replace(/-/g,"_");}c=this.trimIdIfRequired(c);this.setNewAppVariantId(c);return c;};A.createDescriptorVariant=function(p){p.layer=F.getCurrentLayer(false);return D.createNew(p);};A.getInlineChangeInput=function(v,c){return{"type":"XTIT","maxLength":50,"comment":c,"value":{"":v}};};A.getInlinePropertyChange=function(p,P){var c="New "+p+" entered by a key user via RTA tool";return this.getInlineChangeInput(P,c);};A.getInlineChangeInputIcon=function(i){return{icon:i};};A.getInlineChangeRemoveInbounds=function(i){return{"inboundId":i};};A.getURLParsedHash=function(){var U=sap.ushell.Container.getService("URLParsing");if(U.parseShellHash&&U.getHash){return U.parseShellHash(h.getHash());}};A.getInboundInfo=function(i){var I={};if(!i){I.currentRunningInbound="customer.savedAsAppVariant";I.addNewInboundRequired=true;return I;}var p=this.getURLParsedHash();var c=Object.keys(i);var d=[];c.forEach(function(s){if((i[s].action===p.action)&&(i[s].semanticObject===p.semanticObject)){d.push(s);}});switch(d.length){case 0:I.currentRunningInbound="customer.savedAsAppVariant";I.addNewInboundRequired=true;break;case 1:I.currentRunningInbound=d[0];I.addNewInboundRequired=false;break;default:I=undefined;break;}return I;};A.getInboundPropertiesKey=function(s,c,p){return s+"_sap.app.crossNavigation.inbounds."+c+"."+p;};A.getInlineChangesForInboundProperties=function(c,s,p,P){var C={"inboundId":c,"entityPropertyChange":{"propertyPath":p,"operation":"UPSERT","propertyValue":{}},"texts":{}};if(p==="title"||p==="subTitle"){var k=this.getInboundPropertiesKey(s,c,p);C.entityPropertyChange.propertyValue="{{"+k+"}}";C.texts[k]=this.getInlinePropertyChange(p,P);}else if(p==="icon"){C.entityPropertyChange.propertyValue=P;}return C;};A.getInlineChangeForInboundPropertySaveAs=function(c){return{"inboundId":c,"entityPropertyChange":{"propertyPath":"signature/parameters/sap-appvar-id","operation":"UPSERT","propertyValue":{"required":true,"filter":{"value":this.getNewAppVariantId(),"format":"plain"},"launcherValue":{"value":this.getNewAppVariantId()}}}};};A.getInlineChangeCreateInbound=function(c){var p=this.getURLParsedHash();var P={"inbound":{}};P.inbound[c]={"semanticObject":p.semanticObject,"action":p.action};return P;};A.createInlineChange=function(p,c){var t;if(c==="title"){return a.create_app_setTitle(p);}else if(c==="description"){return a.create_app_setDescription(p);}else if(c==="subtitle"){return a.create_app_setSubTitle(p);}else if(c==="icon"){return a.create_ui_setIcon(p);}else if(c==="inbound"){return a.create_app_changeInbound(p);}else if(c==="createInbound"){return a.create_app_addNewInbound(p);}else if(c==="inboundTitle"){t=p.texts;delete p.texts;return a.create_app_changeInbound(p,t);}else if(c==="inboundSubtitle"){t=p.texts;delete p.texts;return a.create_app_changeInbound(p,t);}else if(c==="inboundIcon"){delete p.texts;return a.create_app_changeInbound(p);}else if(c==="removeInbound"){return a.create_app_removeAllInboundsExceptOne(p);}};A.getTransportInput=function(p,n,N,t){return{getPackage:function(){return p;},getNamespace:function(){return n;},getId:function(){return N;},getDefinition:function(){return{fileType:t};}};};A.triggerCatalogAssignment=function(s,o){var r='/sap/bc/lrep/appdescr_variants/'+s+'?action=assignCatalogs&assignFromAppId='+o;return b.sendRequest(r,'POST');};A.isS4HanaCloud=function(s){return s.isAtoEnabled()&&s.isAtoAvailable();};A.copyId=function(i){var t=document.createElement("textarea");t.value=i;document.body.appendChild(t);t.select();document.execCommand('copy');document.body.removeChild(t);return true;};A.getTextResources=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta");};A.getText=function(m,t){var T=this.getTextResources();return t?T.getText(m,t):T.getText(m);};A._getErrorMessageText=function(e){var E;if(e.messages&&e.messages.length){E=e.messages.map(function(e){return e.text;}).join("\n");}else if(e.iamAppId){E="IAM App Id: "+e.iamAppId;}else{E=e.stack||e.message||e.status||e;}return E;};A.buildErrorInfo=function(m,e,s){var E=this._getErrorMessageText(e);var c=A.getText(m)+"\n\n";if(s){c+=A.getText("MSG_APP_VARIANT_ID",s)+"\n";}c+=A.getText("MSG_TECHNICAL_ERROR",E);L.error("App variant error: ",E);return{text:c,appVariantId:s};};A.showRelevantDialog=function(i,s){var t,r;if(s){t=this.getText("SAVE_APP_VARIANT_SUCCESS_MESSAGE_TITLE");r=this.getText("SAVE_APP_VARIANT_OK_TEXT");}else{t=this.getText("HEADER_SAVE_APP_VARIANT_FAILED");r=this.getText("SAVE_APP_VARIANT_CLOSE_TEXT");}var c;var d=[];if(i.copyId){c=this.getText("SAVE_APP_VARIANT_COPY_ID_TEXT");d.push(c);}d.push(r);return new Promise(function(e,f){var C=function(g){if(s&&g===r){e();}else if(s&&g===c){A.copyId(i.appVariantId);e();}else if(i.overviewDialog&&g===r){e(false);}else if(g===r){f();}else if(g===c){A.copyId(i.appVariantId);f();}};M.show(i.text,{icon:s?M.Icon.INFORMATION:M.Icon.ERROR,onClose:C,title:t,actions:d,styleClass:R.getRtaStyleClassName()});});};A.publishEventBus=function(){sap.ui.getCore().getEventBus().publish("sap.ui.rta.appVariant.manageApps.controller.ManageApps","navigate");};A.triggerDeleteAppVariantFromLREP=function(s){return D.createDeletion(s).then(function(o){return o.submit();});};return A;},true);
