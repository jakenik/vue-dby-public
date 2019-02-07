webpackJsonp([8],{TV9V:function(s,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={render:function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("section",[a("h2",[s._v("base-message-box")]),s._v(" "),a("p",[s._v("介绍base-message-box的使用")]),s._v(" "),a("h4",[s._v("基础用法")]),s._v(" "),a("demo-block",{staticClass:"demo-box",attrs:{jsfiddle:{html:'<template>\n  <div>\n    <base-button @click="onClickMessageBox">点击弹出弹窗</base-button>\n  </div>\n</template>\n\n',script:"\nexport default {\n  methods: {\n    onClickMessageBox () {\n      this.$messageBox({\n        cancelText: '取消3',\n        confirmText: '确定4',\n        messageContent: {\n          title: '标题5',\n          content: '表哦提666'\n        },\n        succ:()=> {\n          this.$logger.log(1);\n        },\n        fail:()=>{\n          this.$logger.log(0);\n        }\n      })\n    }\n  }\n}\n",style:null}}},[a("div",{staticClass:"source",attrs:{slot:"source"},slot:"source"},[[a("div",[a("base-button",{on:{click:s.onClickMessageBox}},[s._v("点击弹出弹窗")])],1)]],2),s._v(" "),a("div",{staticClass:"highlight",attrs:{slot:"highlight"},slot:"highlight"},[a("pre",{pre:!0},[a("code",{pre:!0,attrs:{class:"hljs language-html"}},[a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("template")]),s._v(">")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("div")]),s._v(">")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("base-button")]),s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("@click")]),s._v("="),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"onClickMessageBox"')]),s._v(">")]),s._v("点击弹出弹窗"),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("base-button")]),s._v(">")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("div")]),s._v(">")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("template")]),s._v(">")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("script")]),s._v(">")]),a("span",{pre:!0,attrs:{class:"javascript"}},[s._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("default")]),s._v(" {\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("methods")]),s._v(": {\n    onClickMessageBox () {\n      "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".$messageBox({\n        "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("cancelText")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'取消3'")]),s._v(",\n        "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("confirmText")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'确定4'")]),s._v(",\n        "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("messageContent")]),s._v(": {\n          "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("title")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'标题5'")]),s._v(",\n          "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("content")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'表哦提666'")]),s._v("\n        },\n        "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("succ")]),s._v(":"),a("span",{pre:!0,attrs:{class:"hljs-function"}},[a("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("()")]),s._v("=>")]),s._v(" {\n          "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".$logger.log("),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v(");\n        },\n        "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("fail")]),s._v(":"),a("span",{pre:!0,attrs:{class:"hljs-function"}},[a("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("()")]),s._v("=>")]),s._v("{\n          "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".$logger.log("),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v(");\n        }\n      })\n    }\n  }\n}\n")]),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("script")]),s._v(">")]),s._v("\n")])])])])],1)},staticRenderFns:[]},e=a("C7Lr")({methods:{onClickMessageBox:function(){var s=this;this.$messageBox({cancelText:"取消3",confirmText:"确定4",messageContent:{title:"标题5",content:"表哦提666"},succ:function(){s.$logger.log(1)},fail:function(){s.$logger.log(0)}})}}},n,!1,null,null,null);t.default=e.exports},zaxk:function(s,t,a){s.exports=a("TV9V")}});
//# sourceMappingURL=8.905ca346df6e973e8151.js.map