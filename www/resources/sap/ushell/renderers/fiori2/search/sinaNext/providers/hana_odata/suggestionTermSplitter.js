sinaDefine(['../../core/core'],function(c){"use strict";var S=c.defineClass({_init:function(p){this.provider=p;this.sina=p.sina;},split:function(t){var s=t.lastIndexOf(' ');if(s<0){return{searchTerm:null,suggestionTerm:t};}var a=t.slice(0,s);a=a.replace(/\s+$/,"");if(a.length===0){return{searchTerm:null,suggestionTerm:t};}var b=t.slice(s);b=b.replace(/^\s+/,"");if(b.length===0){return{searchTerm:null,suggestionTerm:t};}return{searchTerm:a,suggestionTerm:b};},concatenate:function(s,a){if(!s.searchTerm){return;}var t;var b=[];var d=s.searchTerm.split(' ');for(var k=0;k<d.length;k++){t=d[k];t=t.trim();b.push({term:t,regExp:new RegExp(this.escapeRegExp(t),'i')});}for(var i=0;i<a.length;++i){var e=a[i];var n=[];for(var j=0;j<b.length;++j){var f=b[j];if(!f.regExp.test(e.filter.searchTerm)){n.push(f.term);}}var p=[];var g=n.join(' ');for(var l=0;l<n.length;l++){t=n[l];p.push('<b>'+t+'</b>');}p=p.join(' ');e.label=p+' '+e.label;e.filter.searchTerm=e.searchTerm=g+' '+e.filter.searchTerm;this.concatenate(s,e.childSuggestions);}},escapeRegExp:function(s){return s.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&");}});return{split:function(p,t){var s=new S(p,t);return s.split(t);},concatenate:function(p,s,a){var b=new S(p);return b.concatenate(s,a);}};});
