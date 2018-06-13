---
title: Javascript基本概念(二）
date: 2018-06-11 14:20:09
tags: Javascript
categories: JS高程填坑笔记
---
JS高程的第三章第二节，对数据类型进行一下学习

JS有五种基本数据类型：Number，String，Boolean，Undefined，Null和一种复杂类型：Object，Object本质上是由一组无序的名值对组成的（说好的万物皆对象来着）。JS不支持任何创建自定义类型的机制。

## typeof 操作符
ECMAScript是松散类型的，typeof就是负责来检测给定变量的数据类型的操作符。
typeof是判断参数是什么类型的实例，就一个参数
typeof一般只能返回如下几个结果："number"、"string"、"boolean"、"object"、"function" 和 "undefined"。

## Undefined类型
Undefined类型只有一个值，即特殊的undefined。只有在变量声明且未初始化的时候，变量的值为undefined。
建议显式的初始化undefined，这样发现值为undefined的时候，就会知道该变量未声明而不是未初始化。
```javascript
let message = 'undefined';
```

## Null类型
Null类型只有一个值的数据类型，即特殊的null。从逻辑角度来看，null值表示一个空对象指针，使用typeof操作符检测null值时会返回'object'。
如果定义的变量准备在将来用于保存对象，那么最好将该变量初始化为null而不是其他值。只要直接检查null值就可以知道相应的变量是否已经保存了一个对象的引用
```javascript
if (obj != null){
// 对 car 对象执行某些操作
}
```
另外：undefined值是派生自null值的，在验证相等时，它们的相等性测试要返回true。但是在全等性测试时返回false。

## Boolean类型
Boolean类型是JS中使用得最多的一种类型，该类型只有两个字面值:true和false。Boolean类型的字面值true和false是区分大小写的。
Boolean类型的字面值只有两个，但JS中所有类型的值都有与这两个Boolean值等价的值。要将一个值转换为其对应的 Boolean值，可以调用转型函数Boolean(),可以对任何数据类型的值调用Boolean()函数，而且总会返回一个Boolean值
```javascript
const message = 'hello world';
const bool = Boolean(message);
```
| 数据类型 | true | false 
| ----------- |:-----------:| :--:
| String | 任何非空字符串 | ''(空字符串)
| Boolean | true | false
| Number | 任何非0值 | 0和NaN
| Object | 任何对象 | null
| undefined |  | undefined

## Number类型
Number类型使用IEEE754格式来表示整数和浮点数值(浮点数值在某些语言中也被称为双精度数值)。
最基本的数值字面量格式是十进制整数：`const num = 254;`
八进制字面值的第一位必须是零(0)，然后是八进制数字序列(0~7)`const num2 = 03`;八进制字面量在严格模式下是无效的
十六进制字面值的前两位必须是 0x,`const num2 = 0xff`
算术计算时，所有以八进制和十六进制表示的数值都会被转换成十进制数值
在JavaScript中保存数值的方式，可以保存正零(+0)和负零(0)。正零和负零被认为相等
1、浮点数值
数值中必须包含一个小数点，并且小数点后面必须至少有一位数字.浮点数保存空间是整数的两倍，如果小数点后的值为0或者没有任何数值，那么该数值就会保存成整数
用e或E表示10的幂。`2e5`,浮点数的最高精度为17位。算术运算的时候，精度比整数差的多。不要测试浮点数相等。
2、最值：` Number.MIN_VALUE, Number.MAX_VALUE  `
3、NaN：
该值表示一个本来要返回Number类型的操作数未返回数值的情况。
设计NaN的所有操作都等于NaN，且NaN与任何值都不想等，包括NaN
isNaN()函数,用来判断一个值是否为数值（number）
isNaN也适用于对象，在判断对象的时候，会先调用对象的valueOf()方法，确定该返回值是否是数值，如果不行，会调用toString()方法，再判断是否是数值。
```javascript
isNaN()
```
4、数值转换
有3个方法可以将非数值类型的值转换成数值类型：Number() parseInt()  parseFloat()。
Number()方法可以将任何数值类型转化成数值类型，其他两个需要字符串类型
Number()转换规则：
  * Boolean的值，true转换成1， false转化成0
  * null 转化成0
  * undefined 转化成NaN
  * String变量 
    * 是整数的转换成十进制整数，前导0将被去掉
    * 浮点数将被转化成浮点数，前导0将被去掉
    * 十六进制的数值将被转换成十进制相同大小的值
    * 空字符串将被转换成0
    * 其他的将被转换成NaN
  * Object对象 会先调用对象的valueOf()方法，确定该返回值是否是数值，如果NaN，会调用toString()方法，再按照string方法判断。
parseInt()转换规则
  转换字符串，从第一个非空格字符开始，是数字或者进制符号就继续下一个字符。否则就NaN
  浮点数转化成整数，空字符串转化成NaN
  `parseInt('') = NaN`
parseFloat()转化规则
  从第一个字符开始判断，知道遇到非浮点数字符。
  第一个小数点有效，其他的则无效。
  16进制会被转化成0
  忽略前导0

## String类型
用于表示有0到多个16位Unicode字符组成的字符序列，即字符串。用''或者""表示
1、字符字面量 即转义字符
2、字符串特点
  ES中，字符串一旦创建就不能改变，要改变就会销毁之前变量，然后生产新的变量。
3、转换成字符串
toString()方法
  Number，Boolean，Object，String都有这个方法，转换成相应的字符串。Null和Undefined没有这个方法。
  如果有toString()方法，那就调用该方法
  如果没有，null 转换成'null',undefined 转换成'undefined'

## Object
ES中的对象就是一组数据和功能的集合。对象可以通过new操作符后加名字的来创建
`var o = new Object()`
Object类型是所有它的实例的基础，其具有的属性，在其他所有的实例中都会有。
Object有的属性和方法
  * constructor：保存用于创建当前对象的函数
  * hasOwnProperty(propertyName): 用于判断是否有属于自己的属性，而不是在原型中的属性
  * isPrototypeOf(object): 用于检查传入的对象是否是传入对象的原型
  * propertyIsEnumerable(propertyName)：用于检查属性能否用for-in来遍历
  * toLocaleString()：返回对象的字符串表示
  * toString(): 返回对象的字符串表示
  * valueOf()：返回对象的字符串，数值，布尔表示，通常和toString()结果一样。



