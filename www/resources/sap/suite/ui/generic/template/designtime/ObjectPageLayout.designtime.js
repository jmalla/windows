sap.ui.define(["sap/suite/ui/generic/template/designtime/library.designtime"],function(){"use strict";var r=sap.ui.getCore().getModel("i18nDesigntime").getResourceBundle();var p={getDesigntime:function(e){return{name:{singular:function(){return r.getText("FE_OBJECT_PAGE_LAYOUT");}},actions:"not-adaptable",aggregations:{headerContent:{ignore:true},sections:{actions:{move:"moveSection",createContainer:{changeType:"addSection",changeOnRelevantContainer:true,getCreatedContainerId:function(n){return n;}}}},footer:{propagateRelevantContainer:true,propagateMetadata:function(e){if(e.getMetadata().getElementName()==="sap.m.OverflowToolbar"){return{name:{singular:function(){return r.getText("FE_FOOTER_TOOLBAR");}},aggregations:{content:{propagateRelevantContainer:true,propagateMetadata:function(e){switch(e.getMetadata().getElementName()){case"sap.m.ToolbarSpacer":return{actions:null};}}}}};}}}}};}};return p;});