sap.ui.define(['sap/chart/ChartLog','sap/chart/data/TimeDimension',"sap/ui/thirdparty/jquery"],function(C,T,q){"use strict";var t=q.type;var U={};U.find=function(M,l){for(var i=0;i<l.length;i++){if(M===l[i].getName()){return l[i];}}return null;};U.isNumber=function(){for(var i=0;i<arguments.length;i++){if(t(arguments[i])!=='number'){return false;}}return true;};U.thresholdValue=function(v){v=v.filter(function(e){return v!=null;});var s=v.map(function(e){return t(e)==="string";});return function(o,A){for(var i=0;i<v.length;i++){var r;if(s[i]){if(o[v[i]]!=null){r=o[v[i]];}else{r=A[v[i]];}}else{r=v[i];}if(r!=null){return r;}}};};U.isInRange=function(v,l,e,i,j){if(!U.isNumber(v,l,e)){return false;}var k=i?(l<=v):(l<v);var n=j?(v<=e):(v<e);return k&&n;};U.assignColor=function(e,l){switch(l){case 1:return[e[3]];case 2:return[e[1],e[3]];case 3:return[e[1],e[3],e[5]];case 4:return e.slice(1,5);case 5:return e.slice(1,6);case 6:return e.slice(0,6);default:return null;}};U.assignUnmentionedColor=function(e,l){switch(l){case 1:return[e[1]];case 2:return[e[1],e[5]];case 3:return[e[1],e[2],e[4]];case 4:return[e[1],e[2],e[4],e[5]];case 5:return e.filter(function(i){return i!==3;});default:return null;}};U.dimOrMsrUse=function(o,p,s,e){var t=Object.keys(o).filter(function(i){return s.indexOf(i)>-1;});if(p.dimension&&p.measure){throw new C('error','activeColoring','Either "dimension" or "measure" can be set in activeColoring.parameters, but not both of them.');}else if(p.measure){if(e==='Gradation'){if(q.type(p.measure)==="Array"&&p.measure.length>1){t='DelineatedMeasures';}else{t='RankedMeasureValues';}}else{t='MeasureValues';}}else if(p.dimension){t=e==='Gradation'?'DelineatedDimensionValues':'DimensionValues';}else if(t.length>1){throw new C('error','colorings.'+e,'"'+t.join('" and "')+'" all exist in '+e+', please resolve by activeColoring property.');}else if(t.length===1){t=t[0];}return t;};var _=function(s,e,i,p,j){s.forEach(function(v){if(e.indexOf(v)<0){throw new C('error',i,p+v+j);}});};var c=function(e,M){var v=M.map(function(o){return o.getName();});_(e,v,'activeColoring.parameters.measure','Active measure, ',', should be visible.');};var a=function(e,D){var v=D.map(function(o){return o.getName();});_(e,v,'activeColoring.parameters.dimension','Active dimension, ',', should be visible.');};var m=function(e,i){var j=Object.keys(i);_(e,j,'activeColoring.parameters.measure','Active measure, ',', should be configured in coloring.');};var d=function(e,i){var j=Object.keys(i);_(e,j,'activeColoring.parameters.dimension','Active dimension, ',', should be configured in coloring.');};var b=function(e){if(e.length>1){throw new C('error','activeColoring.parameters.dimension','Multiple dimensions are defined. Please resolve by activeColoring property.');}};var f=function(e,v,t,s){var D=U.find(e,v);if(D instanceof T&&D.getRole()==='category'){throw new C('error','Colorings.'+t+'.'+s,'Do not support coloring on timeDimension, '+D.getName()+'.');}};var g=function(o){if(o.bMBC){throw new C('error','Colorings','Heatmap only support Criticality.MeasureValues.ConstantThresholds or Gradation.RankedMeasureValues.');}};var h=function(D,o){if(!o.bWaterfall&&((o.bShowUnmentionedMsr&&D.aMsr.length>1)||o.bHasOtherSeriesDim||o.bIsPie&&D.aDim.length>1)){throw new C('error','Colorings.'+o.type+'.'+o.subType,'Semantic coloring could not be applied if chart already has coloring.');}};U.checkColoringDimension=function(A,D,e,o){var v=D.aDim;a(A,v);d(A,e);b(A);f(A[0],v,o.type,o.subType);g(o);h(D,o);};U.checkColoringMeasure=function(A,v,e){c(A,v);m(A,e);};U.hasSeriesDim=function(D){return D.aDim.some(function(o){return o._getFixedRole()==="series";});};U.hasOtherSeriesDim=function(e,D){return D.aDim.some(function(o){return o._getFixedRole()==="series"&&o.getName()!==e;});};U.hasDuplicatedValues=function(v){var r=false,e={};v.forEach(function(V){if(e[V]){r=true;}else{e[V]=true;}});return r;};U.notIn=_;return U;});