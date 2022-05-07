---
title: react 相关知识整理
date: 2018-12-11 13:50:22
tags: [Javascript, react]
categories: 面试锦囊
---

整理一下脑图里关于 react 的相关的知识。

## react 的思想

### Just The UI

react 只是一个 UI 库，可以当作一个模板引擎，用在各种 mv\*的框架中作为 view 层

### Virtual DOM

#### 什么是 Virtual DOM

在 React 中，render 执行的结果得到的并不是真正的 DOM 节点，而是轻量级的 JavaScript 对象，我们称之为 virtual DOM。

#### Virtual DOM 为什么能提高性能

react 在内存中维护 virtual DOM 来处理我们数据的改变，通过 diff 算法，得到一个 patch，然后将这个 patch 放到一个队列里，然后批量的更新这些 patch 到真实 DOM 里。

真实 DOM 的的工作流程：
大致分 5 步：创建 DOM tree –> 创建 Style Rules -> 构建 Render tree -> 布局 Layout –> 绘制 Painting
操作 DOM，浏览器会从构建 DOM 树开始从头到尾执行一遍流程。然而 DOM 的批量操作不会被合并，只会第一个 DOM 操作处理完之后再重新从构建 DOM 树开始第二个操作，一直到最后一个操作结束。

Virtrual DOM 的工作流程：
Virtrual DOM 会对批量的操作合并到 Virtrual DOM 树上，然后根据 diff 算法，查看哪一部分发生了变化，然后将 diff 的内容保存到本地的一个 js 对象里，然后这个对象再 attach 到 DOM 树上，通知浏览器重新绘制。

#### diff 算法

React 通过制定大胆的策略，将 O(n^3) 复杂度的问题转换成 O(n) 复杂度的问题。

**diff 策略**
1、Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。
2、拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构。
3、对于同一层级的一组子节点，它们可以通过唯一 id 进行区分。

基于以上三个前提策略，React 分别对 tree diff、component diff 以及 element diff 进行算法优化，事实也证明这三个前提策略是合理且准确的，它保证了整体界面构建的性能。

- **tree diff**
  基于策略一，React 对树的算法进行了简洁明了的优化，即对树进行分层比较，两棵树只会对同一层次的节点进行比较。
  React 通过 updateDepth 对 Virtual DOM 树进行层级控制，只会对相同颜色方框内的 DOM 节点进行比较，即同一个父节点下的所有子节点。当发现节点已经不存在，则该节点及其子节点会被完全删除掉，不会用于进一步的比较。这样只需要对树进行一次遍历，便能完成整个 DOM 树的比较。
- **component diff**
  React 是基于组件构建应用的，对于组件间的比较所采取的策略也是简洁高效。
  如果是同一类型的组件，按照原策略继续比较 virtual DOM tree。
  如果不是，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点。
  对于同一类型的组件，有可能其 Virtual DOM 没有任何变化，如果能够确切的知道这点那可以节省大量的 diff 运算时间，因此 React 允许用户通过 shouldComponentUpdate() 来判断该组件是否需要进行 diff。
- **element diff**
  当节点处于同一层级时，React diff 提供了三种节点操作，分别为：INSERT_MARKUP（插入）、MOVE_EXISTING（移动）和 REMOVE_NODE（删除）。
  INSERT_MARKUP，新的 component 类型不在老集合里， 即是全新的节点，需要对新节点执行插入操作。
  MOVE_EXISTING，在老集合有新 component 类型，且 element 是可更新的类型，generateComponentChildren 已调用 receiveComponent，这种情况下 prevChild=nextChild，就需要做移动操作，可以复用以前的 DOM 节点。
  REMOVE_NODE，老 component 类型，在新集合里也有，但对应的 element 不同则不能直接复用和更新，需要执行删除操作，或者老 component 不在新集合里的，也需要执行删除操作。

### Data Flow

单向数据流，只需要关心从数据怎么得出界面就行。由数据驱动页面的方式，可以轻松让用户界面和数据保持一致。
更新 DOM 的数据总是从顶层流下来，用户事件不直接操作 DOM，而是操作顶层数据

## react 解决了前端哪些痛点

1、组件化，模块化 ：react 组件化，和基于 webpack 可以使用 Es6 或 CommonJs 的写法实现模块化代码
2、开发效率：React 的代码基本就是组件的组合，分而治之的方式让代码的可阅读性很高，容易理解
3、运行效率：React 使用 Virtual DOM，通过 diff 算法，更新特定的 dom，加快了效率
4、可维护性：维护性强
5、用户体验：spa

