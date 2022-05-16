---
title: TypeScript开发实战笔记(二)
date: 2021-1-06 14:42:31
tags: [TypeScript]
categories: TS学习
---

## 9、范型

不预先确定的数据类型，具体的类型在使用的时候才能知道

```javascript
function log<T>(value: T): T {
  console.log(value);
  return value;
}
```

调用范型函数的时候，可以在函数名后面添加类型，也可以直接让 ts 类型推断直接写 
1）也可以定义一个范型函数类型

```javascript
type Log = <T>(value: T) => T;
let myLog: Log = log;
```

2）范型接口范型接口在使用的时候，必须指定范型的类型

```javascript
interface Log {
  <T>(value: T): T;
}
let myLog: Log<number> = log;
```

3）范型类把范型变量放到类的后面，就可以约束类了，就变成范型类了范型不能应用于类的静态成员。在实例化类的时候，如果显式的声明范型的类型，那类里面的函数就受该范型类型的约束。如果不显式的声明范型类型，类里的方法的参数类型就可以是任意类型
4）范型约束

```javascript
interface Length {
  length: number
}
function log<T extends Length>(value: T): T {
  console.log(value，value.length);
  return value
}
```

这样代表，T 不再是任何类型都可以了，必须得有 length 属性才可以。范型的好处：

- 函数和类可以轻松的支持多种类型，增强程序的扩展性
- 不必写多条函数重载，冗长的联合类型声明，增强代码可读性
- 灵活控制类型之间的约束

## 10、类型检查机制

类型检查机制：TypeScript 编译器在做类型检查时，所秉承的一些原则，以及表现出的一些行为作用：辅助开发，提升开发效率
1）类型推断不需要指定变量的类型（函数的返回值类型），TS 会根据某些规则，自动的为其推断出一个类型

- 基础类型推断，从右到左的类型推断，根据值的类型，来给变量推断类型
- 最佳通用类型推断
- 上下文类型推断，从左到右的推断，根据前面的事件类型，来推断出参数的类型等 

2）类型兼容性当一个类型 Y 可以赋值给另一个类
  型 X 的时候，我们就可以说，类型 X 兼容类型 Y X 兼容 Y：X（目标类型）= Y （源类型）类型兼容性的例子，广泛的存在于接口，函数，类中

- 接口，如果 Y 接口含有 X 类型的所有属性，那么 Y 就可以赋值给 X，源类型必须具备目标类型的必有属性，就可以兼容，接口之间
  兼容，就要接口成员少的兼容接口成员多的
- 函数，通常发生于函数位于参数的时候，类似 HOF，
  - 参数个数
    - 固定参数，目标函数的参数个数，一定要多于源函数的参数个数
    - 可变参数，1、固定参数可以兼容可选参数和剩余参数 2、可选参数是不兼容固定参数和剩余参数的，可以通过修改
      strictFunctionTypes 为 false 来兼容 3、剩余参数可以兼容固定参数和可选参数
  - 参数类型，参数类型一定要匹配，参数成员多的兼容参数成员少的
  - 返回值类型，目标函数的返回值类型要与源函数的返回值相同或者为其子类型才能兼容
- 枚举类型，枚举和数字类型完全兼容，枚举和枚举之间完全不兼容
- 类的兼容下，和接口类似，静态成员和构造函数不相互比较，类中有私有成员，则就不兼容，除非父类和子类。
- 范型，如果两个范型函数没有定义类型，就可以兼容，如果两个范型接口，没有定义成员属性，也可以兼容
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20210106143953510.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQ2Mjc4MDc=,size_16,color_FFFFFF,t_70)

3）类型保护 TypeScript 能够在特定的区块中，保证对象属于某种特定的类型，可以在此区块中，放心的引用此类型的属性和调用该类
型的方法。创建这种区块的方法，

- 是使用 instanceof 关键字，针对类
- 使用 in 关键字，针对对象
- typeof 类型保护
- 类型保护函数

```javascript
function isJava(lang: Java | JavaScript): lang is Java {
	return (lang as java).hasJava !== undefined
}
```

## 11、高级类型

1）交叉类型，将多个类型合并成一个类型，新类型具有以前类型的所有特性，用&符号连接 
2）联合类型，声明的类型并不确定，是多个类型中的一个 字面量联合类型，约束了变量只能取几个类型中的一个对象的联合类型，只能访问公有类型索引类型

- keyof T
- T[k]
- T extends U

```javascript
function getValues<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map(key =>obj[key]);
}
```

3）映射类型比如，Partial，Readonly，Require 等条件类型

```javascript
T extends U ? X : Y
```

4）分布式条件类型

```javascript
(A | B) extends U ? X : Y
A extends U ? X : Y | B extends U ? X : Y
```

## 12、命名空间

用 namespace 来声明命名空间和模块不要混用，不要在模块中使用命名空间。命名空间最好在全局中使用

## 13、声明合并

1、接口的声明合并

- 接口的非函数成员必须保证唯一性，如果不唯一，必须类型相同
- 同名函数就变成函数重载，在实现的时候，需要确定一个更宽泛的类型

2、命名空间的合并

- 命名空间中导出的成员，是不可以重复定义的
- 命名空间和类合并
- 命名空间和枚举类型合并
- 命名空间和函数合并
- 命名空间和其他一起合并，必须放在类，函数的后面
