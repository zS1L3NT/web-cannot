(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["MyBooking"],{"0ccb":function(t,e,n){var o=n("50c4"),a=n("577e"),c=n("1148"),r=n("1d80"),i=Math.ceil,s=function(t){return function(e,n,s){var u,l,d=a(r(e)),b=o(n),g=d.length,f=void 0===s?" ":a(s);return b<=g||""==f?d:(u=b-g,l=c.call(f,i(u/f.length)),l.length>u&&(l=l.slice(0,u)),t?d+l:l+d)}};t.exports={start:s(!1),end:s(!0)}},1148:function(t,e,n){"use strict";var o=n("5926"),a=n("577e"),c=n("1d80");t.exports=function(t){var e=a(c(this)),n="",r=o(t);if(r<0||r==1/0)throw RangeError("Wrong number of repetitions");for(;r>0;(r>>>=1)&&(e+=e))1&r&&(n+=e);return n}},"25f0":function(t,e,n){"use strict";var o=n("5e77").PROPER,a=n("6eeb"),c=n("825a"),r=n("577e"),i=n("d039"),s=n("ad6d"),u="toString",l=RegExp.prototype,d=l[u],b=i((function(){return"/a/b"!=d.call({source:"a",flags:"b"})})),g=o&&d.name!=u;(b||g)&&a(RegExp.prototype,u,(function(){var t=c(this),e=r(t.source),n=t.flags,o=r(void 0===n&&t instanceof RegExp&&!("flags"in l)?s.call(t):n);return"/"+e+"/"+o}),{unsafe:!0})},"4d90":function(t,e,n){"use strict";var o=n("23e7"),a=n("0ccb").start,c=n("9a0c");o({target:"String",proto:!0,forced:c},{padStart:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},"57d6":function(t,e,n){"use strict";n.r(e);n("b0c0");var o=n("7a23"),a={class:"MyBooking"},c=Object(o["g"])("h1",null,"Current Booking",-1),r={class:"data"},i={class:"titles"},s=Object(o["g"])("p",null,"Warehouse:",-1),u=Object(o["g"])("p",null,"Address:",-1),l=Object(o["g"])("p",null,"Status:",-1),d={key:0},b=Object(o["g"])("p",null,"Dock:",-1),g=Object(o["g"])("p",null,"Load Type:",-1),f={class:"values"},p={key:0},h={key:0},v=Object(o["g"])("br",null,null,-1),m={key:1,style:{"font-size":"large"}},O={class:"toast",role:"alert","aria-live":"assertive","aria-atomic":"true",id:"toast","data-bs-autohide":"false"},j={class:"toast-body"},k=Object(o["i"])(" The browser will request for your location. Please Allow Permission. "),w={class:"mt-2 pt-2 border-top"},y={class:"modal fade",id:"staticBackdrop","data-bs-backdrop":"static","data-bs-keyboard":"false",tabindex:"-1","aria-labelledby":"staticBackdropLabel","aria-hidden":"true"},x={class:"modal-dialog"},_={class:"modal-content"},C=Object(o["g"])("div",{class:"modal-header"},[Object(o["g"])("h5",{class:"modal-title",id:"staticBackdropLabel"},"Confirmation"),Object(o["g"])("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),E=Object(o["g"])("div",{class:"modal-body",style:{"text-align":"left"}}," Are you sure you want to cancel the booking? ",-1),S={class:"modal-footer"},B=Object(o["g"])("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"}," Close ",-1);function R(t,e,n,R,T,A){return Object(o["u"])(),Object(o["f"])(o["a"],null,[Object(o["g"])("div",a,[c,Object(o["g"])("main",null,[Object(o["g"])("div",r,[Object(o["g"])("section",i,[s,u,l,"waiting_arrival"===T.booking.status?(Object(o["u"])(),Object(o["f"])("p",d,"Time Left:")):Object(o["e"])("",!0),b,g]),Object(o["g"])("section",f,[Object(o["g"])("p",null,Object(o["E"])(T.warehouse.name||"..."),1),Object(o["g"])("p",null,Object(o["E"])(T.warehouse.address||"..."),1),Object(o["g"])("p",null,Object(o["E"])(T.booking.status||"..."),1),"waiting_arrival"===T.booking.status?(Object(o["u"])(),Object(o["f"])("p",p,Object(o["E"])(T.time_left),1)):Object(o["e"])("",!0),Object(o["g"])("p",null,Object(o["E"])(T.dock.name||"..."),1),Object(o["g"])("p",null,Object(o["E"])(T.dock.load_type||"..."),1)])])]),"waiting_arrival"===T.booking.status?(Object(o["u"])(),Object(o["f"])("div",h,[Object(o["g"])("button",{class:"btn btn-main btn-success",type:"button",onClick:e[0]||(e[0]=function(){return A.arrived&&A.arrived.apply(A,arguments)})}," Declare Arrival "),v,Object(o["g"])("button",{class:"btn btn-main btn-danger",type:"button",onClick:e[1]||(e[1]=function(){return A.confirm&&A.confirm.apply(A,arguments)})}," Cancel ")])):Object(o["e"])("",!0),"busy"===T.booking.status?(Object(o["u"])(),Object(o["f"])("div",m," Please wait while docking bay is busy... ")):Object(o["e"])("",!0),"waiting_departure"===T.booking.status?(Object(o["u"])(),Object(o["f"])("button",{key:2,class:"btn btn-main btn-success",type:"button",onClick:e[2]||(e[2]=function(){return A.done&&A.done.apply(A,arguments)})}," Declare Departure ")):Object(o["e"])("",!0),Object(o["g"])("div",O,[Object(o["g"])("div",j,[k,Object(o["g"])("div",w,[Object(o["g"])("button",{type:"button",class:"btn btn-primary btn-sm","data-bs-dismiss":"toast",onClick:e[3]||(e[3]=function(){return A.call&&A.call.apply(A,arguments)})}," I Understand ")])])])]),Object(o["g"])("div",y,[Object(o["g"])("div",x,[Object(o["g"])("div",_,[C,E,Object(o["g"])("div",S,[B,Object(o["g"])("button",{class:"btn btn-danger",type:"button",onClick:e[4]||(e[4]=function(){return A.cancel&&A.cancel.apply(A,arguments)}),"data-bs-dismiss":"modal"}," Yes, Cancel ")])])])])],64)}var T=n("1da1"),A=(n("4d90"),n("d3b7"),n("25f0"),n("99af"),n("96cf"),n("f9e3"),n("4989")),M=n("cc84"),D=(n("e71f"),n("ea7b"),n("bc3a")),I=n.n(D),P=M["b"].firestore(),$={name:"MyBooking",data:function(){return{booking:{},warehouse:{},dock:{},time_left:"...",accepted:!1}},created:function(){var t=this;M["b"].auth().onAuthStateChanged(function(){var e=Object(T["a"])(regeneratorRuntime.mark((function e(n){var o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,!n){e.next=8;break}return e.next=4,P.collection("bookings").where("user_id","==",n.uid).where("status","not-in",["completed","cancelled"]).get();case 4:o=e.sent.docs[0],o&&o.exists?(t.booking=o.data(),P.collection("warehouses").doc(t.booking.warehouse_id).get().then((function(e){e.exists&&(t.warehouse=e.data())})),P.collection("docks").doc(t.booking.dock_id).get().then((function(e){e.exists&&(t.dock=e.data())}))):t.$router.push("/warehouses"),e.next=9;break;case 8:t.$router.push("/");case 9:e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](0),console.error(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t){return e.apply(this,arguments)}}()),setInterval((function(){var e=36e5-(Date.now()-(t.booking.book_time||0)),n=e/1e3|0,o=n%60,a=n/60|0;0===a&&(0===o&&t.$router.push("/warehouses"),t.time_left="".concat(o.toString().padStart(2," "),"s")),t.time_left="".concat(a.toString().padStart(2," "),"m ").concat(o.toString().padStart(2," "),"s")}),1e3)},mounted:function(){if(window.navigator.geolocation){var t=document.getElementById("toast"),e=new A["Toast"](t);e.show()}},methods:{feed_location:function(){var t=this;window.navigator.geolocation.getCurrentPosition(function(){var e=Object(T["a"])(regeneratorRuntime.mark((function e(n){var o,a,c,r,i,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.accepted=!0,o=n.coords,a=o.latitude,c=o.longitude,r=a+","+c,i=encodeURIComponent(t.warehouse.address),e.prev=4,e.next=7,I.a.get("/duration?origin=".concat(r,"&destination=").concat(i));case 7:return s=e.sent,e.next=10,P.collection("bookings").doc(t.booking.id).update({eta:s.data});case 10:setTimeout(t.feed_location,5e3),e.next=16;break;case 13:e.prev=13,e.t0=e["catch"](4),console.error(e.t0);case 16:case"end":return e.stop()}}),e,null,[[4,13]])})));return function(t){return e.apply(this,arguments)}}())},call:function(){var t=this;this.feed_location(),setTimeout((function(){if(!t.accepted){var e=document.getElementById("toast");new A["Toast"](e).show()}}),3e3)},confirm:function(){new A["Modal"](document.getElementById("staticBackdrop"),{}).show()},cancel:function(){var t=this;P.collection("bookings").doc(this.booking.id).update({status:"cancelled"}).then((function(){return t.$router.push("/warehouses")})).catch(console.error)},arrived:function(){P.collection("bookings").doc(this.booking.id).update({status:"busy"}).then((function(){return window.location.reload()})).catch(console.error)},done:function(){var t=this;P.collection("bookings").doc(this.booking.id).update({status:"completed",end_time:Date.now()}).then((function(){return t.$router.push("/warehouses")})).catch(console.error)}}},L=(n("a4a9"),n("6b0d")),J=n.n(L);const U=J()($,[["render",R]]);e["default"]=U},9243:function(t,e,n){},"99af":function(t,e,n){"use strict";var o=n("23e7"),a=n("d039"),c=n("e8b5"),r=n("861d"),i=n("7b0b"),s=n("07fa"),u=n("8418"),l=n("65f0"),d=n("1dde"),b=n("b622"),g=n("2d00"),f=b("isConcatSpreadable"),p=9007199254740991,h="Maximum allowed index exceeded",v=g>=51||!a((function(){var t=[];return t[f]=!1,t.concat()[0]!==t})),m=d("concat"),O=function(t){if(!r(t))return!1;var e=t[f];return void 0!==e?!!e:c(t)},j=!v||!m;o({target:"Array",proto:!0,forced:j},{concat:function(t){var e,n,o,a,c,r=i(this),d=l(r,0),b=0;for(e=-1,o=arguments.length;e<o;e++)if(c=-1===e?r:arguments[e],O(c)){if(a=s(c),b+a>p)throw TypeError(h);for(n=0;n<a;n++,b++)n in c&&u(d,b,c[n])}else{if(b>=p)throw TypeError(h);u(d,b++,c)}return d.length=b,d}})},"9a0c":function(t,e,n){var o=n("342f");t.exports=/Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(o)},a4a9:function(t,e,n){"use strict";n("9243")},ad6d:function(t,e,n){"use strict";var o=n("825a");t.exports=function(){var t=o(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}}}]);
//# sourceMappingURL=MyBooking.62b15cb6.js.map