---
title: react 16.0 新特性学习
date: 2018-05-09 10:23:39
tags: [Javascript, react]
categories: react
---
## 1、Fragment

新版本的render可以返回数组、字符串、react组件、数字、boolean值
v15.x必须要一个标签来包裹<br>
Before v16
```javascript
return (
        <div>
            <label htmlFor="name">名字：</label>
            <input id="name" type="text" placeholder="请输入名字"/>
            <button>搜索</button>
        </div>
    );
```
When v16.0.0
```javascript
return (
    [
        <label htmlFor="name">名字：</label>,
        <input id="name" type="text" placeholder="请输入名字"/>,
        <button>搜索</button>
    ]
);
```
Now v16.2.0
```javascript
return (
    <React.Fragment>
       <label htmlFor="name">名字：</label>
       <input id="name" type="text" placeholder="请输入名字"/>
       <button>搜索</button>
    </React.Fragment>
);
```
片段(fragments) 可以让你将子元素列表添加到一个分组中，并且不会在DOM中增加额外节点。key 是唯一可以传递给 Fragment 的属性
```javascript
return (
    <dl>
      {props.items.map(item => (
        // 没有`key`，将会触发一个key警告
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
```
简明写法<></>，但是还没有被更多的工具支持，它不支持 键(keys) 或 属性(attributes)。
Further

babel v7.0.0+ , babel-plugin-transform-react-jsx-source or babel-preset-react

```javascript
return (
    <>
       <label htmlFor="name">名字：</label>
       <input id="name" type="text" placeholder="请输入名字"/>
       <button>搜索</button>
    </>
);
```
DOM Fragment

```javascript
const select = document.getElementById('select')
const values = [1, 2, 3]
const fragment = document.createDocumentFragment()
values.map(item => {
    const option = document.createElement('option')
    option.value = item
    option.innerHTML = `小明${item}号`
    fragment.appendChild(option)
})
select.appendChild(fragment)
```
## 2、Portals
Portals是reactjs16提供的官方解决方案，使得组件可以脱离父组件层级挂载在DOM树的任何位置。
普通情况下，组件的render函数返回的元素会被挂载在它的父级组件上。
然而，有些元素需要被挂载在更高层级的位置。最典型的应用场景：当父组件具有overflow: hidden或者z-index的样式设置时，组件有可能被其他元素遮挡，就可以考虑使用Portal使组件的挂载脱离父组件。
组件的挂载点虽然可以脱离父组件，但组件的事件通过冒泡机制仍可以传给父组件。
```javascript
<body>
    <div id="bd"></div>
    <div id="modal"></div>
</body>
```
```javascript
render(
  <App>
    <SearchBox>
      <Modal>
        <div>模态框</div>
      </Modal>
    </SearchBox>
  </App>,
  document.getElementById('bd'),
  () => {
  console.log(arguments)
})
```
```javascript
class App extends Component{
  constructor(options) {
    super(options)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    alert('react component tree propagation!')
  }
  render() {
    return <div className="app" onClick={this.handleClick}>
      {this.props.children}
    </div>
  }
}
```
```javascript
class Modal extends Component {
    constructor(options) {
      super(options)
    }
    render() {
      return createPortal(this.props.children, document.getElementById('modal'))
    }
  }
```
```javascript
<div id="bd">
    <div class="app">
        <label for="name">名字：</label>
        <input type="text" id="name" placeholder="请输入名字">
        <button>搜索</button>
    </div>
</div>
<div id="modal">
    <div>模态框</div>
</div>
```
```
<App>
    <div className="app" onClick=bound handleClick()>
        <SearchBox>
            <labelhtmlFor="name">名字：</label>
            <inputid="name"type="text"placeholder="请输入名字"></input>
            <button>搜索</button>
            <Modal>
                <ReactPortal target=HTMLDivElement{…}>
                    <div>模态框</div>
                </ReactPortal>
            </Modal>
        </SearchBox>
    </div>
</App>
```

Before portals

```javascript
ReactDom.render(reactChild, container, callback)

ReactDom.unmountComponentAtNode(container)


ReactDom.unstable_renderSubtreeIntoContainer(
    context,
    reactChild,
    domNode,
    callback
)

ReactDom.unmountComponentAtNode(container)


render: ReactMount._renderSubtreeIntoContainer(null, reactChild, container, callback )

unstable_renderSubtreeIntoContainer: ReactMount._renderSubtreeIntoContainer(context, reactChild, container, callback)
```

## 3、Error Boundaries

之前react在渲染过程中或者是生命周期内出现了致命的错误，react会从根组件上把所有的组件都卸载下来，以防止展现错误的数据，但这不是最好的用户体验。React 16修复了这一点，引入了Error Boundary的概念，中文译为“错误边界”，当某个组件发生错误时，我们可以通过Error Boundary捕获到错误并对错误做优雅处理。（注：它并不能捕获runtime所有的错误，比如组件回调事件里的错误，可以把它想象成传统的try-catch语句）

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
// 新增了componentDidCatch这个生命周期函数，它可以捕获自身及子树上的错误并对错误做优雅处理，包括上报错误日志、展示出错提示，而不是卸载整个组件树。
  componentDidCatch(error, info) {
    // 错误代理组件的展示与否
    this.setState({ hasError: true });
    // 在这里我们可以对错误进行记录
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // 在这里我们可以书写自己想要展示的ui组件
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```
上面的组件是当页面中有错误时我们想要展示的效果，具体用法如下:
```javascript
render(){
  return (
    <div>
      <ErrorBoundary>    // 外层组件我们定义的错误组件
        <Profile user={this.state.user} />     // 内层组件是我们将要监视的自定义组件
      </ErrorBoundary>
      <button onClick={this.onClick}>Update</button>
    </div>
  )
}
```

这个组件能够不仅仅能够监听到本组件的错误，连同它下面的子组件的错误也可以监听到

###不能捕获的错误

 - 事件处理 
 - 异步回调 
 - 服务端渲染 
 - error boundary组件自身抛出的错误（只能由父级捕获）
###**react遇到未捕获的错误会怎么办**
对 React16 来说，一个未捕获的错误会导致整个应用不能被挂载

## 4、setState传入null时不会再触发更新

之前的setState不管传入什么只要调用了这么方法就会渲染
```javascript
selectCity(e){
  const newValue = e.target.value;
  this.setState((state)=>{
    if(state.city===newValue){
      return null;
    }
    return {city:newValue}
  })
)
```
## 5、v16.0支持自定义的dom属性

之前的版本对于自定义属性react会在属性前加上data-**来进行处理，现在对于部分属性去除了这种写法，拥抱了原生dom，这样可以减少react的代码，提升了性能

## 6、其他

更好的服务器端渲染：React 16的SSR被完全重写，新的实现非常快，接近3倍性能于React 15，现在提供一种流模式streaming，可以更快地把渲染的字节发送到客户端。

react v16采用了最新的技术“Fiber.”

React Server Side Rendering 解决 SPA 应用的 SEO 问题