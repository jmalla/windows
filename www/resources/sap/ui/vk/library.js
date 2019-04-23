/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","./TransformationMatrix","./DvlException","./Core"],function(q,T,D,C){"use strict";var l=q.sap.log;sap.ui.getCore().initLibrary({name:"sap.ui.vk",dependencies:["sap.ui.core"],types:["sap.ui.vk.CameraFOVBindingType","sap.ui.vk.CameraProjectionType","sap.ui.vk.ContentResourceSourceCategory","sap.ui.vk.dvl.GraphicsCoreApi","sap.ui.vk.SelectionMode","sap.ui.vk.TransformationMatrix","sap.ui.vk.VisibilityMode","sap.ui.vk.ZoomTo"],interfaces:["sap.ui.vk.DecryptionHandler","sap.ui.vk.AuthorizationHandler"],controls:["sap.ui.vk.ContainerBase","sap.ui.vk.ContainerContent","sap.ui.vk.FlexibleControl","sap.ui.vk.LegendItem","sap.ui.vk.ListPanel","sap.ui.vk.ListPanelStack","sap.ui.vk.MapContainer","sap.ui.vk.NativeViewport","sap.ui.vk.Notifications","sap.ui.vk.Overlay","sap.ui.vk.RedlineDesign","sap.ui.vk.RedlineSurface","sap.ui.vk.SceneTree","sap.ui.vk.StepNavigation","sap.ui.vk.Toolbar","sap.ui.vk.Viewer","sap.ui.vk.Viewport","sap.ui.vk.ViewportBase","sap.ui.vk.dvl.Viewport","sap.ui.vk.threejs.Viewport"],elements:["sap.ui.vk.ContentConnector","sap.ui.vk.OverlayArea","sap.ui.vk.RedlineElement","sap.ui.vk.RedlineElementEllipse","sap.ui.vk.RedlineElementFreehand","sap.ui.vk.RedlineElementLine","sap.ui.vk.RedlineElementText","sap.ui.vk.RedlineElementRectangle","sap.ui.vk.ViewStateManager","sap.ui.vk.ViewStateManagerBase","sap.ui.vk.dvl.ViewStateManager","sap.ui.vk.threejs.ViewStateManager"],noLibraryCSS:false,version:"1.61.0"});q.sap.registerModuleShims({"sap/ui/vk/threejs/thirdparty/three":{exports:"THREE",amd:true},"sap/ui/vk/ve/thirdparty/html2canvas":{exports:"html2canvas",amd:true},"sap/ui/vk/threejs/thirdparty/totara":{exports:"Totara",amd:true}});var a=function(b,s){var m="new extend getMetadata";if(s){m+=" "+s;}sap.ui.lazyRequire("sap.ui.vk."+b,m);};a("Camera");a("ContentConnector","registerSourceType");a("ContentResource");a("ContentManager");a("DownloadManager");a("ImageContentManager");a("Loco");a("LayerProxy");a("NodeHierarchy");a("NodeProxy");a("Scene");a("View");a("ViewportHandler");a("dvl.GraphicsCore");a("dvl.BaseNodeProxy");a("dvl.ContentManager","getRuntimeSettings setRuntimeSettings getWebGLContextAttributes setWebGLContextAttributes getDecryptionHandler setDecryptionHandler");a("dvl.LayerProxy");a("dvl.NodeHierarchy");a("dvl.NodeProxy");a("dvl.Scene");a("threejs.BaseNodeProxy");a("threejs.ContentManager","registerLoader");a("threejs.LayerProxy");a("threejs.NodeHierarchy");a("threejs.NodeProxy");a("threejs.Billboard");a("threejs.Callout");a("threejs.DetailView");a("threejs.OrthographicCamera");a("threejs.PerspectiveCamera");a("threejs.Scene");sap.ui.vk.dvl.GraphicsCoreApi={LegacyDvl:"LegacyDvl"};sap.ui.vk.ContentResourceSourceCategory={"3D":"3D","2D":"2D"};sap.ui.vk.CameraProjectionType={Perspective:"perspective",Orthographic:"orthographic"};sap.ui.vk.CameraFOVBindingType={Minimum:"minimum",Maximum:"maximum",Horizontal:"horizontal",Vertical:"vertical"};sap.ui.vk.VisibilityMode={Complete:"complete",Differences:"differences"};sap.ui.vk.ZoomTo={All:"all",Visible:"visible",Selected:"selected",Node:"node",NodeSetIsolation:"node_setisolation",Restore:"restore",RestoreRemoveIsolation:"restore_removeisolation",ViewLeft:"view_left",ViewRight:"view_right",ViewTop:"view_top",ViewBottom:"view_bottom",ViewBack:"view_back",ViewFront:"view_front"};sap.ui.vk.SelectionMode={None:"none",Exclusive:"exclusive",Sticky:"sticky"};sap.ui.vk.RenderMode={Default:"default",XRay:"xray"};sap.ui.vk.BillboardCoordinateSpace={Viewport:"Viewport",Screen:"Screen",World:"World"};sap.ui.vk.BillboardTextEncoding={PlainText:"PlainText",HtmlText:"HtmlText"};sap.ui.vk.BillboardStyle={RectangularShape:"RectangularShape",CircularShape:"CircularShape",None:"None",TextGlow:"TextGlow"};sap.ui.vk.BillboardBorderLineStyle={None:"None",Solid:"Solid",Dash:"Dash",Dot:"Dot",DashDot:"DashDot",DashDotDot:"DashDotDot"};sap.ui.vk.BillboardHorizontalAlignment={Left:"left",Center:"center",Right:"right"};sap.ui.vk.LeaderLineMarkStyle={None:"None",Point:"Point",Arrow:"Arrow"};sap.ui.vk.DetailViewType={DetailView:"DetailView",Cutaway:"Cutaway"};sap.ui.vk.DetailViewShape={Box:"Box",Circle:"Circle",CircleLine:"CircleLine",CirclePointer:"CirclePointer",CircleArrow:"CircleArrow",CircleBubbles:"CircleBubbles",BoxLine:"BoxLine",BoxNoOutline:"BoxNoOutline",SolidPointer:"SolidPointer",SolidArrow:"SolidArrow"};sap.ui.vk.MapContainerButtonType={Click:"Click",Toggle:"Toggle"};sap.ui.vk.ContentResourceSourceTypeToCategoryMap={"vds":sap.ui.vk.ContentResourceSourceCategory["3D"],"vdsl":sap.ui.vk.ContentResourceSourceCategory["3D"],"cgm":sap.ui.vk.ContentResourceSourceCategory["3D"],"png":sap.ui.vk.ContentResourceSourceCategory["2D"],"jpg":sap.ui.vk.ContentResourceSourceCategory["2D"],"jpeg":sap.ui.vk.ContentResourceSourceCategory["2D"],"gif":sap.ui.vk.ContentResourceSourceCategory["2D"],"bmp":sap.ui.vk.ContentResourceSourceCategory["2D"],"tiff":sap.ui.vk.ContentResourceSourceCategory["2D"],"tif":sap.ui.vk.ContentResourceSourceCategory["2D"],"svg":sap.ui.vk.ContentResourceSourceCategory["2D"]};var d="sap.ve.dvl";sap.ui.vk.dvl.checkResult=function(r){if(r<0){var m=sap.ve.dvl.DVLRESULT.getDescription?sap.ve.dvl.DVLRESULT.getDescription(r):"";l.error(m,JSON.stringify({errorCode:r}),d);throw new D(r,m);}return r;};sap.ui.vk.dvl.getPointer=function(p){if(typeof p==="number"){var r=p;var m=sap.ve.dvl.DVLRESULT.getDescription?sap.ve.dvl.DVLRESULT.getDescription(r):"";l.error(m,JSON.stringify({errorCode:r}),d);throw new D(r,m);}return p;};sap.ui.vk.dvl.getJSONObject=function(o){if(typeof o==="number"){var r=o;var m=sap.ve.dvl.DVLRESULT.getDescription?sap.ve.dvl.DVLRESULT.getDescription(r):"";l.error(m,JSON.stringify({errorCode:r}),d);throw new D(r,m);}return o;};sap.ui.vk.getResourceBundle=function(){var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.vk.i18n");sap.ui.vk.getResourceBundle=function(){return r;};return r;};sap.ui.vk.utf8ArrayBufferToString=function(b){return decodeURIComponent(escape(String.fromCharCode.apply(null,new Uint8Array(b))));};sap.ui.vk.Redline={ElementType:{Line:"line",Rectangle:"rectangle",Ellipse:"ellipse",Freehand:"freehand",Text:"text"},svgNamespace:"http://www.w3.org/2000/svg"};sap.ui.vk.cssColorToColor=(function(){var i=false;var b=document.createElement("div");b.id="sap.ui.vk.colorConverter";b.style.setProperty("display","none","important");return function(c){if(!i){if(document.body){document.body.appendChild(b);i=true;}else{return{red:0,green:0,blue:0,alpha:1};}}b.style.setProperty("color","rgba(0, 0, 0, 0)","important");b.style.setProperty("color",c,"important");var e=window.getComputedStyle(b).color;if(e==="transparent"){return{red:0,green:0,blue:0,alpha:0};}else{var f=e.split("(")[1].split(")")[0].split(",");return{red:parseInt(f[0],10),green:parseInt(f[1],10),blue:parseInt(f[2],10),alpha:f.length===4?parseFloat(f[3]):1};}};})();sap.ui.vk.colorToCSSColor=function(c){return"rgba("+c.red+","+c.green+","+c.blue+","+c.alpha+")";};sap.ui.vk.abgrToColor=function(b){return{red:b&0xff,green:b>>>8&0xff,blue:b>>>16&0xff,alpha:(b>>>24&0xff)/255};};sap.ui.vk.colorToABGR=function(c){return(c.alpha*255<<24|c.blue<<16|c.green<<8|c.red)>>>0;};return sap.ui.vk;});