## react 生命周期

### react 完整的生命周期

react 的生命周期包括：
![react生命周期](https://github.com/kaisa911/studyNotes/blob/master/public/image/react-lifecycle.jpg?raw=true)

### 数据请求

react 在 16.3 中，将 componentWillMount 标为不安全的生命周期函数，所以需要在 componentDidMount 里面获取数据。
**为什么不在 constructor？**
constructor 被调用是在组件准备要挂载的最一开始，所以此时组件尚未挂载到网页上，而且在未渲染的时候，数据获取到也不会存在。

### 性能优化

shouldComponentUpdate ：
组件接受到新属性或者新状态的时候（可以返回 false，接收数据后不更新，阻止 render 调用，后面的函数不会被继续执行了）

这个方法用来判断是否需要调用 render 方法重新描绘 dom。因为 dom 的描绘非常消耗性能，如果我们能在 shouldComponentUpdate 方法中能够写出更优化的 dom diff 算法，可以极大的提高性能。

## JSX 相关

### JSX 怎么被浏览器认识

JSX 是 React 对 JS 语法的拓展，需要编译后才能正确使用它，JSX 的构建非常简洁明

JSX 是需要编译才能被浏览器识别的，它就是被 Babel 编译的，具体说来是被 babel-preset-react 来编译的。不过 Babel 的最主要目的其实并非编译 JSX，Babel 应该算是一个编译平台，其主要目的是转换你在代码中使用了的 ES6 甚至 ES7 语法为浏览器识别的 ES5 语法（babel-core,babel-preset-es2015 模块）。

Babel 转译器会把 JSX 转换成一个名为 React.createElement() 的方法调用。

本质上来讲，JSX 只是为 React.createElement(component, props, ...children) 方法提供的语法糖。

```js
const element = <h1 className="greeting">Hello, world!</h1>;
const element = React.createElement('h1', { className: 'greeting' }, 'Hello, world!');
```

### JSX 组件的首字母为什么要大写

当元素类型以小写字母开头时，它表示一个内置的组件，
如 `<div>` 或 `<span>`，并将字符串 ‘div’ 或 ‘span’ 传 递给 React.createElement。 以大写字母开头的类型，如 <Foo /> 编译为 React.createElement(Foo)，并它正对应于你在 JavaScript 文件中定义或导入的组件。

## 函数绑定 this

react 中函数绑定 this 有那么几种方法：
1、箭头函数
不管是在类里面，还是在 render 里面，都可以用箭头函数，箭头函数会自动绑定 this。

2、在构造函数里绑定 this

3、在 render 里用.bind(this)

```js
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick3 = this.handleClick.bind(this);
  }
  handleClick() {
    console.log('this > ', this);
  }
  handleClick2 = () => {
    console.log('this > ', this);
  }
  handleClick3() {
    console.log('this > ', this);
  }
  handleClick4() {
    console.log('this > ', this);
  }
  render() {
    return (
      <div onClick={this.handleClick.bind(this)}>test</div>
      <div onClick={this.handleClick2}>test2</div>
      <div onClick={this.handleClick3}>test3</div>
      <div onClick={e=>handleClick4(e)}>test4</div>
    )
  }
}

```

## 组件

### 组件的三种定义方法

1、纯函数组件

```js
function HelloComponent(props /* context */) {
  return <div>Hello {props.name}</div>;
}
```

2、使用 React.createClass 创建组件

```js
const InputControlES5 = React.createClass({
  propTypes: {
    //定义传入props中的属性各种类型
    initialValue: React.PropTypes.string
  },
  defaultProps: {
    //组件默认的props对象
    initialValue: ''
  },
  // 设置 initial state
  getInitialState: function() {
    //组件相关的状态对象
    return {
      text: this.props.initialValue || 'placeholder'
    };
  },
  handleChange: function(event) {
    this.setState({
      //this represents react component instance
      text: event.target.value
    });
  },
  render: function() {
    return (
      <div>
        Type something:
        <input onChange={this.handleChange} value={this.state.text} />
      </div>
    );
  }
});
```

3、使用 ES6 的类，继承 React.Component 来创建组件

```js
class InputControlES6 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.initialValue || 'placeholder'
    };
  }

  handleChange = event => {
    this.setState({
      text: event.target.value
    });
  };

  render() {
    return (
      <div>
        Type something:
        <input onChange={this.handleChange} value={this.state.text} />
      </div>
    );
  }
}
```
