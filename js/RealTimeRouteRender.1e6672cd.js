(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["RealTimeRouteRender"],{"95f9":function(e,a,t){"use strict";t.r(a);var o=t("7a23"),n=Object(o["C"])("data-v-70cca1a5");Object(o["s"])("data-v-70cca1a5");var r={id:"map"};Object(o["q"])();var c=n((function(e,a,t,n,c,i){return Object(o["p"])(),Object(o["d"])("div",r)})),i=t("07a4"),s=t("e192"),d=t.n(s),p={name:"RealTimeRouteRender",mounted:function(){i["a"].getters.pageReload();var e=i["a"].getters.d3Map();e.on("load",(function(){i["a"].state.d3.json("https://docs.mapbox.com/mapbox-gl-js/assets/hike.geojson",(function(a,t){if(a)throw a;var o=t.features[0].geometry.coordinates;t.features[0].geometry.coordinates=[o[0]],e.addSource("trace",{type:"geojson",data:t}),e.addLayer({id:"trace",type:"line",source:"trace",paint:{"line-color":"yellow","line-opacity":.75,"line-width":5}}),e.jumpTo({center:o[0],zoom:14}),e.setPitch(30);var n=0,r=window.setInterval((function(){n<o.length?(t.features[0].geometry.coordinates.push(o[n]),e.getSource("trace").setData(t),e.panTo(o[n]),n++):window.clearInterval(r)}),10)})),new d.a.Popup({closeOnClick:!1,anchor:"center"}).setLngLat([-122.035807,45.632433]).setHTML('<div id="animation-helper" class="popup-helper">The path is rendered in real-time. This example shows the progression of a path by adding new coordinates to the route.</div>').addTo(e)}))}};p.render=c,p.__scopeId="data-v-70cca1a5";a["default"]=p}}]);
//# sourceMappingURL=RealTimeRouteRender.1e6672cd.js.map