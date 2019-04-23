﻿/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var _=Array(196).join("-"),a="|";function f(t,e){var g="",t=t||"";if(!e){e=50;}g=t.replace(/(\r\n|\n|\r)/gm," ").replace(/(\")/gm,"");if(g.length>e){g=g.substring(0,e-3)+"...";}else{while(g.length<e){g+=" ";}}return g;}function b(r){var t=_+"\n";t+=a+f("rule id: "+r[0].ruleId,193)+a+"\n";t+=a+f("name: "+r[0].name,193)+a+"\n";t+=a+f("library: "+r[0].ruleLibName,193)+a+"\n";t+=a+f("categories: "+r[0].categories.join(", "),193)+a+"\n";t+=a+f("audiences: "+r[0].audiences.join(", "),193)+a+"\n";t+=a+f("description: "+r[0].description,193)+a+"\n";t+=a+f("resolution: "+r[0].resolution,193)+a+"\n";t+=_+"\n";t+=a+f("id",50);t+=a+f("class name",30);t+=a+f("status",10);t+=a+f("details",100);t+=a+"\n";t+=_+"\n";for(var i=0;i<r.length;i++){t+=a+f(r[i].context.id,50);t+=a+f(r[i].context.className,30);t+=a+f(r[i].severity,10);t+=a+f(r[i].details,100);t+=a+"\n";}t+=_+"\n";return t;}function c(l){var t="";if(!l){return t;}for(var e in l){for(var r in l[e]){t+=b(l[e][r]);}t+="\n";}t+="\n";return t;}function d(e){var t="";if(!e){return t;}for(var i=0;i<e.length;i++){t+="\n";t+="Run "+(i+1)+"\n";t+=c(e[i].issues);t+="\n";}return t;}return{format:d};},true);
