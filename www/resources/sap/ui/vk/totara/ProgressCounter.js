sap.ui.define(["jquery.sap.global"],function(q){"use strict";function C(){this._count=0;this._total=0;var o;this.setOnValueChanged=function(c){o=c;};this.callOnValueChanged=function(){if(o){o();}};}var p=C.prototype;Object.defineProperty(p,"count",{get:function(){return this._count;},set:function(v){if(v!==this._count){this._count=v;this.callOnValueChanged();}}});Object.defineProperty(p,"total",{get:function(){return this._total;},set:function(v){if(v!==this._total){this._total=v;this.callOnValueChanged();}}});var P=function(){var o;function a(){if(o){o(this);}}this.mesh=new C();this.geometry=new C();this.mesh.setOnValueChanged(a);this.geometry.setOnValueChanged(a);this.setOnProgressChanged=function(c){o=c;};};return P;});
