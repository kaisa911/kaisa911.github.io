---
title: TypeScript开发实战笔记(一)
date: 2021-1-04 17:49:26
tags: [TypeScript]
categories: TS学习
---

## 1、什么是 TypeScript？

一个拥有类型系统的 JavaScript 超集，可以编译成纯 JavaScript。三个要点：

- 类型检查，严格的类型检查，在编译阶段发现问题，不必把问题带到线上
- 语言扩展，包含 ES6 及未来提案中的特性，也从其他语言借鉴特性，比如接口和抽象类
- 工具属性，可以编译成纯 JavaScript，可以在任何浏览器上运行，更像一个工具

## 2、为什么要使用 TypeScript？

- 更好的 IDE 支持，比如 VS Code 的自动补全，导航和重构功能，使得接口定义可以代替文档，
- 可以提升效率，降低维护成本
- 可以构建类型思维，从代码的编写者蜕变成代码的设计者

## 3、静态类型语言和动态类型语言

- 静态类型语言：在编译阶段确定所有变量的类型
- 动态类型语言：在执行阶段确定所有变量的语言
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20210104173011606.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQ2Mjc4MDc=,size_16,color_FFFFFF,t_70)

## 4、TypeScript 的数据类型

除了 ES6 包含的数据类型，TypeScript 又新增了

- void
- any
- never
- 元组： 特殊的数组类型，限制了数组的元素的类型和数量
- 枚举
- 高级类型

1）类型注解：相当于强类型语言中的类型声明。 
2）联合类型，通过一个竖线来分开 
3）元组越界问题，设置好的元组，可以通过 push方法给元组新增元素，元素也可以被添加到元组中，但是在访问的时候报错  
 4）一个变量被声明为 undefined/null 类型，就不能再赋值
其他类型，只能被赋值为它本身。 但是 undefined/null 类型是所有类型的子类型，是可以赋值给其他类型的，可以通过
tsconfig.json 里的 strictNullChecks 设置成 false 来实现 
5）在 JavaScript 中，void 是一个操符，可以让任何表达式返回
undefined，比如最简单的返回 undefined 的方式是 void 0，而且 undefined 不是一个保留字，可以通过设置一个 undefined 变量来
覆盖全局的 undefined 变量。在 TypeScript 中，void 类型就是指，没有任何返回值的类型。
6）没有声明的变量就是 any 类型
7）never 是指永远不会有返回值的类型
 8）枚举类型，就是一组有名字的常量集合
 9）枚举类型分为：

- 数字枚举和字符串枚举，数字枚举的实现原理是反向映射，成员名称分别作为 key 和 value
- 字符串枚举，只有成员名称当做了 key，
- 异构枚举，包含数字枚举和字符串枚举，不推荐使用 

10）枚举成员的值是一个只读类型，不能修改枚举成员的类型分为 2 类
- 常量枚举，会在编译的时候计算出结果，以常量的形式出现在运行环境
  - 没有初始值的情况
  - 对已有枚举成员的引用
  - 常量表达式
- 需要被计算的枚举成员：一些非常量的表达式，不会再编译时计算，会在运行时计算。（在 computed member 成员后面的枚举成员，
  一定要有一个初始值，否则会报错）

11）常量枚举，用 const 声明的枚举类型为常量枚举，会在编译之后被删除作用： 当我们不需要一个对象，而只需要对象的值的时候，
就可以声明常量枚举，减少我们在编译环境的代码 
12）枚举类型：两种不同类型的枚举，是不可以进行比较的。

## 5、对象类型接口

接口可以用来约束对象，函数，类的一种结构，是代码协作的契约类型断言 x as string 明确的告诉编译器，这个 x 就是一个 string
类型，字符串索引签名

```typescript
interface result {
  name: string;
  age: number;
  [x: string]: any; // 字符串索引签名
}
```

接口成员的属性：

- 可选属性：？
- 只读属性：readonly name：string

不能知道接口的属性的数目，就可以使用，可索引类型的接口

```javascript
interface StringArray {
  [index: number]: string;
}
interface Names {
  [x: string]: string;
}
// 混用
interface Person {
  [x: string]: string;
  [y: number]: string; // 数字类型的属性值的类型一定要是string类型的子类型，js会进行类型转换
}
```

