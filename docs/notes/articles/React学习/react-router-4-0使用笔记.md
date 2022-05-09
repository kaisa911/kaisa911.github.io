---
title: react-router 4.0使用笔记
date: 2018-07-23 13:51:44
tags: react-router
categories: react
---

最近项目里的 react-router 从 3.0 更新到了 4.0，重新学习了一下 react-router 的东西，感觉从 3 到 4，变化还是很多的。通过[react-router 4.0 中文文档](http://reacttraining.cn/)和一些其他的教程，大概学会了如何使用。记下来防止以后忘记了。。

v3 的时候，是把所有的路由都写在一个地方，通常就是组件和路由分开。
到了 v4，路由就变成了一个和 UI 组件并列的组件，在你需要的地方把路由组件写在合适的地方。不在需要用<Route />组件的嵌套来实现路由嵌套。

## exact

exact 关键字，可以让路由只匹配一个 path，path 为'/'的路由将不会匹配'/xxx'的

## Switch

可以使用 Switch 组件，来启用排他性的路由。

```javascript
<Switch>
  <Route path="/" exact component={Home} />
  <Route path="/about" component={About} />
  <Route path="/user" component={User} />
</Switch>
```

## 嵌套路由

如果需要嵌套路由，在 app 组件中可以把嵌套路由的父组件<Route path='/xx' component={xxx}> />，在 xxx 组件中，在根据父组件来匹配路由。

```javascript
class XXX extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { history, match } = this.props;
    return (
      <Layout>
        <Layout.Content style={{ padding: "0 50px" }}>
          <div style={{ background: "#fff", padding: 24 }}>
            <Divider />
            <Route
              exact
              path={`${match.path}/loan-info`}
              component={LoanInfo}
            />
            <Route exact path={`${match.path}/img-info`} component={ImgInfo} />
            <Route exact path={`${match.path}`} component={LoanInfo} />
          </div>
        </Layout.Content>
      </Layout>
    );
  }
}
```

## withRouter

想通过代码跳转子路由，可以用 withRouter,包装 react 组件,让它获得 history 属性

```javascript
import { withRouter } from "react-router";
withRouter(MyComponent);
```

然后用`this.props.history`来跳转。
