﻿/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.define(["./library",'sap/ui/mdc/XMLComposite',"sap/ui/mdc/internal/common/Helper"],function(L,X,c){"use strict";var F=X.extend("sap.ui.mdc.Field",{metadata:{designTime:false,specialSettings:{metadataContexts:{defaultValue:"{ model: 'entitySet', path:'',  name: 'entitySet'}, { model: 'dataField', path:'',  name: 'dataField'}"}},properties:{},events:{callAction:{}},aggregations:{},publicMethods:[]},fragment:"sap.ui.mdc.internal.field.Field"});F.prototype.onDraftLinkPressed=function(e){};F.prototype.handleCallAction=function(e){};F._helper={formatDraftOwner:function(d,D,v,a,b,h){var s="";if(d&&h){var u=v||D||b||a;if(u){s=L.getText("draft.OWNER",[u]);}else{s=L.getText("draft.ANOTHER_USER");}}return s;},buildExpressionForCriticalityIcon:function(C){if(C){var e="{= (${"+C+"} === 'com.sap.vocabularies.UI.v1.CriticalityType/Negative') || (${"+C+"} === '1') || (${"+C+"} === 1) ? 'sap-icon://status-negative' : "+"(${"+C+"} === 'com.sap.vocabularies.UI.v1.CriticalityType/Critical') || (${"+C+"} === '2') || (${"+C+"} === 2) ? 'sap-icon://status-critical' : "+"(${"+C+"} === 'com.sap.vocabularies.UI.v1.CriticalityType/Positive') || (${"+C+"} === '3') || (${"+C+"} === 3) ? 'sap-icon://status-positive' : "+"'sap-icon://status-inactive' }";return e;}},buildExpressionForCriticalityColor:function(C){if(C){var e="{= (${"+C+"} === 'com.sap.vocabularies.UI.v1.CriticalityType/Negative') || (${"+C+"} === '1') || (${"+C+"} === 1) ? 'Error' : "+"(${"+C+"} === 'com.sap.vocabularies.UI.v1.CriticalityType/Critical') || (${"+C+"} === '2') || (${"+C+"} === 2) ? 'Warning' : "+"(${"+C+"} === 'com.sap.vocabularies.UI.v1.CriticalityType/Positive') || (${"+C+"} === '3') || (${"+C+"} === 3) ? 'Success' : "+"'None' }";return e;}},getFieldContext:function(C,f){return'responsiveTable';},getStableIdPartFromDataField:function(d,p){var P="",I="";if(d.$Type&&d.$Type==="com.sap.vocabularies.UI.v1.DataFieldForAction"){return c.replaceSpecialCharsInId(d.Action);}else if(d.$Type&&(d.$Type==="com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation"||d.$Type==="com.sap.vocabularies.UI.v1.DataFieldWithIntentBasedNavigation")){if(typeof d.SemanticObject=="string"){I=c.replaceSpecialCharsInId(d.SemanticObject);}else if(d.SemanticObject.$Path){I=c.replaceSpecialCharsInId(d.SemanticObject.$Path);}if(typeof d.Action=="string"){I=I+"::"+c.replaceSpecialCharsInId(d.Action);}else if(d.Action&&d.Action.$Path){I=I+"::"+c.replaceSpecialCharsInId(d.Action.$Path);}return I;}else if(d.$Type&&d.$Type==="com.sap.vocabularies.UI.v1.DataFieldForAnnotation"){return c.replaceSpecialCharsInId(d.Target.$AnnotationPath);}else if(d.Value&&d.Value.$Path){return c.replaceSpecialCharsInId(d.Value.$Path);}else if(d.Value&&d.Value.$Apply&&d.Value.$Function==="odata.concat"){for(var i=0;i<d.Value.$Apply.length;i++){if(d.Value.$Apply[i].$Path){if(P){P=P+"::";}P=P+c.replaceSpecialCharsInId(d.Value.$Apply[i].$Path);}}return P;}else if(p&&p.context&&p.context.getObject("@sapui.name")){return c.replaceSpecialCharsInId(p.context.getObject("@sapui.name"));}else{jQuery.sap.log.error("Annotation Helper: Unable to create a stable ID. Please check the annotations.");}}};F._helper.getFieldContext.requiresIContext=true;return F;},true);
