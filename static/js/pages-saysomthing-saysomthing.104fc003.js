(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-saysomthing-saysomthing"],{"15f2":function(t,n,a){"use strict";a.d(n,"b",(function(){return i})),a.d(n,"c",(function(){return o})),a.d(n,"a",(function(){return e}));var e={pagesLayout:a("9578").default,uniDateformat:a("88d3").default,uniPagination:a("331b").default},i=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("pages-layout",[a("v-uni-view",[a("v-uni-view",{staticClass:"uni-container"},[a("v-uni-view",{staticClass:"content"},[a("v-uni-view",{staticClass:"text-area"},t._l(t.tableData,(function(n){return a("v-uni-view",{key:n._id},[a("v-uni-view",{staticClass:"box",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.viewDetail(n._id)}}},[a("v-uni-view",{staticClass:"box-text"},[t._v(t._s(n.content))]),a("v-uni-view",{staticClass:"box-time"},[a("uni-dateformat",{attrs:{date:n.createdtime,format:"yyyy-MM-dd hh:mm"}})],1)],1)],1)})),1),a("v-uni-view",{staticClass:"uni-pagination-box"},[a("uni-pagination",{attrs:{"show-icon":!0,"page-size":t.pageSize,current:t.pageCurrent,total:t.total},on:{change:function(n){arguments[0]=n=t.$handleEvent(n),t.change.apply(void 0,arguments)}}})],1)],1)],1)],1)],1)},o=[]},2506:function(t,n,a){"use strict";a("7a82");var e=a("dbce").default,i=a("4ea4").default;Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=i(a("c7eb")),r=i(a("1da1")),u=e(a("84e3"));n.default={data:function(){return{tableData:[],pageSize:10,pageCurrent:1,total:0,loading:!1}},onLoad:function(){this.getList()},methods:{change:function(t){this.pageCurrent=t.current,this.getList()},getList:function(){var t=this;return(0,r.default)((0,o.default)().mark((function n(){var a;return(0,o.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.loading=!0,n.next=3,u.alldailies(t.pageCurrent,t.pageSize);case 3:a=n.sent,console.log(a),t.total=a.count,t.tableData=a.data,t.loading=!1;case 8:case"end":return n.stop()}}),n)})))()}}}},"2ea4":function(t,n,a){"use strict";var e=a("bf199"),i=a.n(e);i.a},7213:function(t,n,a){"use strict";a.r(n);var e=a("2506"),i=a.n(e);for(var o in e)["default"].indexOf(o)<0&&function(t){a.d(n,t,(function(){return e[t]}))}(o);n["default"]=i.a},9216:function(t,n,a){var e=a("24fb");n=e(!1),n.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.content[data-v-3675f009]{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:20vh}.logo[data-v-3675f009]{height:%?200?%;width:%?200?%;margin-top:%?200?%;margin-left:auto;margin-right:auto;margin-bottom:%?50?%}.text-area[data-v-3675f009]{width:100%;height:100%}.scroll-Y[data-v-3675f009]{height:100%}.title[data-v-3675f009]{font-size:%?36?%;color:#8f8f94}.box[data-v-3675f009]{margin:40px %?20?%;padding:%?10?%;background:hsla(0,0%,100%,.5);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);border-radius:15px;box-shadow:inset 0 0 6px hsla(0,0%,100%,.2)}.box .box-title[data-v-3675f009]{text-align:center;font-weight:500;font-size:25px}.box .box-text[data-v-3675f009]{margin-top:10px;font-size:18px;font-weight:400;color:#878787;padding:0 20px}.box .box-time[data-v-3675f009]{font-size:16px;text-align:right;color:#a9a9a9}.uni-pagination[data-v-3675f009]{margin-bottom:100px}',""]),t.exports=n},"96f7":function(t,n,a){"use strict";a.r(n);var e=a("15f2"),i=a("7213");for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(n,t,(function(){return i[t]}))}(o);a("2ea4");var r,u=a("f0c5"),s=Object(u["a"])(i["default"],e["b"],e["c"],!1,null,"3675f009",null,!1,e["a"],r);n["default"]=s.exports},bf199:function(t,n,a){var e=a("9216");e.__esModule&&(e=e.default),"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var i=a("4f06").default;i("27d771f4",e,!0,{sourceMap:!1,shadowMode:!1})}}]);