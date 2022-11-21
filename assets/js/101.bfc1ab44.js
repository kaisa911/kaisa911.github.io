(window.webpackJsonp=window.webpackJsonp||[]).push([[101],{679:function(a,t,s){"use strict";s.r(t);var e=s(17),r=Object(e.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h2",{attrs:{id:"一、tree-shaking-是什么"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一、tree-shaking-是什么"}},[a._v("#")]),a._v(" 一、Tree shaking 是什么")]),a._v(" "),s("blockquote",[s("p",[a._v("Tree shaking 是一个通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code) 行为的术语。它依赖于 ES2015 中的 import\n和 export 语句，用来检测代码模块是否被导出、导入，且被 JavaScript 文件使用。")])]),a._v(" "),s("h2",{attrs:{id:"二、tree-shaking-的原理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#二、tree-shaking-的原理"}},[a._v("#")]),a._v(" 二、Tree shaking 的原理")]),a._v(" "),s("h3",{attrs:{id:"_2-1-原理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-原理"}},[a._v("#")]),a._v(" 2.1 原理")]),a._v(" "),s("p",[a._v("Tree shaking 的本质是移除掉无用的 js 代码。无用代码移除存在于各种 compiler 中，compiler 会根据代码的 export 和 import 的关系，判断出一些代码没有用到，或者注释掉了等，删除不会影响逻辑，然后把他们移除掉，这个过程就是 DCE（dead codeelimination）。")]),a._v(" "),s("p",[a._v("在 ES6 里引入了 ES Module 这样的静态的模块，ES Module 依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析，这就是 tree-shaking 的基础。能够把依赖树静态地推导出解析语法树。")]),a._v(" "),s("h3",{attrs:{id:"_2-2-在-webpack-中配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-在-webpack-中配置"}},[a._v("#")]),a._v(" 2.2 在 webpack 中配置")]),a._v(" "),s("p",[a._v("在 webpack2 中就支持了 Tree shaking，在 webpack4 中，需要将 mode 设置为 production 即可开启 Tree shaking 同时，也可以通过 package.json 的 sideEffects 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 “pure”，由此可以安全地删除文件中未使用的部分。")]),a._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"name"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"tree-shaking"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"sideEffects"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("false")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),s("p",[a._v("如果所有代码都不包含副作用，可以简单地将该属性标记为 false，来告知 webpack，它可以安全地删除未用到的 export 导出。")]),a._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"name"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"tree-shaking"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"sideEffects"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"./src/common/polyfill.js"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),s("p",[a._v("如果代码有一些副作用，那么可以改为提供如上数组")]),a._v(" "),s("h2",{attrs:{id:"三、tree-shaking-为什么摇不动"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#三、tree-shaking-为什么摇不动"}},[a._v("#")]),a._v(" 三、Tree shaking 为什么摇不动")]),a._v(" "),s("h3",{attrs:{id:"_3-1-babel"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-babel"}},[a._v("#")]),a._v(" 3.1 Babel")]),a._v(" "),s("p",[a._v("Babel 可以把 ES6 及以上的代码转化成浏览器支持的代码。也正是因为 Babel 的出现，才让 FEr 不用去考虑各种浏览器的兼容的问题。")]),a._v(" "),s("p",[a._v("但是也正是因为 Babel 的编译，让很多代码可能有了 sideEffects。Babel 默认把所有的 module 编译成 require 的形式，但是这个是动态的模块，webpack 不能进行 Tree shaking，所以要在.babelrc 里处理一下，不要把 import 转换成 require。")]),a._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"presets"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("\n      "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"env"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"modules"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("false")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//关键点")]),a._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"stage-2"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"react"')]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),s("h3",{attrs:{id:"_3-2-代码的问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-代码的问题"}},[a._v("#")]),a._v(" 3.2 代码的问题")]),a._v(" "),s("p",[a._v("在写代码的时候，不要写一些 IIFE 里引用外部变量的问题，多写一些 pure 的函数。")])])}),[],!1,null,null,null);t.default=r.exports}}]);