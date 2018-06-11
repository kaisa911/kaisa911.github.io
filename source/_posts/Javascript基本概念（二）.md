---
title: ' Javascript基本概念(二）'
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
数值中必须包含一个小数点，并且小数点后面必须至少有一位数字