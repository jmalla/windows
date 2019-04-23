/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/Object","./Utilities","./thirdparty/three","./thirdparty/ColladaLoader"],function(q,B,U,T,C){"use strict";var a="sap.ui.vbm.adapter3d.SceneBuilder";var b=q.sap.log;var d=T.Math.degToRad;var c=T.Box3;var F=T.Face3;var M=T.Matrix4;var V=T.Vector2;var f=T.Vector3;var r="_sapRefCount";var g;var h;var n;var m=U.toBoolean;var o=U.toFloat;var x=U.toVector3;var y=U.toColor;var z=U.toDeltaColor;var A=U.applyColor;var D=U.applyColorBorder;var S=B.extend("sap.ui.vbm.adapter3d.SceneBuilder",{constructor:function(e,i,v){B.call(this);this._context=e;this._viewport=v;this._root=i;this._textureLoader=null;this._colladaLoader=null;this._textures=new Map();this._boxGeometryWith4SidedTexture=null;this._boxGeometryWith6SidedTexture=null;}});S.prototype.destroy=function(){this._context=null;this._root=null;B.prototype.destroy.call(this);};S.prototype.synchronize=function(){var t=this;return new Promise(function(e,i){var j=new Map();var k=function(H){if(j.has(H)){j.get(H).refCount+=1;}else{j.set(H,{object3D:null,refCount:1});}};var l=new Set();var w=sap.ui.vbm.findInArray(t._context.windows,function(w){return w.type==="default";});var s=w&&sap.ui.vbm.findInArray(t._context.scenes,function(s){return s.id===w.refScene;});if(!s){e();return;}if(t._context.setupView){var p=t._context.setupView;t._setupView(p.position,p.zoom,p.pitch,p.yaw,p.home,p.flyTo);t._context.setupView=undefined;}var u=t._context.voQueues.toAdd.get(s)||[];var v=t._context.voQueues.toUpdate.get(s)||[];var E=t._context.voQueues.toRemove.get(s)||[];var G=[].concat(u,v);G.filter(function(H){return H.isColladaModel&&H.model&&H.model!==H._lastModel;}).map(function(H){return H.model;}).forEach(k);G.filter(function(H){return H.texture&&H.texture!==H._lastTexture;}).map(function(H){return H.texture;}).forEach(l.add,l);t._loadTextures(l).then(function(){return t._loadModels(j);}).then(function(){E.forEach(t._destroyVisualObjectInstance.bind(t,t._root));v.forEach(t._updateVisualObjectInstance.bind(t,t._root,j));u.forEach(t._addVisualObjectInstance.bind(t,t._root,j));t._cleanupCache();e();}).catch(function(H){i(H);});});};S.prototype._getGeometrySize=function(){return 2.0;};S.prototype._setupView=function(p,e,i,j,k,l){var s=new f(0,0,-5);var t=new f(0,0,0);p=p||"0;0;0";var u=p.split(";");p=new f(parseFloat(u[0]),parseFloat(u[1]),parseFloat(u[2]));var v=new f(p.x,p.z,-p.y);this._root.position.copy(v);e=parseFloat(e||"1");if(e===0){e=1;}else if(e<0){e=0.1;}var w=this._getGeometrySize()*2/e;i=parseFloat(i||"0");j=parseFloat(j||"0");i=(i%180===0?i+1:i);var E=new M();E.makeRotationX(d(i+180));var G=new M();G.makeRotationZ(d(-(j+180)));var H=new M();H.multiplyMatrices(G,E);var I=new f();I.subVectors(t,s);I.normalize();I.multiplyScalar(w);I.applyMatrix4(H);var J={zoom:1.0,target:t.clone(),position:new f(-I.x,-I.z,I.y)};if(k){this._viewport._setCameraHome(J);this._viewport._applyCamera(J,l);}else{this._viewport._applyCamera(J,l);}};S.prototype._loadTextures=function(t){var p=[];t.forEach(function(e){if(!this._textures.has(e)){p.push(this._loadTexture(e));}},this);return Promise.all(p);};S.prototype._loadTexture=function(t){var e=this;return new Promise(function(i,j){e._getTextureLoader().load(e._context.resources.get(t),function(k){k.flipY=false;k[r]=0;e._textures.set(t,k);i();},null,function(k){b.error("Failed to load texture from Data URI: "+t,"status: "+k.status+", status text: "+k.statusText,a);i();});});};S.prototype._loadModels=function(e){var p=[];e.forEach(function(i,j){p.push(this._loadModel(j,i));},this);return Promise.all(p);};S.prototype._loadModel=function(i,j){var t=this;return new Promise(function(k,l){try{t._getColladaLoader().parse(t._context.resources.get(i),function(p){h(p.scene);j.object3D=p.scene;p.scene.scale.set(1,1,-1);k();});}catch(e){b.error("Failed to load Collada model from resource: "+i,e instanceof Error?e.message:"",a);k();}});};S.prototype._releaseTexture=function(t){if(t.hasOwnProperty(r)){t[r]-=1;}else{t.dispose();}return this;};S.prototype._addRefTexture=function(t){if(!t.hasOwnProperty(r)){t[r]=0;}t[r]+=1;return this;};S.prototype._releaseGeometry=function(e){if(e.hasOwnProperty(r)){e[r]-=1;}else{e.dispose();}return this;};S.prototype._addRefGeometry=function(e){if(!e.hasOwnProperty(r)){e[r]=0;}e[r]+=1;return this;};S.prototype._cleanupCache=function(){this._textures.forEach(function(t){if(t[r]===0){t.dispose();this._textures.delete(t);}},this);if(this._boxGeometryWith4SidedTexture&&this._boxGeometryWith4SidedTexture[r]===0){this._boxGeometryWith4SidedTexture.dispose();this._boxGeometryWith4SidedTexture=null;}if(this._boxGeometryWith6SidedTexture&&this._boxGeometryWith6SidedTexture[r]===0){this._boxGeometryWith6SidedTexture.dispose();this._boxGeometryWith6SidedTexture=null;}return this;};S.prototype._destroyVisualObjectInstance=function(e,i){var t=this;if(i.object3D){i.object3D.traverse(function(j){if(j.isMesh){var k=j.material;if(k){var l=k.map;if(l){t._releaseTexture(l);k.map=null;}k.dispose();j.material=null;}var p=j.geometry;if(p){t._releaseGeometry(p);j.geometry=null;}}});e.remove(i.object3D);i.object3D=null;i._lastModel=null;i._lastTexture=null;i._lastTexture6=null;}return this;};S.prototype._updateVisualObjectInstance=function(e,i,j){if(j.isColladaModel){if(j.model!==j._lastModel){return this._destroyVisualObjectInstance(e,j)._addVisualObjectInstance(e,i,j);}this._assignColladaModelProperties(j);}else if(j.isBox){this._assignBoxProperties(j);}return this;};S.prototype._addVisualObjectInstance=function(e,i,j){if(j.isColladaModel){j._lastModel=j.model;var k=i.get(j.model);var l=--k.refCount===0?k.object3D:k.object3D.clone();j.object3D=new T.Group();j.object3D.add(l);if(m(j.normalize)){n(l);}this._assignMaterial(j.object3D,this._createMaterial());this._assignColladaModelProperties(j);}else if(j.isBox){j.object3D=new T.Group();j.object3D.add(new T.Mesh(undefined,this._createMaterial()));this._assignBoxProperties(j);}else if(j.isPolygon){j.object3D=new T.Group();j.object3D.add(new T.Mesh(undefined,this._createMaterial(true)));this._assignPolygonProperties(j);}if(j.object3D){e.add(j.object3D);}return this;};S.prototype._assignColladaModelProperties=function(i){this._assignProperties(i);return this;};S.prototype._assignBoxProperties=function(i){if(i._lastTexture6!==i.texture6){var e=i.object3D.children[0];if(e.geometry){this._releaseGeometry(e.geometry);}e.geometry=this._getBoxGeometry(m(i.texture6));this._addRefGeometry(e.geometry);if(m(i.normalize)){n(e);}i._lastTexture6=i.texture6;}if(i._lastColorBorder&&i._lastColorBorder!==i.colorBorder){this._removeColorBorder(i);}if(i.colorBorder&&i._lastColorBorder!==i.colorBorder){this._assignColorBorder(i);}i._lastColorBorder=i.colorBorder;this._assignProperties(i);return this;};S.prototype._getPolygonGeometry=function(E,O,G){var H=function(e,p){var i=function(v,s,u){return Math.abs((v.x*(s.y-u.y)+s.x*(u.y-v.y)+u.x*(v.y-s.y))/2);};var t=i(e.vertex1,e.vertex2,e.vertex3);var j=i(p,e.vertex2,e.vertex3);var k=i(e.vertex1,p,e.vertex3);var l=i(e.vertex1,e.vertex2,p);return t===j+k+l;};var I=function(e,u,v,w,i,j,k){var l;var s=1.00000001e-10;var t={vertex1:{x:0.0,y:0.0},vertex2:{x:0.0,y:0.0},vertex3:{x:0.0,y:0.0}};if(j.x){t.vertex1.x=e[k[u]].y;t.vertex1.y=e[k[u]].z;t.vertex2.x=e[k[v]].y;t.vertex2.y=e[k[v]].z;t.vertex3.x=e[k[w]].y;t.vertex3.y=e[k[w]].z;l=Math.sign(j.x);}else if(j.y){t.vertex1.x=e[k[u]].z;t.vertex1.y=e[k[u]].x;t.vertex2.x=e[k[v]].z;t.vertex2.y=e[k[v]].x;t.vertex3.x=e[k[w]].z;t.vertex3.y=e[k[w]].x;l=Math.sign(j.y);}else if(j.z){t.vertex1.x=e[k[u]].x;t.vertex1.y=e[k[u]].y;t.vertex2.x=e[k[v]].x;t.vertex2.y=e[k[v]].y;t.vertex3.x=e[k[w]].x;t.vertex3.y=e[k[w]].y;l=Math.sign(j.z);}var Z=l*(((t.vertex2.x-t.vertex1.x)*(t.vertex3.y-t.vertex1.y))-((t.vertex2.y-t.vertex1.y)*(t.vertex3.x-t.vertex1.x)));if(Z<s){return false;}var $={x:0.0,y:0.0};for(var p=0;p<i;p++){if((p===u)||(p===v)||(p===w)){continue;}if(j.x){$.x=e[k[p]].y;$.y=e[k[p]].z;}else if(j.y){$.x=e[k[p]].z;$.y=e[k[p]].x;}else if(j.z){$.x=e[k[p]].x;$.y=e[k[p]].y;}if(H(t,$)){return false;}}return true;};var J=function(e,p){var Z=[];if(e.length<3){return Z;}var $=1;if(p.x){$=Math.sign(p.x);}else if(p.y){$=Math.sign(p.y);}else if(p.z){$=Math.sign(p.z);}var _=function(e){var e1=0.0;for(var i=e.length-1,j=0;j<e.length;i=j++){if(p.x){e1+=e[i].y*e[j].z-e[i].z*e[j].y;}else if(p.y){e1+=e[i].z*e[j].x-e[i].x*e[j].z;}else if(p.z){e1+=e[i].x*e[j].y-e[i].y*e[j].x;}}return e1*0.5;};var a1=$*_(e);var b1=[];if(0.0<a1){for(var j=0;j<e.length;j++){b1[j]=j;}}else{for(var k=0;k<e.length;k++){b1[k]=(e.length-1)-k;}}var c1=e.length;var d1=2*c1;for(var l=0,v=c1-1;c1>2;){if(0>=d1--){b.error(e.map(function(v){return v.x+":"+v.y+":"+v.z;}).join(";")+" do not form a simple polygon");}var u=v;if(c1<=u){u=0;}v=u+1;if(c1<=v){v=0;}var w=v+1;if(c1<=w){w=0;}if(I(e,u,v,w,c1,p,b1)){var s,t;Z.push(b1[u]);Z.push(b1[w]);Z.push(b1[v]);l++;for(s=v,t=v+1;t<c1;s++,t++){b1[s]=b1[t];}c1--;d1=2*c1;}}return Z;};var K=function(E,O){var e={x:parseFloat("0.0"),y:parseFloat("0.0"),z:parseFloat("1.0")};var v=[];if(O){var i=O.split(";").map(parseFloat);if(i.length===3){e={x:i[0],y:i[1],z:i[2]};}}if(E){var j=E.split(";").map(parseFloat);while(j.length>0){var k=j.splice(0,3);v.push({x:k[0],y:k[1],z:k[2]})}}return J(v,e);};var L=O?O.split(";").map(parseFloat):[0.0,0.0,1];var N=y(G);var P=[];P.push(N.rgb.r,N.rgb.g,N.rgb.b);var Q=[];var R=[];var W=[];E.split(";").forEach(function(e,i){Q.push(parseFloat(e));R.push(L[i%3]);W.push(P[i%3]);});var X=new T.BufferGeometry();var Y=K(E,O);X.setIndex(Y);X.addAttribute("position",new T.Float32BufferAttribute(Q,3));X.addAttribute("normal",new T.Float32BufferAttribute(R,3));X.addAttribute("color",new T.Float32BufferAttribute(W,3));X.computeBoundingSphere();X.computeVertexNormals();return X;};S.prototype._assignPolygonProperties=function(i){var e=i.object3D.children[0];e.geometry=this._getPolygonGeometry(i.posarray,i.outerNormal,i.color);if(i._lastColorBorder&&i._lastColorBorder!==i.colorBorder){this._removeColorBorder(i);}if(i.colorBorder&&i._lastColorBorder!==i.colorBorder){this._assignColorBorder(i);}i._lastColorBorder=i.colorBorder;this._assignProperties(i);return this;};S.prototype._assignProperties=function(i){if(i._lastTexture&&i._lastTexture!==i.texture){this._removeTexture(i);}if(i.texture){this._assignTexture(i);}i._lastTexture=i.texture;A(i,i[m(i["VB:s"])?"selectColor":"color"]);var s=x(i.scale);i.object3D.scale.set(s[0],s[1],s[2]);var e=x(i.rot);i.object3D.rotation.set(d(e[0]),d(e[1]),d(e[2]),"YXZ");var j;if(i.isBox){j=new f(0,0,-1);}else if(i.isPolygon){j=new f(0,0,0);}else{var k=i.object3D.children[0].vbBox;j=new f(0,0,-1.0*(k.min.z>0?k.min.z:k.max.z));}var l=new M();l.makeRotationFromEuler(new T.Euler(d(e[0]),d(e[1]),d(e[2]),"YXZ"));var p=new M();p.makeScale(s[0],s[1],s[2]);p.multiply(l);j.applyMatrix4(p);j.z=-j.z;var t=x(i.pos);var u=new f(t[0],t[1],t[2]);u.sub(j);i.object3D.position.set(u.x,u.y,u.z);i.object3D.traverse(function(v){v._sapInstance=i;});return this;};S.prototype._removeTexture=function(i){if(i.object3D){var t=this;i.object3D.traverse(function(e){if(e.isMesh&&e.material&&e.material.map){t._releaseTexture(e.material.texture);e.material.map=null;}});}return this;};S.prototype._assignTexture=function(i){if(i.object3D){var t=this;var e=this._textures.get(i.texture);i.object3D.traverse(function(j){if(j.isMesh&&j.material){j.material.map=e;t._addRefTexture(e);}});}return this;};S.prototype._removeColorBorder=function(i){if(i.object3D){i.object3D.traverse(function(e){var w=sap.ui.vbm.findIndexInArray(e.children,function(k){return k.isLineSegments;});if(w!==-1){var j=e.children[w];e.remove(j);j.geometry.dispose();j.material.dispose();j=undefined;}});}return this;};S.prototype._assignColorBorder=function(i){var e=i.object3D.children[0];e.add(new T.LineSegments(new T.EdgesGeometry(e.geometry),this._createLineBasicMaterial()));D(i,i.colorBorder);return this;};S.prototype._createMaterial=function(e){return new T.MeshPhongMaterial({shininess:1,specular:0x101009,side:e?T.DoubleSide:T.FrontSide});};S.prototype._createLineBasicMaterial=function(){return new T.LineBasicMaterial({linewidth:1});};S.prototype._assignMaterial=function(e,i){e.traverse(function(j){if(j.isMesh){j.material=i;}});return this;};S.prototype._getBoxGeometry=function(e){var i=e?"_boxGeometryWith6SidedTexture":"_boxGeometryWith4SidedTexture";return this[i]||(this[i]=g(e));};S.prototype._getTextureLoader=function(){return this._textureLoader||(this._textureLoader=new T.TextureLoader());};S.prototype._getColladaLoader=function(){return this._colladaLoader||(this._colladaLoader=new C());};h=function(e){var i=[];e.traverse(function(j){if(j.isLight||j.isCamera){i.push(j);}});i.forEach(function(j){while(j&&j!==e){var p=j.parent;if(j.children.length===0){p.remove(j);}j=p;}});return e;};n=function(e){var i=new c().setFromObject(e);var j=i.getCenter();i.min.sub(new f(j.x,j.y,-j.z));i.max.sub(new f(j.x,j.y,-j.z));var s=Math.max(Math.abs(i.min.x),Math.abs(i.min.y),Math.abs(i.min.z),Math.abs(i.max.x),Math.abs(i.max.y),Math.abs(i.max.z));if(s){s=1/s;}i.min.set(i.min.x*s,i.min.y*s,-i.min.z*s);i.max.set(i.max.x*s,i.max.y*s,-i.max.z*s);U.swap(i,"min","max");e.vbBox=i;var k=new M().makeScale(s,s,s);var l=new M().makeTranslation(-j.x,-j.y,-j.z);e.updateMatrix();k.multiply(l);k.multiply(e.matrix);k.decompose(e.position,e.quaternion,e.scale);return e;};g=function(e){var i=new T.Geometry();var j=0.1;i.vertices.push(new f(j,j,-j),new f(j,-j,-j),new f(-j,-j,-j),new f(-j,j,-j),new f(j,j,j),new f(-j,j,j),new f(-j,-j,j),new f(j,-j,j),new f(j,j,-j),new f(j,j,j),new f(j,-j,j),new f(j,-j,-j),new f(j,-j,-j),new f(j,-j,j),new f(-j,-j,j),new f(-j,-j,-j),new f(-j,-j,-j),new f(-j,-j,j),new f(-j,j,j),new f(-j,j,-j),new f(j,j,j),new f(j,j,-j),new f(-j,j,-j),new f(-j,j,j));var k=new T.Color(0.5,0.5,0.5);i.faces.push(new F(0,2,3,new f(0,0,-1),k),new F(0,1,2,new f(0,0,-1),k),new F(4,5,6,new f(0,0,1),k),new F(4,6,7,new f(0,0,1),k),new F(8,10,11,new f(1,0,0),k),new F(8,9,10,new f(1,0,0),k),new F(12,14,15,new f(0,-1,0),k),new F(12,13,14,new f(0,-1,0),k),new F(16,18,19,new f(-1,0,0),k),new F(16,17,18,new f(-1,0,0),k),new F(20,22,23,new f(0,1,0),k),new F(20,21,22,new f(0,1,0),k));var u;if(e){u=[new V(2/3,0.5),new V(1.0,0.5),new V(1.0,1.0),new V(2/3,1.0),new V(2/3,0.5),new V(2/3,0.0),new V(1.0,0.0),new V(1.0,0.5),new V(2/3,0.5),new V(2/3,1.0),new V(1/3,1.0),new V(1/3,0.5),new V(2/3,0.0),new V(2/3,0.5),new V(1/3,0.5),new V(1/3,0.0),new V(1/3,0.5),new V(1/3,1.0),new V(0.0,1.0),new V(0.0,0.5),new V(0.0,0.5),new V(0.0,0.0),new V(1/3,0.0),new V(1/3,0.5)];}else{u=[new V(0.5,0.5),new V(1.0,0.5),new V(1.0,1.0),new V(0.5,1.0),new V(0.5,0.5),new V(1.0,0.5),new V(1.0,1.0),new V(0.5,1.0),new V(0.5,0.5),new V(0.5,1.0),new V(0.0,1.0),new V(0.0,0.5),new V(0.5,0.5),new V(0.5,0.0),new V(1.0,0.0),new V(1.0,0.5),new V(0.5,0.5),new V(0.5,1.0),new V(0.0,1.0),new V(0.0,0.5),new V(0.0,0.5),new V(0.0,0.0),new V(0.5,0.0),new V(0.5,0.5)];}i.faceVertexUvs[0].push([u[0],u[2],u[3]],[u[0],u[1],u[2]],[u[5],u[6],u[7]],[u[5],u[7],u[4]],[u[8],u[10],u[11]],[u[8],u[9],u[10]],[u[12],u[14],u[15]],[u[12],u[13],u[14]],[u[16],u[18],u[19]],[u[16],u[17],u[18]],[u[20],u[22],u[23]],[u[20],u[21],u[22]]);return i;};return S;});
