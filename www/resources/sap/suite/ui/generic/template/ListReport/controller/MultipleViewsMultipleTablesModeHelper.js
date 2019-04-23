sap.ui.define(["jquery.sap.global","sap/ui/base/Object"],function(q,B){"use strict";function g(Q,s,c,t,S,I){var d;function o(E){var i,j;i=E.getSource();j=E.getParameter("itemContexts")&&E.getParameter("itemContexts")[0];t.oCommonEventHandlers.onListNavigate(i,s,j);}function a(E){var C,i;C=E.getSource();i=C.getParent();s.updateControlOnSelectionChange(i);}function r(E){var C,i;i=E.getSource();C=i.getChart();C.attachSelectData(a);C.attachDeselectData(a);}function b(i){var K,T,v={};for(K in I){T=I[K].implementingControl;v[T.getId()]=T.getCurrentVariantId()||"";}return{selectedTab:i,tableVariantIds:v};}function e(G){var j,T,v;if(G){if(G.tableVariantIds){for(j in I){T=I[j].implementingControl;v=G.tableVariantIds[T.getId()];if(v){T.setCurrentVariantId(v);}}}return G.selectedTab;}}function f(){return d;}function h(i){var E=t.oCommonUtils.getMetaModelEntityType(i);return E.property;}function k(E,i){var C,j,K;if(!E){return;}C=E.getSource();j=C.getId();for(K in I){var m=I[K];if(j===m.id){i(K,C);if(d){m.entitySet=C.getEntitySet();m.properties=h(C);}}}}function l(n){s.oSmartTable=I[n].implementingControl;}(function(){var i,j,T,m,K,n,p;j=c.byId("template::IconTabBar");if(!j){return;}for(var i in Q.variants){if(!!Q.variants[i].entitySet){d=true;break;}else{d=false;break;}}T=j.getItems();for(i=0;i<T.length;i++){m=T[i];K=m.getKey();if(i===0){S(K);}n=c.byId("listReport-"+K);if(!s.oSmartTable){s.oSmartTable=n;}p={id:n.getId()};I[K]=p;}s.oSmartFilterbar.attachSearch(function(E){s.oMultipleViewsHandler.refreshOperation(3);});})();return{fnRegisterToChartEvents:r,onDetailsActionPress:o,getContentForIappState:b,getSelectedKeyAndRestoreFromIappState:e,onSelectedKeyChanged:l,init:k,getIsDifferentEntitySets:f};}return B.extend("sap.suite.ui.generic.template.ListReport.controller.MultipleViewsMultipleTablesModeHelper",{constructor:function(Q,s,c,t,S,i){q.extend(this,g(Q,s,c,t,S,i));}});});