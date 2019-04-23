/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define([],function(){"use strict";var G={};var F=1e-10;G.getPointsDistance=function(p,P){return Math.sqrt(Math.pow(p.x-P.x,2)+Math.pow(p.y-P.y,2));};G.getLineEquation=function(l){var s=(l.p1.y-l.p2.y)/(l.p1.x-l.p2.x),i=l.p1.y-s*l.p1.x;return{slope:s,intercept:i,verticalX:l.p1.x};};G.isPointUnderLine=function(p,l){if(!isFinite(l.slope)){if(p.x===l.verticalX){return 0;}else if(p.x>l.verticalX){return 1;}else{return-1;}}var P=p.y-l.slope*p.x;if(Math.abs(P-l.intercept)<(Number.EPSILON*1000)){return 0;}else if(P<l.intercept){return 1;}else{return-1;}};G.doLinesIntersect=function(l,L){var e=G.getLineEquation(l),E=G.getLineEquation(L);return G.isPointUnderLine(l.p1,E)!=G.isPointUnderLine(l.p2,E)&&G.isPointUnderLine(L.p1,e)!=G.isPointUnderLine(L.p2,e);};G.getLinesIntersection=function(l,L){var x=l.p1.x,y=l.p1.y,a=l.p2.x,b=l.p2.y,c=L.p1.x,d=L.p1.y,e=L.p2.x,f=L.p2.y,C=(x-a)*(d-f)-(y-b)*(c-e);if(C===0){var E=G.getLineEquation(l),o=G.getLineEquation(L);if(E.slope===o.slope&&E.intercept===o.intercept){return{x:Infinity,y:Infinity};}else{return undefined;}}return{x:((x*b-y*a)*(c-e)-(x-a)*(c*f-d*e))/C,y:((x*b-y*a)*(d-f)-(y-b)*(c*f-d*e))/C};};G.doLineRectangleIntersect=function(l,r){return G.getLineRectangleIntersections(l,r).length>=2;};G.getLineRectangleIntersections=function(l,r){var i=[];if((l.p1.x<r.p1.x&&l.p2.x<r.p1.x)||(l.p1.x>r.p2.x&&l.p2.x>r.p2.x)||(l.p1.y<r.p1.y&&l.p2.y<r.p1.y)||(l.p1.y>r.p2.y&&l.p2.y>r.p2.y)){return i;}var I,e=F;[{p1:r.p1,p2:{x:r.p1.x,y:r.p2.y}},{p1:{x:r.p1.x,y:r.p2.y},p2:r.p2},{p1:{x:r.p2.x,y:r.p1.y},p2:r.p2},{p1:r.p1,p2:{x:r.p2.x,y:r.p1.y}}].forEach(function(R){I=G.getLinesIntersection(l,R);if(I&&I.x>=(R.p1.x-e)&&I.x<=(R.p2.x+e)&&I.y>=(R.p1.y-e)&&I.y<=(R.p2.y+e)){i.push(I);}});return i;};G.getPolygonCentroid=function(p){var a=0,b,c,t,C=0,d=0;if(p.points.length<3){throw new Error("Polygon must have three or more points.");}for(var i=0;i<p.points.length;i++){b=p.points[i];c=(i<(p.points.length-1))?p.points[i+1]:p.points[0];a+=b.x*c.y-c.x*b.y;}a=a/2;for(var j=0;j<p.points.length;j++){b=p.points[j];c=(j<(p.points.length-1))?p.points[j+1]:p.points[0];t=b.x*c.y-c.x*b.y;C+=(b.x+c.x)*t;d+=(b.y+c.y)*t;}C=C/(6*a);d=d/(6*a);return{x:C,y:d};};G.getAngleOfVector=function(v){var d=v.apex.x-v.center.x,D=v.apex.y-v.center.y,a=Math.atan(D/d);if(D>0){return(d>=0)?a:a+Math.PI;}else{return(d>=0)?a+2*Math.PI:a+Math.PI;}};G.getLengthOfVector=function(v){return Math.sqrt(Math.pow(v.apex.x-v.center.x,2)+Math.pow(v.apex.y-v.center.y,2));};G.getRotatedPoint=function(p,s){return G.getRotatedVector({center:{x:0,y:0},apex:p},s).apex;};G.getPointSum=function(p,P){return{x:p.x+P.x,y:p.y+P.y};};G.getPointDif=function(p,P){return{x:p.x-P.x,y:p.y-P.y};};G.getRotatedVector=function(v,s){var a=G.getAngleOfVector(v),l=G.getLengthOfVector(v);a+=s;var n={x:Math.cos(a)*l+v.center.x,y:Math.sin(a)*l+v.center.y};return{center:v.center,apex:n};};G.getBoundingBox=function(p){var m=Infinity,M=Infinity,f=-Infinity,a=-Infinity;p.forEach(function(P){if(P.x<m){m=P.x;}if(P.x>f){f=P.x;}if(P.y<M){M=P.y;}if(P.y>a){a=P.y;}});return{p1:{x:m,y:M},p2:{x:f,y:a}};};G.enlargeBox=function(r,m){r.p1.x=r.p1.x-m;r.p1.y=r.p1.y-m;r.p2.x+=m;r.p2.y+=m;};G.getNormalizedVector=function(v,n){var r=n/G.getLengthOfVector(v),s=(v.apex.x-v.center.x)*r,S=(v.apex.y-v.center.y)*r;return{center:{x:0,y:0},apex:{x:s,y:S}};};G.getBezierPathCorners=function(p,r,P){var R=[],B=[],d;var e=p.split(/[,\s]/).reduce(function(b,s){var a=s.match("([a-zA-Z])(.+)");if(a){b.push(a[1]);b.push(a[2]);}else{b.push(s);}return b;},[]);var S=e.reduce(function(S,a){if(parseFloat(a)==a&&S.length){S[S.length-1].push(a);}else{S.push([a]);}return S;},[]);function f(a,b,c){var i=(b.x-a.x);var s=(b.y-a.y);var O=Math.sqrt(i*i+s*s);return g(a,b,Math.min(1,c/O));}function g(a,b,c){return{x:a.x+(b.x-a.x)*c,y:a.y+(b.y-a.y)*c};}function A(s,a){if(s.length>2){s[s.length-2]=a.x;s[s.length-1]=a.y;}}function h(s){return{x:parseFloat(s[s.length-2]),y:parseFloat(s[s.length-1])};}function j(i){return{x:parseFloat(S[i][1]),y:parseFloat(S[i][2])};}function E(a,b){return Math.abs(a-b)<F;}function l(a,b){return(b-a)>F;}function m(a,b){return(a-b)>F;}function k(s){var a,c,b,O,Q=(s>0)?1:-1,T=[],i,U,V,W;if(s===0){return;}s=Math.abs(s);c=j(0);b=j(1);O=G.getNormalizedVector({center:c,apex:b},s);O=G.getRotatedVector(O,-Q*Math.PI/2).apex;c.x+=O.x;c.y+=O.y;T.push(c);for(i=1;i<S.length-1;i++){a=j(i-1);c=j(i);b=j(i+1);U=E(a.x,c.x)&&l(a.y,c.y)||E(c.x,b.x)&&l(c.y,b.y);V=E(a.y,c.y)&&m(a.x,c.x)||E(c.y,b.y)&&m(c.x,b.x);W=E(a.y,c.y)&&l(a.x,c.x)&&E(c.x,b.x)&&m(c.y,b.y)||E(a.y,c.y)&&m(a.x,c.x)&&E(c.x,b.x)&&l(c.y,b.y)||E(a.x,c.x)&&l(a.y,c.y)&&E(c.y,b.y)&&l(c.x,b.x)||E(a.x,c.x)&&m(a.y,c.y)&&E(c.y,b.y)&&m(c.x,b.x);if(Q<0){W=!W;}O.x=(U?s:-s)*Q;O.y=(V?s:-s)*Q;c.x+=O.x;c.y+=O.y;c.inner=W;T.push(c);}c=j(S.length-1);a=j(S.length-2);O=G.getNormalizedVector({center:c,apex:a},s);O=G.getRotatedVector(O,Q*Math.PI/2).apex;c.x+=O.x;c.y+=O.y;T.push(c);for(i=0;i<S.length;i++){S[i][1]=T[i].x.toFixed(0).toString();S[i][2]=T[i].y.toFixed(0).toString();B[i]=T[i].inner;}}if(P){k(P);}if(S.length>1){var o=h(S[0]),C=null;if(S[S.length-1][0]=="Z"&&S[0].length>2){C=["L",o.x,o.y];S[S.length-1]=C;}R.push(S[0]);for(var n=1;n<S.length;n++){var q=R[R.length-1],t=S[n],N=(t==C)?S[1]:S[n+1],u;if(B[n]===true){u=r*0.65;}else if(B[n]===false){u=r*1.35;}else{u=r;}if(N&&q&&(q.length>2)&&t[0]=="L"&&N.length>2&&N[0]=="L"){var v=h(q),w=h(t),x=h(N),y,z,D=Math.abs(v.x-w.x)+Math.abs(v.y-w.y),H=Math.abs(x.x-w.x)+Math.abs(x.y-w.y),I=Math.max(Math.min(u,D,H/2),1);y=f(w,v,I);z=f(w,x,I);A(t,y);t.origPoint=w;R.push(t);var J=g(y,w,0.5),K=g(w,z,0.5),L=["C",J.x,J.y,K.x,K.y,z.x,z.y];L.origPoint=w;R.push(L);}else{R.push(t);}}if(C){var M=h(R[R.length-1]);R.push(["Z"]);A(R[0],M);}}else{R=S;}d=R.reduce(function(s,c){return s+c.join(" ")+" ";},"");return d;};return G;},true);
