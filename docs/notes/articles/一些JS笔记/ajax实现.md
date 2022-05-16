---
title: ajax实现
date: 2018-05-16 11:18:33
tags: [Javascript]
categories: Javascript
---
Q1: 何谓ajax，它有何优点？
A1:AJAX = 异步 JavaScript 和 XML。AJAX 是一种用于创建快速动态网页的技术。通过在后台与服务器进行少量数据    交换，AJAX 可以使网页实现异步更新

Q2:ajax 如何实现？
A2: 
步骤：(1)创建XMLHttpRequest对象,也就是创建一个异步调用对象.
     (2)创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息.
     (3)设置响应HTTP请求状态变化的函数.
     (4)发送HTTP请求.
     (5)获取异步调用返回的数据.
     (6)使用JavaScript和DOM实现局部刷新.

  代码实现：

```HTML
  <html>
    <head>
      <title>AJAX实例</title>
      <script language="javascript" type="text/javascript">    
        var xmlHttpRequest;  //定义一个变量用于存放XMLHttpRequest对象
        //定义一个用于创建XMLHttpRequest对象的函数
        function createXMLHttpRequest(){
          if(window.ActiveXObject){
            //IE浏览器的创建方式
            xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
          }else if(windew.XMLHttpRequest){
            //Netscape浏览器中的创建方式
            xmlHttpRequest = new XMLHttpRequest();
          }
        }
        //响应HTTP请求状态变化的函数
        function httpStateChange(){
          //判断异步调用是否完成
          if(xmlHttpRequest.readyState == 4){
            //判断异步调用是否成功,如果成功开始局部更新数据
            if(xmlHttpRequest.status == 200||xmlHttpRequest.status == 0){
              //查找节点
              var node = document.getElementById("myDIv");
              //更新数据
              node.firstChild.nodeValue = xmlHttpRequest .responseText;
            }else{
              //如果异步调用未成功,弹出警告框,并显示出错信息
              alert("异步调用出错/n返回的HTTP状态码为:"+xmlHttpRequest.status + "/n返回的HTTP状态信息为:" + xmlHttpRequest.statusText);
            }
          }
        }
        //异步调用服务器段数据
        function getData(name,value){                   
          //创建XMLHttpRequest对象
          createXMLHttpRequest();
          if(xmlHttpRequest!=null){
            //创建HTTP请求
            xmlHttpRequest.open("get","ajax.text",true)
            //设置HTTP请求状态变化的函数
            xmlHttpRequest.onreadystatechange = httpStateChange;
            //发送请求
            xmlHttpRequest.send(null);
          }
        }
      </script>
    </head>
    <body>
      <div id="myDiv">原数据</div>
      <input type = "button" value = "更新数据" onclick = "getData()">
    </body>
  </html>
```