---
title: Javascript 继承学习
date: 2020-04-01 15:07:28
tags: [Javascript]
categories: Javascript
---

JavaScript的类型转换，分为隐式转换和显式转换。

## 显示转换

JavaScript有一些方法，可以强制的转换变量的类型

* Number()
* parseInt()
* parseFloat()
* String()
* Boolean()
* obj.toString()

这些方法会在接收一个或几个参数，把不同类型的变量变成其他类型。

## 隐式转换：
JavaScript这种弱类型语言，在处理四则运算、==、比较运算符等运算的时候，会有隐式的转换变量的类型，

### 1、四则运算

* 当加法运算时，其中一方是字符串类型，就会把另一个也转为字符串类型，并且加法运算会触发三种类型转换：将值转换为原始值，转换为数字，转换为字符串。
* 其他运算只要其中一方是数字，那么另一方就转为数字
```js
1 + '1' // '11'
2 * '2' // 4
[1, 2] + [2, 1] // '1,22,1'
// [1, 2].toString() -> '1,2'
// [2, 1].toString() -> '2,1'
// '1,2' + '2,1' = ‘1,22,1'

注意这个表达式 'a' + + ‘b’ // 'aNaN'
```

### 2、== 运算

比较x==y

1. 若type(x)和type(y)相同
    a. 若type(x)为Undefined，返回true
    b. 若type(x)为Null， 返回true
    c. 若type(x)为Number，则：
      * 若x为NaN， 返回false
      * 若y为NaN，返回false
      * 若x和y数值相等，返回true
      * 若x=-0，y=+0，返回true
      * 若x=+0，y=-0，返回true
      * 其他返回false

    d. 若type(x) 为String，则当且仅当x和y为完全相等的字符序列时返回true，否则返回false
    e. 若type(x)为 Boolean，则x和y同为true或同为false时返回true，其他返回false
    f. 若type(x)为Object时，则引用同一个对象时返回true，否则返回false
2. 若x为undefined，y为null，返回true，反之亦成立。
3. 若type(x)为Number，type(y)为String，则比较 x==Number(y)
4. 若type(x)为String，type(y)为Number，则比较Number(x)==y
5. 若type(x)为Boolean，则比较Number(x)==y
6. 若type(y)为Boolean，则比较x==Number(y)
7. 若type(x)为String，type(y)为Object，则比较x==y.toPrimitive()
8. 若type(x)为Number，type(y)为Object，则比较x==y.toPrimitive()
9. 若type(x)为Object，type(y)为String，则比较x.toPrimitive()==y
10. 若type(x)为Object，type(y)为Number，则比较x则比较x.toPrimitive()==y11. 返回false
toPrimitive 就是对象转基本类型

比如有一些奇怪的隐式转换

```js
eg1:[] == ![] // -> true

// [] 转成 true，然后取反变成 false
[] == false
// 根据第 8 条得出
[] == ToNumber(false)
[] == 0
// 根据第 10 条得出
ToPrimitive([]) == 0
// [].toString() -> ''
'' == 0
// 根据第 6 条得出
0 == 0 // -> true
```

```js
eg2: 'a' == true // -> false
     'b' == false // -> false

// 根据第6条得出
'a' == 1
'b' == 0
// 根据第4条得出
Number('a') == 1 -> NaN == 0
Number('b') == 0 -> NaN == 0

最后得出两个false
```

```js
null == undefined // true
null == false // false
undefined == false // false
'0' == false // true
[] == 0 // true
[] == true // false
[] == false // true
[2] == 2 // true 
['0'] == false // true 
'0' == false // true 
[null] == 0 // true 
null == 0 // false 
[null] == false // true 
[undefined] == false // true 
undefined == false // false
{} == !{} // false
{} == {} // false
```

3、关系和逻辑运算符
关系运算符：会把其他类型的数据转换成数字再比较大小
```js
'2’ > 10 // false
'2'>'10' // true 都是字符串，会按照unicode方式转成其charCodeAt(‘2’) > charCodeAt(‘10’)
'abc' > 'b' // false 同上
```
