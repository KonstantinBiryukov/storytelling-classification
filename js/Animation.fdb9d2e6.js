(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Animation"],{"4e29":function(a,e,t){"use strict";t.r(e);var n=t("7a23"),r={id:"map"};function i(a,e,t,i,o,s){return Object(n["p"])(),Object(n["d"])("div",r)}t("d81d");var o=t("07a4"),s={name:"Animation",data:function(){return{style:"mapbox://styles/mapbox/satellite-v9"}},computed:{map:function(){return o["a"].getters.createMap("map",-10.2,20,11.53,[-122.15860580189565,42.91772239477004],this.style,5,!1)}},mounted:function(){o["a"].getters.pageReload();var a=this.map,e=o["a"].state.mapboxgl;function t(t,n,r){var i=a.getFreeCameraOptions();i.position=e.MercatorCoordinate.fromLngLat(t,n),i.lookAtPoint(r),a.setFreeCameraOptions(i)}a.on("load",(function(){a.addSource("mapbox-dem",{type:"raster-dem",url:"mapbox://mapbox.mapbox-terrain-dem-v1",tileSize:512,maxzoom:14}),a.setTerrain({source:"mapbox-dem",exaggeration:1.5}),a.addLayer({id:"sky",type:"sky",paint:{"sky-type":"atmosphere","sky-atmosphere-sun":[0,90],"sky-atmosphere-sun-intensity":15}})}));var n=0,r=0;a.on("idle",(function(){var a=function(a,e,t){if(Array.isArray(a)&&Array.isArray(e)){for(var n=[],r=0;r<Math.min(a.length,e.length);r++)n[r]=a[r]*(1-t)+e[r]*t;return n}return a*(1-t)+e*t},e=[{duration:80,animate:function(e){var n=[-122.1591817072966,42.889970507106916],r=[-122.14671429878624,42.94240583812641],i=[13e3,3500],o=a(n,r,e),s=a(i[0],i[1],e),m=[-122.14597690976275,42.939151624236146];t(o,s,m)}},{duration:60,animate:function(e){var n=[-122.14671429878624,42.94240583812641],r=[-122.14187181333054,42.96081404622487],i=[3500,16e3],o=[-122.14597690976275,42.939151624236146],s=[-122.15051079336699,42.93831698893578],m=a(n,r,e),d=a(i[0],i[1],e),p=a(o,s,e);t(m,d,p)}}],i=0;function o(a){n%=e.length;var t=e[n];r<t.duration&&t.animate(r/t.duration),r+=1/(a-i),i=a,r>t.duration&&(n++,r=0),window.requestAnimationFrame(o)}window.requestAnimationFrame(o)})),new e.Popup({closeOnClick:!1,anchor:"center"}).setLngLat([-122.20597690976275,42.93965162423615]).setHTML('<div id="animation-helper" class="popup-helper">Cinematographic animation with 3D terrain.<br/><br/>Location: Crater Lake, Wizard Island, Oregon, USA.</div>').addTo(a)}};t("625f");s.render=i;e["default"]=s},"625f":function(a,e,t){"use strict";t("730a")},"730a":function(a,e,t){}}]);
//# sourceMappingURL=Animation.fdb9d2e6.js.map