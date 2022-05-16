---
title: Javascript 继承学习
date: 2018-05-08 15:07:28
tags: [Javascript]
categories: Javascript
---
javascript的继承方式有好多方式，之前ES5通过原型链继承，ES6中引入了Class，javascript可以像java一样使用extends关键字继承。现在整理一下js中的继承方式。

<h2>ES5中的继承方式</h2>
<h3>一、构造函数的继承</h3>
现在有一个"动物"对象的构造函数
```javascript
function Animal(){
  this.species = "动物";
}
```
还有一个"猫"对象的构造函数。

```javascript
function Cat(name,color){
  this.name = name;
  this.color = color;
}
```
1.构造函数绑定:使用call或apply方法，将父对象的构造函数绑定在子对象上。

```javascript
function Cat(name,color){
  Animal.apply(this, arguments);
  this.name = name;
  this.color = color;
}
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物
```
此种继承方式只能继承父构造函数中的属性,不能继承父构造函数原型上的属性.Animal.apply(this, arguments)也可用Animal.call(this)替换.cat对象有两个层级,第一级存放着自有属性以及父构造器中的属性,第二级存放着自己函数原型上的属性(Cat.prototype)

2.prototype模式:

```javascript
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物
```
遵循一点，即如果替换了prototype对象，
```javascript
o.prototype = {};
```
那么，下一步必然是为新的prototype对象加上constructor属性，并将这个属性指回原来的构造函数。
```javascript
o.prototype.constructor = o;
```
此种继承方式既能继承父构造函数中的属性,也能继承父构造函数原型上的属性.cat对象有三个层级,第一级存放着自有属性,第二级存放着父构造器的属性(加上constructor,指向创建该对象(cat)的构造器(Cat)),第三级存放着父构造器原型上的属性.

3.直接继承prototype:
第3种方法是对第2种方法的改进。由于Animal对象中，不变的属性都可以直接写入Animal.prototype。所以，我们也可以让Cat()跳过 Animal()，直接继承Animal.prototype。

先将Animal对象改写

```javascript
function Animal(){ }
Animal.prototype.species = "动物";
```
然后，将Cat的prototype对象，然后指向Animal的prototype对象，这样就完成了继承。

```javascript
Cat.prototype = Animal.prototype;
Cat.prototype.constructor = Cat;
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物
```
此种继承方式只能继承父构造器原型上的属性.cat对象有两个层级,第一级存放着自有属性,第二级存放着父构造器原型上的属性(加上constructor,指向创建该对象(cat)的构造器(Cat)).注意:Cat.prototype.constructor = Cat会将Animal.prototype.constructor也改成Cat,从而影响父构造器创建对象

4.空对象作为中介:

```javascript
function extend(Child, Parent) {
  var F = function(){};
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.prototype.constructor = Child;
  Child.uber = Parent.prototype;
}
```
用法：

```javascript
extend(Cat,Animal);
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物
```

此种继承方式只能继承父构造器原型上的属性.cat对象有三个层级,第一级存放着自有属性,第二级存放着临时构造器F的属性(加上constructor,指向创建该对象(cat)的构造器(Cat)),第三级存放着父构造器原型上的属性.注意:临时构造器只充当中介的作用,一般不会有自己的属性.

5.浅拷贝继承:
首先，还是把Animal的所有不变属性，都放到它的prototype对象上。
```javascript
function Animal(){ }
Animal.prototype.species = "动物";
```
然后，再写一个函数，实现属性拷贝的目的。
```javascript
function extend2(Child, Parent) {
  var p = Parent.prototype;
  var c = Child.prototype;
  for (var i in p) {
    c[i] = p[i];
  }
  c.uber = p;
}
```
用法：

```javascript
extend2(Cat, Animal);
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物
```

此种继承方式只能继承父构造器原型上的属性.cat对象有两个层级,第一级存放着自有属性,第二级存放着父构造器原型上的除了constructor和__proto__的属性(不会拷贝原型上的constructor和__proto__属性).适合父构造器原型上的自增属性为基本数据类型的情况.

<h3>二、非构造函数的继承</h3>
比如，现在有一个对象，叫做"中国人"。
```javascript
var Chinese = {
  nation:'中国'
};
```
还有一个对象，叫做"医生"。
```javascript
var Doctor ={
  career:'医生'
}
```
1.object()方法

```javascript
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```
这个object()函数，其实只做一件事，就是把子对象的prototype属性，指向父对象，从而使得子对象与父对象连在一起。
用法：
第一步先在父对象的基础上，生成子对象：
```javascript
var Doctor = object(Chinese);
```
然后，再加上子对象本身的属性：
```javascript
Doctor.career = '医生';
```
这时，子对象已经继承了父对象的属性了。
```javascript
alert(Doctor.nation); //中国
```
2.浅拷贝
除了使用"prototype链"以外，还有另一种思路：把父对象的属性，全部拷贝给子对象，也能实现继承。

就是在做拷贝：
```javascript
function extendCopy(p) {
var c = {};
for (var i in p) { 
  c[i] = p[i];
}
c.uber = p;
return c;
}
```
用法，这样写：
```javascript
var Doctor = extendCopy(Chinese);
Doctor.career = '医生';
alert(Doctor.nation); // 中国
```
样的拷贝有一个问题。那就是，如果父对象的属性等于数组或另一个对象，那么实际上，子对象获得的只是一个内存地址，而不是真正拷贝，因此存在父对象被篡改的可能。

3.深拷贝
所谓"深拷贝"，就是能够实现真正意义上的数组和对象的拷贝。它的实现并不难，只要递归调用"浅拷贝"就行了。
```javascript
function deepCopy(p, c) {
  var c = c || {};
  for (var i in p) {
    if (typeof p[i] === 'object') {
      c[i] = (p[i].constructor === Array) ? [] : {};
      deepCopy(p[i], c[i]);
      } else {
        c[i] = p[i];
      }
    }
  return c;
}
```
使用的时候这样写：
```javascript
var Doctor = deepCopy(Chinese);
```
现在，给父对象加一个属性，值为数组。然后，在子对象上修改这个属性：
这时，父对象就不会受到影响了。
目前，jQuery库使用的就是这种继承方法。

<h2>ES6中的继承方式</h2>
Class 可以通过extends关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。
```javascript
class Point {
  //一些属性
}
class ColorPoint extends Point {
  //一些属性
}
// 等同于
class ColorPoint extends Point {
  constructor(...args) {
    super(...args);
  }
}
```
* 上面代码定义了一个ColorPoint类，该类通过extends关键字，继承了Point类的所有属性和方法。但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个Point类。
* 如果子类没有定义constructor方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有constructor方法。
* 在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，是基于对父类实例加工，只有super方法才能返回父类实例。
* ES6 规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。