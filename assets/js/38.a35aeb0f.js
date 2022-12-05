(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{613:function(t,e,a){"use strict";a.r(e);var n=a(17),s=Object(n.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[t._v("JS高程的第三章第二节，对数据类型进行一下学习")]),t._v(" "),a("p",[t._v("JS有五种基本数据类型：Number，String，Boolean，Undefined，Null和一种复杂类型：Object，Object本质上是由一组无序的名值对组成的（说好的万物皆对象来着）。JS不支持任何创建自定义类型的机制。")]),t._v(" "),a("h2",{attrs:{id:"typeof-操作符"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#typeof-操作符"}},[t._v("#")]),t._v(" typeof 操作符")]),t._v(" "),a("p",[t._v('ECMAScript是松散类型的，typeof就是负责来检测给定变量的数据类型的操作符。\ntypeof是判断参数是什么类型的实例，就一个参数\ntypeof一般只能返回如下几个结果："number"、"string"、"boolean"、"object"、"function" 和 "undefined"。')]),t._v(" "),a("h2",{attrs:{id:"undefined类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#undefined类型"}},[t._v("#")]),t._v(" Undefined类型")]),t._v(" "),a("p",[t._v("Undefined类型只有一个值，即特殊的undefined。只有在变量声明且未初始化的时候，变量的值为undefined。\n建议显式的初始化undefined，这样发现值为undefined的时候，就会知道该变量未声明而不是未初始化。")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" message "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'undefined'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"null类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#null类型"}},[t._v("#")]),t._v(" Null类型")]),t._v(" "),a("p",[t._v("Null类型只有一个值的数据类型，即特殊的null。从逻辑角度来看，null值表示一个空对象指针，使用typeof操作符检测null值时会返回'object'。\n如果定义的变量准备在将来用于保存对象，那么最好将该变量初始化为null而不是其他值。只要直接检查null值就可以知道相应的变量是否已经保存了一个对象的引用")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("obj "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 对 car 对象执行某些操作")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("另外：undefined值是派生自null值的，在验证相等时，它们的相等性测试要返回true。但是在全等性测试时返回false。")]),t._v(" "),a("h2",{attrs:{id:"boolean类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#boolean类型"}},[t._v("#")]),t._v(" Boolean类型")]),t._v(" "),a("p",[t._v("Boolean类型是JS中使用得最多的一种类型，该类型只有两个字面值:true和false。Boolean类型的字面值true和false是区分大小写的。\nBoolean类型的字面值只有两个，但JS中所有类型的值都有与这两个Boolean值等价的值。要将一个值转换为其对应的 Boolean值，可以调用转型函数Boolean(),可以对任何数据类型的值调用Boolean()函数，而且总会返回一个Boolean值")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" message "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hello world'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" bool "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Boolean")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("message"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("table",[a("thead",[a("tr",[a("th",[t._v("数据类型")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("true")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("false")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("String")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("任何非空字符串")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("''(空字符串)")])]),t._v(" "),a("tr",[a("td",[t._v("Boolean")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("true")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("false")])]),t._v(" "),a("tr",[a("td",[t._v("Number")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("任何非0值")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("0和NaN")])]),t._v(" "),a("tr",[a("td",[t._v("Object")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("任何对象")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("null")])]),t._v(" "),a("tr",[a("td",[t._v("undefined")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}}),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("undefined")])])])]),t._v(" "),a("h2",{attrs:{id:"number类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#number类型"}},[t._v("#")]),t._v(" Number类型")]),t._v(" "),a("p",[t._v("Number类型使用IEEE754格式来表示整数和浮点数值(浮点数值在某些语言中也被称为双精度数值)。\n最基本的数值字面量格式是十进制整数："),a("code",[t._v("const num = 254;")]),t._v("，最高具有53位有效数字精度\n八进制字面值的第一位必须是零(0)，然后是八进制数字序列(0~7)"),a("code",[t._v("const num2 = 03")]),t._v(";八进制字面量在严格模式下是无效的\n十六进制字面值的前两位必须是 0x,"),a("code",[t._v("const num2 = 0xff")]),t._v("\n算术计算时，所有以八进制和十六进制表示的数值都会被转换成十进制数值\n在JavaScript中保存数值的方式，可以保存正零(+0)和负零(0)。正零和负零被认为相等\n1、浮点数值\n数值中必须包含一个小数点，并且小数点后面必须至少有一位数字.浮点数保存空间是整数的两倍，如果小数点后的值为0或者没有任何数值，那么该数值就会保存成整数\n用e或E表示10的幂。"),a("code",[t._v("2e5")]),t._v(",浮点数的最高精度为17位。算术运算的时候，精度比整数差的多。不要测试浮点数相等。\n2、最值："),a("code",[t._v("Number.MIN_VALUE, Number.MAX_VALUE")]),t._v("\n3、NaN：\n该值表示一个本来要返回Number类型的操作数未返回数值的情况。\n设计NaN的所有操作都等于NaN，且NaN与任何值都不想等，包括NaN\nisNaN()函数,用来判断一个值是否为数值（number）\nisNaN也适用于对象，在判断对象的时候，会先调用对象的valueOf()方法，确定该返回值是否是数值，如果不行，会调用toString()方法，再判断是否是数值。")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("isNaN")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[t._v("4、数值转换\n有3个方法可以将非数值类型的值转换成数值类型：Number() parseInt()  parseFloat()。\nNumber()方法可以将任何数值类型转化成数值类型，其他两个需要字符串类型\nNumber()转换规则：")]),t._v(" "),a("ul",[a("li",[t._v("Boolean的值，true转换成1， false转化成0")]),t._v(" "),a("li",[t._v("null 转化成0")]),t._v(" "),a("li",[t._v("undefined 转化成NaN")]),t._v(" "),a("li",[t._v("String变量\n"),a("ul",[a("li",[t._v("是整数的转换成十进制整数，前导0将被去掉")]),t._v(" "),a("li",[t._v("浮点数将被转化成浮点数，前导0将被去掉")]),t._v(" "),a("li",[t._v("十六进制的数值将被转换成十进制相同大小的值")]),t._v(" "),a("li",[t._v("空字符串将被转换成0")]),t._v(" "),a("li",[t._v("其他的将被转换成NaN")])])]),t._v(" "),a("li",[t._v("Object对象 会先调用对象的valueOf()方法，确定该返回值是否是数值，如果NaN，会调用toString()方法，再按照string方法判断。")])]),t._v(" "),a("p",[t._v("parseInt()转换规则\n转换字符串，从第一个非空格字符开始，是数字或者进制符号就继续下一个字符。否则就NaN\n浮点数转化成整数，空字符串转化成NaN\n"),a("code",[t._v("parseInt('') = NaN")])]),t._v(" "),a("p",[t._v("parseFloat()转化规则\n从第一个字符开始判断，知道遇到非浮点数字符。\n第一个小数点有效，其他的则无效。\n16进制会被转化成0\n忽略前导0")]),t._v(" "),a("h2",{attrs:{id:"string类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#string类型"}},[t._v("#")]),t._v(" String类型")]),t._v(" "),a("p",[t._v("用于表示有0到多个16位Unicode字符组成的字符序列，即字符串。用''或者\"\"表示\n1、字符字面量 即转义字符\n2、字符串特点\nES中，字符串一旦创建就不能改变，要改变就会销毁之前变量，然后生产新的变量。\n3、转换成字符串\ntoString()方法\nNumber，Boolean，Object，String都有这个方法，转换成相应的字符串。Null和Undefined没有这个方法。\n如果有toString()方法，那就调用该方法\n如果没有，null 转换成'null',undefined 转换成'undefined'")]),t._v(" "),a("h2",{attrs:{id:"object"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#object"}},[t._v("#")]),t._v(" Object")]),t._v(" "),a("p",[t._v("ES中的对象就是一组数据和功能的集合。对象可以通过new操作符后加名字的来创建\n"),a("code",[t._v("var o = new Object()")]),t._v("\nObject类型是所有它的实例的基础，其具有的属性，在其他所有的实例中都会有。\nObject有的属性和方法")]),t._v(" "),a("ul",[a("li",[t._v("constructor：保存用于创建当前对象的函数")]),t._v(" "),a("li",[t._v("hasOwnProperty(propertyName): 用于判断是否有属于自己的属性，而不是在原型中的属性")]),t._v(" "),a("li",[t._v("isPrototypeOf(object): 用于检查传入的对象是否是传入对象的原型")]),t._v(" "),a("li",[t._v("propertyIsEnumerable(propertyName)：用于检查属性能否用for-in来遍历")]),t._v(" "),a("li",[t._v("toLocaleString()：返回对象的字符串表示")]),t._v(" "),a("li",[t._v("toString(): 返回对象的字符串表示")]),t._v(" "),a("li",[t._v("valueOf()：返回对象的字符串，数值，布尔表示，通常和toString()结果一样。")])])])}),[],!1,null,null,null);e.default=s.exports}}]);