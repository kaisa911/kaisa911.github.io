(window.webpackJsonp=window.webpackJsonp||[]).push([[85],{660:function(n,t,l){"use strict";l.r(t);var e=l(17),s=Object(e.a)({},(function(){var n=this,t=n.$createElement,l=n._self._c||t;return l("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[l("p",[n._v("这个问题是一个比较经典的问题，答案如下：\n1、浏览器的地址栏输入URL并按下回车。\n2、浏览器查找当前URL是否存在缓存，并比较缓存是否过期。\n3、DNS解析URL对应的IP。\n4、根据IP建立TCP连接（三次握手）。\n5、发起HTTP请求。\n6、服务器处理请求，浏览器接收HTTP响应。\n7、渲染页面，构建DOM树。\n8、关闭TCP连接（四次挥手）。")]),n._v(" "),l("ul",[l("li",[n._v("缓存，通过cache-control来控制。")]),n._v(" "),l("li",[n._v("DNS解析是指把域名URL转成对应的ip")]),n._v(" "),l("li",[n._v("TCP连接\n　　在通过第一步的DNS域名解析后，获取到了服务器的IP地址，在获取到IP地址后，便会开始建立一次连接，这是由TCP协议完成的，主要通过三次握手进行连接。\n　　第一次握手： 建立连接时，客户端发送syn包（syn=j）到服务器，并进入SYN_SENT状态，等待服务器确认；\n　　第二次握手： 服务器收到syn包，必须确认客户的SYN（ack=j+1），同时自己也发送一个SYN包（syn=k），即SYN+ACK包，此时服务器进入SYN_RECV状态；\n　　第三次握手： 客户端收到服务器的SYN+ACK包，向服务器发送确认包ACK(ack=k+1），此包发送完毕，客户端和服务器进入ESTABLISHED（TCP连接成功）状态，完成三次握手。\n　　完成三次握手，客户端与服务器开始传送数据。")])]),n._v(" "),l("p",[n._v("三次握手，如果某一次握手莫名的失败，tcp会把同样的包再发送一次")]),n._v(" "),l("ul",[l("li",[l("p",[n._v("浏览器向服务器发送HTTP请求\n　　完整的HTTP请求包含请求起始行、请求头部、请求主体三部分。")])]),n._v(" "),l("li",[l("p",[n._v("渲染页面包括：解析和渲染，生成DOM树和CSSOM树。")])])])])}),[],!1,null,null,null);t.default=s.exports}}]);