接口定义函数

```javascript
let add = (x: number, y: number) => number;

interface Add {
  (x: number, y: number): number;
}
// 类型别名
type Add = (x: number, y: number) => number;
```

类型别名，就是为这个类型起一个名字

混合类型接口

```javascript
interface Lib {
  (): void;
  version: string;
  dosomething(): void;
}

let lib: Lib = (() => {}) as Lib;
lib.version = '1.0.0';
lib.dosomething = () => {}
// 👆是一个lib单例，如果想生成多个lib，可以写一个函数
let createLib = () => {
  let lib: Lib = (() => {}) as Lib;
  lib.version = '1.0.0';
  lib.dosomething = () => {};
  return lib;
}
```

## 6、函数类型接口

1）在 TS 中，函数的形参合实参必须一一对应，可选参数必须在必选参数之后。且参数可以设置默认值，在必选参数之前，默认参数不可省略，必须传入 undefined 才能获取到其默认值。剩余参数…rest, 剩余参数是以数组方式来处理的 
2）函数重载：如果一个函数，函数名一样，参数个数不一样，就实现了一个函数重载。 TS 的函数重载，要求先定义一系列的函数声明，然后在一个类型最宽泛的声明中实现这个函数

```javascript
function add(...rest: number[]): number;
function add(...rest: string[]): string;
function add(...rest: any[]): any {
  let first = rest[0]
  if (typeof first === 'string') {
    return rest.join('');
  }
  if (typeof first === 'number') {
  	return rest.reduce((pre, cur) => pre + cur, 0)
  }
};
```

TS 在处理函数重载的时候，回去查询一个列表，就是上面定义的函数声明的列表，会从第一个开始匹配。

## 7、TS 中的类

1）无论在 TS 还是在 ES 中，类成员的属性都是实例属性，不是原型属性。类成员的方法都是原型方法 
2）在 TS 中，实例的属性必须有初始值或者在构造函数中有默认值 
3）类的继承，使用 extends 关键字，必须在子类里的构造函数中调用 super()，并在 super 后再使用 this 
4）类的成员修饰符

- public，默认属性都是 public
- private，私有属性，只能在类的本身被调用，不能被类的子类和实例调用，给构造函数添加 private 属性，就会使这个类既不能被实
  例化也不能被继承
- protected，只能在类和子类中使用，不能在实例中使用，构造函数添加 protected 属性，就会使这个类不能被实例化，只能用于继承
  ，这就声明了一个抽象类。
- readonly，只读属性不可更改，必须初始化
- static，静态属性，只能由类名来调用，不能通过实例来调用

除了类的成员可以添加修饰符以外，构造函数的参数也能添加修饰符。这样会使参数自动变为实例的属性

5）抽象类：只能用于继承，不能用于实例化的类。使用 abstruct 来修饰类名。可以在抽象类里添加一个抽象方法，不具体实现该方法。抽象类呢，用于抽离代码的共性，有利于代码的复用。
6）多态：使用抽象类的抽象方法，可以实现不同的类里面不同的方法的绑定。
7）this 类型，类的成员类型，可以返回一个 this，这样就可以很容易实现链式调用。在子类中的成员方法也返回 this 时，在实例化
的时候就可以形成一个多态，该 this 既可以调用子类里的方法，也可以调用父类里的方法。

## 8、类和接口的关系

1）接口可以约束类的成员类型

```javascript
interface Human {
  name: string;
  eat(): void;
}

class Asian implements Human {
  constructor(name: string) {
    this.name = name;
  }
  name: string;
  eat() {}
}
```

- 类实现接口的时候，必须实现接口中所有的属性。
- 接口只能约束类的公有成员
- 接口不能约束类的构造函数

2）接口的继承，使用 extends 继承，继承接口时，多个接口时，用逗号分开，继承类时，使用该接口的类需要有类的属性接口在抽离
  类的成员的时候，会把 public，private 和 protected 成员都抽离出来
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20210105094243197.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQ2Mjc4MDc=,size_16,color_FFFFFF,t_70)
