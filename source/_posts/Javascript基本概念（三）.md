---
title: Javascript 基本概念（三）
date: 2018-06-13 23:27:09
tags: Javascript
categories: JS高程填坑笔记
---
这是JS高程第三章的第三部分。这一章内容是真的多。。我觉得重新刷高程，对我来说，也是一种不一样的进步吧。
本节的主要内容是
* 操作符

## 一元操作符
只能操作一个一个值的操作符叫做<b>一元操作符</b>。
1、递增递减操作符
  有两个版本，前置型和后置型。
  前置型，先操作，后执行。
  后置型，先执行，后操作。
```javascript
let a = 5, b = 6;
let sum = ++a + b;
let sum2 = a++ + b;
console.log(sum); //12
console.log(sum2) //12
console.log(a); //7
```
  递增递减操作符对数值，布尔，字符串，对象都有作用！！！！！
  规则如下：
  
  * 如果字符串包含有效数字，则先转化成数值变量，然后加减1；不包含有效数字，则转化成NaN。字符串变量变成数值变量
  * 数值变量加减1；
  * 布尔变量，true先变成1，false变成0，然后加减1,布尔变了转换成数值变量；
  * 对象变量，先查看valueOf()方法，如果是NaN，则调用toString()，对象转换成数值变量。

2、一元加减操作符。
  一元+操作符，会像Number()方法一样对变量转换成数值变量`var a; a = +a`;
  一元-操作符，主要是变成负数。会像Number()方法一样，不过是负数。

## 位操作符
首先ES里所有的数值都是有64位来储存，但是位操作符并不是操作64位，而是先转化成32位的整数，然后操作，再将结果转换成64位的，这样，NaN和Infinity就会变成0。
对于有符号数，第32位是符号位，0代表正数，1代表负数，符号位决定了其他位数值的格式。剩下31位用来储存数据。
正数都是以二进制格式存储，负数以二进制的补码格式存储。默认情况下，ES里所有的正数都是有符号数。
无符号数，第32位是数值。但是无符号数只能是正数。
位操作符对其他变量，会先用Number()方法变成数值，然后再按位操作。
1、按位非（NOT）
  按位非是用～表示，执行按位非的结果是返回数值的反码。
2、按位与（AND）
  按位与是用&表示，它有两个操作符数，运算的时候，将两个数的二进制每一位对齐，都是1得1，其他为0；
3、按位或（OR）
  按位或是用|表示，它有两个操作符数，运算的时候，将两个数的二进制每一位对齐，都是0得0，其他为1；
4、按位异或（XOR）
  按位或是用^表示，它有两个操作符数，运算的时候，将两个数的二进制每一位对齐，相同得0，不同为1；
5、左移
  左移用&lt;&lt;表示，会将数值所有位数向左移动指定的位数。后面补0；左移不会影响符号。
6、有符号右移
  有符号右移用&gt;&gt;表示，会将数值所有位数向右移动指定的位数。前面补0；保留符号位，不会影响符号。
7、无符号右移
  无符号右移用&gt;&gt;&gt;表示，会将数值所有位数向右移动指定的位数。前面补0；会影响符号。而且会把负数的补码当成二进制码来运算。

## 布尔运算符
布尔运算符有三个，主要用来测试值的关系
1、逻辑非(!)
这个操作符会返回一个布尔值，逻辑非运算会将操作数先转换成布尔值，然后求反。
  * 操作数是对象，返回false
  * 操作数是空字符串，返回true
  * 操作数是非空字符串，返回false
  * 操作数是非0数值，返回false
  * 操作数是0，null，NaN，undefined，返回true
  
2、逻辑与(&&)
逻辑与操作符两边有两个操作数。都是true才为true。
逻辑与操作可以应用于所有变量，在有一个操作数不是布尔值的情况下，逻辑与不一定会返回布尔值。
规则：
  * 如果第一个操作数是对象，则返回第二个操作数
  * 如果第二个操作数是对象，则必须第一个操作数是true才会返回该对象。
  * 如果两个数都是对象，则返回第二个操作数
  * 如果有一个操作数是null，NaN，undefined，则返回null，NaN，undefined。
  
逻辑与属于短路操作，第一个操作数能决定结果，就不会对第二个操作数求值。

3、逻辑或(||)
逻辑或两边有两个操作数，有一个为true就是true。
逻辑或操作可以应用于所有变量，在有一个操作数不是布尔值的情况下，逻辑与不一定会返回布尔值。
规则：
  * 如果第一个操作数是对象，则返回第一个操作数
  * 如果第一个操作数是false，则返回第二个操作数
  * 两个操作数都是对象，则返回第一个操作数
  * 如果两个操作数是null，NaN，undefined，则返回null，NaN，undefined。

## 乘性操作符
ES有三个乘性操作符，乘法，除法和求模。
如果乘性操作符的某一个操作数不是数值，则将会用Number()方法，先转换成数值。
1、乘法(*)
规则：
  * 乘积超过限制，则显示Infinity或者-Infinity
  * 有一个操作数为NaN，结果为NaN
  * Infinity与0相乘，结果是NaN
  * Infinity与非0数相乘，结果是Infinity或者-Infinity
  * Infinity与Infinity相乘，结果是Infinity
  
2、除法(/)
规则：
  * Infinity与Infinity相除，结果是NaN
  * 0/0结果是NaN
  * 其他操作数／0 结果是Infinity或者-Infinity

3、求模(%)
规则：
  * Infinity%操作数 结果是NaN
  * 操作数%0，结果是NaN
  * Infinity%Infinity，结果是NaN
  * 操作数%Infinity，结果是操作数

## 加性操作符
ES中有两个加性操作符，加法和减法
1、加法(+)
规则：
  * 有一个操作数是NaN，结果就是NaN
  * Infinity + Infinity = Infinity
  * -Infinity + -Infinity = -Infinity
  * Infinity + -Infinity = NaN
  * +0 + +0 = +0
  * -0 + -0 = -0
  * +0 + -0 = +0
  * 两个操作数都是字符串，则将字符串拼接起来
  * 只有一个操作数是字符串，另一个操作数则会转换成字符串，然后拼接起来。

2、减法(-)
规则：
  * Infinity - Infinity = NaN
  * -Infinity - -Infinity = NaN
  * Infinity - -Infinity = Infinity
  * -Infinity - Infinity = -Infinity

## 关系操作符
关系操作符有大于(>)，小于(<),小于等于(<=),大于等于(>=)
规则：
  * 都是数值，执行数值比较
  * 都是字符串，执行字符串编码比较
  * 一个是数值，则另一个转换成数值比较

## 相等操作符
ES中提供了两种相等操作符：
相等操作符：先转换再比较
全等操作符：不转换只比较
1、相等操作符(==,!=),强制转型，然后比较。
规则：
  * 如果有一个是布尔类型的操作数，则先转换成数值。
  * 如果有一个是数值，一个是字符串，则将字符串转换成数值
  * 如果有一个是对象，则用valueOf转成基本类型比较
  * null 和undefined 相等
  * 如果有一个操作数是NaN，则==返回false，!=返回true
  * 如果都是对象，则比较两个对象是不是一个对象，是否来指向同一个对象。

2、全等操作符(===,!==),不转换，只比较。
规则：
  * 只要是完全一样就为true，其他为false。

##条件操作符
ES中的条件操作符(?:)
```javascript
variable ? console.log(true): console.log(false);
```
##赋值操作符
其中有+= ，-=，*=，／=，%=，<<=, >>=, >>>=

##逗号操作符
```javascript
var a = 1, b = 2, c = 3;
```