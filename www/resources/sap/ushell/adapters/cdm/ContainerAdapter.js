// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(['sap/ushell/utils','sap/ushell/User','sap/ushell/System','sap/ui/thirdparty/URI'],function(u,U,S,a){"use strict";var C=function(i,p,P){var b="/sap/public/bc/icf/logoff",l=g(P.config,b),o=c(P.config),s=d(i,P.config);function g(h,D){if(h.systemProperties&&h.systemProperties.logoutUrl){return h.systemProperties.logoutUrl;}return D;}function c(h){var j,k=h.userProfile;if(k){j=e(k.defaults,h.userProfilePersonalization,k.metadata);}return new U(j||f());}function d(O,h){var j=h.systemProperties,A=O.getAlias(),k=O.getPlatform(),B=O.getBaseUrl(),m,n;if(j){A=j.alias||A;k=j.platform||k;m=j.SID;n=j.client;}return new S({alias:A,platform:k,baseUrl:B,system:m,client:n});}function e(D,h,j){var k=jQuery.extend(f(),D,h);k.bootTheme=k.bootTheme||{theme:k.theme,root:""};delete k.theme;if(j){if(j.editablePropterties){k.setThemePermitted=j.editablePropterties.indexOf("theme")>-1;k.setAccessibilityPermitted=j.editablePropterties.indexOf("accessibility")>-1;k.setContentDensityPermitted=j.editablePropterties.indexOf("contentDensity")>-1;}if(j.ranges){k.ranges=j.ranges;}}return k;}function f(){return{setThemePermitted:false,setAccessibilityPermitted:false,setContentDensityPermitted:false};}this._getLogoutUrl=function(){return l;};this._setDocumentLocation=function(L){document.location=L;};this.getSystem=function(){return s;};this.getUser=function(){return o;};this.load=function(){return jQuery.when();};this.getCurrentUrl=function(){return window.location.href;};this.logout=function(L){var F;if(!L){throw new Error("Not implemented");}if(u.hasNativeLogoutCapability()){F=(new a(this._getLogoutUrl())).absoluteTo(this.getCurrentUrl()).search("").toString();u.getPrivateEpcm().doLogOff(F);}else{this.logoutRedirect();}return jQuery.when();};this.logoutRedirect=function(){var h=s.adjustUrl(this._getLogoutUrl());this._setDocumentLocation(h);};};return C;},true);
