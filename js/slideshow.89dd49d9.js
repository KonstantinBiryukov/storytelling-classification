(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["slideshow"],{"057f":function(t,e,r){var n=r("fc6a"),a=r("241c").f,i={}.toString,o="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],c=function(t){try{return a(t)}catch(e){return o.slice()}};t.exports.f=function(t){return o&&"[object Window]"==i.call(t)?c(t):a(n(t))}},1211:function(t,e,r){},"746f":function(t,e,r){var n=r("428f"),a=r("5135"),i=r("e538"),o=r("9bf2").f;t.exports=function(t){var e=n.Symbol||(n.Symbol={});a(e,t)||o(e,t,{value:i.f(t)})}},8762:function(t,e,r){"use strict";r.r(e);var n=r("7a23"),a=Object(n["C"])("data-v-6b362b0a");Object(n["s"])("data-v-6b362b0a");var i=Object(n["e"])('<div id="map" data-v-6b362b0a></div><div class="map-overlay-container" data-v-6b362b0a><div class="map-overlay" data-v-6b362b0a><h2 id="location-title" data-v-6b362b0a></h2><p id="location-description" data-v-6b362b0a></p></div></div>',2);Object(n["q"])();var o=a((function(t,e,r,n,a,o){return i})),c=(r("a4d3"),r("e01a"),r("d81d"),r("07a4")),s={name:"Slideshow",data:function(){return{style:"mapbox://styles/mapbox/streets-v11"}},computed:{map:function(){return c["a"].getters.createMap("map",0,0,0,[-84.0735768959837,44.47279664463965],this.style,5,!1)}},mounted:function(){c["a"].getters.pageReload();var t=this.map,e=document.getElementById("location-title"),r=document.getElementById("location-description"),n=[{id:"2",title:"Lake Superior",description:"The largest of the Great Lakes of North America, the world's largest freshwater lake by surface area, and the third-largest freshwater lake by volume.",camera:{center:[-87.65298432298495,47.869318744146035],zoom:6,pitch:0}},{id:"3",title:"Lake Michigan",description:"One of the five Great Lakes of North America. It is the second-largest of the Great Lakes by volume and the third-largest by surface area",camera:{center:[-86.97567365378887,44.10015628998541],bearing:0,zoom:6}},{id:"4",title:"Lake Huron",description:"By surface area, Lake Huron is the second-largest of the Great Lakes. Hydrologically, it comprises the easterly portion of Lake Michigan–Huron, having the same surface elevation as its westerly counterpart.",camera:{center:[-82.36802044844158,44.85269068766738],bearing:25.3,zoom:6}},{id:"5",title:"Lake Erie",description:"The fourth-largest lake (by surface area) of the five Great Lakes in North America and the eleventh-largest globally. It is the southernmost, shallowest, and smallest by volume of the Great Lakes.",camera:{center:[-81.26296296200259,42.25019652216405],bearing:36,zoom:6}},{id:"6",title:"Lake Ontario",description:"The easternmost of the Great Lakes and the smallest in surface area, although it exceeds Lake Erie in volume. It is the 13th largest lake in the world. It is the only Great Lake not to border the state of Michigan.",camera:{center:[-77.92353164015204,43.68261986853817],bearing:28.4,zoom:6}},{title:"The Great Lakes",description:"The Great Lakes, also called the Great Lakes of North America, are a series of large interconnected freshwater lakes in the upper mid-east region of North America that connect to the Atlantic Ocean via the Saint Lawrence River. They are lakes Superior, Michigan, Huron, Erie, and Ontario and are in general on or near the Canada–United States border. Hydrologically, there are four lakes, because lakes Michigan and Huron join at the Straits of Mackinac.",camera:{center:[-84.0735768959837,44.47279664463965],zoom:3,bearing:0,pitch:0}}];function a(e){t.setFilter("highlight",["==","id",e])}function i(o){e.textContent=n[o].title,r.textContent=n[o].description,a(n[o].id?n[o].id:""),t.flyTo(n[o].camera),t.once("moveend",(function(){window.setTimeout((function(){o=o+1===n.length?0:o+1,i(o)}),7e3)}))}e.textContent=n[n.length-1].title,r.textContent=n[n.length-1].description,t.on("load",(function(){i(0)}))}};r("8778");s.render=o,s.__scopeId="data-v-6b362b0a";e["default"]=s},8778:function(t,e,r){"use strict";r("1211")},a4d3:function(t,e,r){"use strict";var n=r("23e7"),a=r("da84"),i=r("d066"),o=r("c430"),c=r("83ab"),s=r("4930"),f=r("fdbf"),u=r("d039"),l=r("5135"),d=r("e8b5"),h=r("861d"),b=r("825a"),p=r("7b0b"),g=r("fc6a"),m=r("c04e"),v=r("5c6c"),y=r("7c73"),w=r("df75"),k=r("241c"),S=r("057f"),O=r("7418"),L=r("06cf"),j=r("9bf2"),G=r("d1e7"),N=r("9112"),T=r("6eeb"),x=r("5692"),E=r("f772"),P=r("d012"),I=r("90e3"),C=r("b622"),H=r("e538"),M=r("746f"),z=r("d44e"),A=r("69f3"),J=r("b727").forEach,B=E("hidden"),F="Symbol",R="prototype",$=C("toPrimitive"),_=A.set,q=A.getterFor(F),D=Object[R],Q=a.Symbol,U=i("JSON","stringify"),W=L.f,K=j.f,V=S.f,X=G.f,Y=x("symbols"),Z=x("op-symbols"),tt=x("string-to-symbol-registry"),et=x("symbol-to-string-registry"),rt=x("wks"),nt=a.QObject,at=!nt||!nt[R]||!nt[R].findChild,it=c&&u((function(){return 7!=y(K({},"a",{get:function(){return K(this,"a",{value:7}).a}})).a}))?function(t,e,r){var n=W(D,e);n&&delete D[e],K(t,e,r),n&&t!==D&&K(D,e,n)}:K,ot=function(t,e){var r=Y[t]=y(Q[R]);return _(r,{type:F,tag:t,description:e}),c||(r.description=e),r},ct=f?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof Q},st=function(t,e,r){t===D&&st(Z,e,r),b(t);var n=m(e,!0);return b(r),l(Y,n)?(r.enumerable?(l(t,B)&&t[B][n]&&(t[B][n]=!1),r=y(r,{enumerable:v(0,!1)})):(l(t,B)||K(t,B,v(1,{})),t[B][n]=!0),it(t,n,r)):K(t,n,r)},ft=function(t,e){b(t);var r=g(e),n=w(r).concat(bt(r));return J(n,(function(e){c&&!lt.call(r,e)||st(t,e,r[e])})),t},ut=function(t,e){return void 0===e?y(t):ft(y(t),e)},lt=function(t){var e=m(t,!0),r=X.call(this,e);return!(this===D&&l(Y,e)&&!l(Z,e))&&(!(r||!l(this,e)||!l(Y,e)||l(this,B)&&this[B][e])||r)},dt=function(t,e){var r=g(t),n=m(e,!0);if(r!==D||!l(Y,n)||l(Z,n)){var a=W(r,n);return!a||!l(Y,n)||l(r,B)&&r[B][n]||(a.enumerable=!0),a}},ht=function(t){var e=V(g(t)),r=[];return J(e,(function(t){l(Y,t)||l(P,t)||r.push(t)})),r},bt=function(t){var e=t===D,r=V(e?Z:g(t)),n=[];return J(r,(function(t){!l(Y,t)||e&&!l(D,t)||n.push(Y[t])})),n};if(s||(Q=function(){if(this instanceof Q)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=I(t),r=function(t){this===D&&r.call(Z,t),l(this,B)&&l(this[B],e)&&(this[B][e]=!1),it(this,e,v(1,t))};return c&&at&&it(D,e,{configurable:!0,set:r}),ot(e,t)},T(Q[R],"toString",(function(){return q(this).tag})),T(Q,"withoutSetter",(function(t){return ot(I(t),t)})),G.f=lt,j.f=st,L.f=dt,k.f=S.f=ht,O.f=bt,H.f=function(t){return ot(C(t),t)},c&&(K(Q[R],"description",{configurable:!0,get:function(){return q(this).description}}),o||T(D,"propertyIsEnumerable",lt,{unsafe:!0}))),n({global:!0,wrap:!0,forced:!s,sham:!s},{Symbol:Q}),J(w(rt),(function(t){M(t)})),n({target:F,stat:!0,forced:!s},{for:function(t){var e=String(t);if(l(tt,e))return tt[e];var r=Q(e);return tt[e]=r,et[r]=e,r},keyFor:function(t){if(!ct(t))throw TypeError(t+" is not a symbol");if(l(et,t))return et[t]},useSetter:function(){at=!0},useSimple:function(){at=!1}}),n({target:"Object",stat:!0,forced:!s,sham:!c},{create:ut,defineProperty:st,defineProperties:ft,getOwnPropertyDescriptor:dt}),n({target:"Object",stat:!0,forced:!s},{getOwnPropertyNames:ht,getOwnPropertySymbols:bt}),n({target:"Object",stat:!0,forced:u((function(){O.f(1)}))},{getOwnPropertySymbols:function(t){return O.f(p(t))}}),U){var pt=!s||u((function(){var t=Q();return"[null]"!=U([t])||"{}"!=U({a:t})||"{}"!=U(Object(t))}));n({target:"JSON",stat:!0,forced:pt},{stringify:function(t,e,r){var n,a=[t],i=1;while(arguments.length>i)a.push(arguments[i++]);if(n=e,(h(e)||void 0!==t)&&!ct(t))return d(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!ct(e))return e}),a[1]=e,U.apply(null,a)}})}Q[R][$]||N(Q[R],$,Q[R].valueOf),z(Q,F),P[B]=!0},e01a:function(t,e,r){"use strict";var n=r("23e7"),a=r("83ab"),i=r("da84"),o=r("5135"),c=r("861d"),s=r("9bf2").f,f=r("e893"),u=i.Symbol;if(a&&"function"==typeof u&&(!("description"in u.prototype)||void 0!==u().description)){var l={},d=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof d?new u(t):void 0===t?u():u(t);return""===t&&(l[e]=!0),e};f(d,u);var h=d.prototype=u.prototype;h.constructor=d;var b=h.toString,p="Symbol(test)"==String(u("test")),g=/^Symbol\((.*)\)[^)]+$/;s(h,"description",{configurable:!0,get:function(){var t=c(this)?this.valueOf():this,e=b.call(t);if(o(l,t))return"";var r=p?e.slice(7,-1):e.replace(g,"$1");return""===r?void 0:r}}),n({global:!0,forced:!0},{Symbol:d})}},e538:function(t,e,r){var n=r("b622");e.f=n}}]);
//# sourceMappingURL=slideshow.89dd49d9.js.map