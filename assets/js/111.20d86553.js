(window.webpackJsonp=window.webpackJsonp||[]).push([[111],{687:function(s,t,a){"use strict";a.r(t);var e=a(17),r=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("p",[s._v("整理一下前一段时间研究科学上网的方法。\n"),a("b",{staticStyle:{"font-size":"20px"}},[a("i",[s._v("科学上网需要购买国外的服务器, 会有一定的花费, 请自行判断"),a("i")])])]),s._v(" "),a("h2",{attrs:{id:"购买服务器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#购买服务器"}},[s._v("#")]),s._v(" 购买服务器")]),s._v(" "),a("p",[s._v("科学上网是通过 VPS，搭建 ss 或者 ssr 服务器（梯子）来实现的。\nvps 服务器需要选择国外的（毕竟要翻墙）。一般都会在搬瓦工或者 vultr 购买服务器。\n我是看了同事在 vultr 买的，我也就在这里买的,感觉还不错，能够随时改变和删除服务器。\n网站："),a("code",[s._v("https://www.vultr.com/")])]),s._v(" "),a("p",[s._v("1、注册账号\n"),a("img",{attrs:{src:"https://github.com/kaisa911/studyNotes/blob/master/public/image/zhucezhanghao.png?raw=true",alt:"注册账号"}}),s._v("\n2、充值\n因为可以用支付宝，我就选择了支付宝支付。\n"),a("img",{attrs:{src:"https://github.com/kaisa911/studyNotes/blob/master/public/image/chongzhi.png?raw=true",alt:"充值"}}),s._v("\n3、购买服务器\nvultr 官方最近进行了调整，2.5 美元套餐只提供 ipv6，可以用来上 BT，教育网等，但是不能实用 ipv4 的流量，如果你有 ipv4 需求，那么你至少要买 5 美元的套餐。\n3.1 选择地区\n"),a("img",{attrs:{src:"https://github.com/kaisa911/studyNotes/blob/master/public/image/fuwuqi01.png?raw=true",alt:"选择地区"}}),s._v("\n3.2 选择服务器种类\n我选的 ubuntu 16.04 x64 版本的，当然也可以选其他的种类，\n"),a("img",{attrs:{src:"https://github.com/kaisa911/studyNotes/blob/master/public/image/fuwuqi02.png?raw=true",alt:"选择服务器种类"}}),s._v("\n3.3 选择服务器大小\n我当时选的$2.5/mo 的，现在貌似得选$5/mo 的了。。\n"),a("img",{attrs:{src:"https://github.com/kaisa911/studyNotes/blob/master/public/image/fuwuqi03.png?raw=true",alt:"选择服务器大小"}}),s._v("\n然后就可以买了。会得到一个服务器。。\n服务器列表\n"),a("img",{attrs:{src:"https://github.com/kaisa911/studyNotes/blob/master/public/image/fuwuqi04.png?raw=true",alt:"服务器列表"}}),s._v("\n服务器详情\n"),a("img",{attrs:{src:"https://github.com/kaisa911/studyNotes/blob/master/public/image/fuwuqi05.png?raw=true",alt:"服务器详情"}}),s._v("\n开启 ipv6\n"),a("img",{attrs:{src:"https://github.com/kaisa911/studyNotes/blob/master/public/image/fuwuqi06.png?raw=true",alt:"开启ipv6"}})]),s._v(" "),a("p",[s._v("到这里，购买服务器就一步就可以了。")]),s._v(" "),a("h2",{attrs:{id:"搭建-ss-服务"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#搭建-ss-服务"}},[s._v("#")]),s._v(" 搭建 ss 服务")]),s._v(" "),a("p",[s._v("1、首先需要连接到服务器，可以先 ping 一下 ip 地址看看，能 ping 通应该就可以用，没有 ping 通，就把刚才的服务器换一个。mac 可以用终端直接连接，windows 可以用 git bash，Xshell，Putty 等也都可以\n连接到远程服务器的方法是：")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("ssh root@ip\n")])])]),a("p",[s._v("ip 就是你新买服务器的 ip，然后会提示让你输入密码，可以把密码复制进去就可以登陆了.\n"),a("img",{attrs:{src:"https://github.com/kaisa911/studyNotes/blob/master/public/image/lianjie01.png?raw=true",alt:"连接服务器"}})]),s._v(" "),a("p",[s._v("2、搭建 ss 服务器\n我是使用的 ubuntu 的服务器，其他服务器可以 google 其他教程。\n在刚刚连接的命令行里")]),s._v(" "),a("ul",[a("li",[a("p",[s._v("安装pip前需要前置安装setuptools")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("wget --no-check-certificate  https://pypi.python.org/packages/source/s/setuptools/setuptools-19.6.tar.gz#md5=c607dd118eae682c44ed146367a17e26\n\ntar -zxvf setuptools-19.6.tar.gz\n\ncd setuptools-19.6\n\npython3 setup.py build\n\npython3 setup.py install\n\n")])])])]),s._v(" "),a("li",[a("p",[s._v("安装 pip\n首先安装 pip3：")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("sudo apt install python3-pip\n")])])])]),s._v(" "),a("li",[a("p",[s._v("安装 Shadowsocks\n安装最新版的 Shadowsocks：")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("pip3 install https://github.com/shadowsocks/shadowsocks/archive/master.zip\n")])])]),a("p",[s._v("查看 Shadowsocks 的版本")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("sudo ssserver --version\n")])])])]),s._v(" "),a("li",[a("p",[s._v("创建配置文件\n创建 Shadowsocks 配置文件所在文件夹")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("sudo mkdir /etc/shadowsocks\n")])])]),a("p",[s._v("创建配置文件：")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("sudo nano /etc/shadowsocks/config.json\n")])])]),a("p",[s._v("复制粘贴如下内容（注意修改密码“password”,服务器端口号也可以自行修改）：")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('{\n  "server":"::",\n  "server_port":8388,\n  "local_address": "127.0.0.1",\n  "local_port":1080,\n  "password":"mypassword",\n  "timeout":300,\n  "method":"aes-256-cfb",\n  "fast_open": false\n}\n')])])]),a("p",[s._v("然后按 Ctrl + O 保存文件，Ctrl + X 退出。")])]),s._v(" "),a("li",[a("p",[s._v("测试 Shadowsocks 配置\n测试下 Shadowsocks 能不能正常工作")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("ssserver -c /etc/shadowsocks/config.json\n")])])]),a("p",[s._v("测试完毕，按 Ctrl + C 关闭 Shadowsocks。")])]),s._v(" "),a("li",[a("p",[s._v("配置 Systemd 管理 Shadowsocks\n新建 Shadowsocks 管理文件")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("sudo nano /etc/systemd/system/shadowsocks-server.service\n")])])]),a("p",[s._v("复制粘贴：")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("[Unit]\nDescription=Shadowsocks Server\nAfter=network.target\n\n[Service]\nExecStart=/usr/local/bin/ssserver -c /etc/shadowsocks/config.json\nRestart=on-abort\n\n[Install]\nWantedBy=multi-user.target\n")])])]),a("p",[s._v("Ctrl + O 保存文件，Ctrl + X 退出\n启动 Shadowsocks：")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("sudo systemctl start shadowsocks-server\n")])])]),a("p",[s._v("设置开机启动 Shadowsocks：")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("sudo systemctl enable shadowsocks-server\n")])])])]),s._v(" "),a("li",[a("p",[s._v("优化（主要就是开启 BBR）\nBBR 系 Google 最新开发的 TCP 拥塞控制算法，目前有着较好的带宽提升效果。")]),s._v(" "),a("p",[s._v("升级 Linux 内核\nBBR 在 Linux kernel 4.9 引入。首先检查服务器 kernel 版本：")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("uname -r\n")])])]),a("p",[s._v("如果其显示版本在 4.9.0 之下，则需要升级 Linux 内核，否则请忽略下文。")]),s._v(" "),a("p",[s._v("更新包管理器：")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("sudo apt update\n")])])]),a("p",[s._v("查看可用的 Linux 内核版本：")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("sudo apt-cache showpkg linux-image\n")])])]),a("p",[s._v("找到一个你想要升级的 Linux 内核版本，如“linux-image-4.10.0-22-generic”：")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("sudo apt install linux-image-4.10.0-22-generic\n")])])]),a("p",[s._v("等待安装完成后重启服务器：")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("sudo reboot\n")])])]),a("p",[s._v("删除老的 Linux 内核：")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("sudo purge-old-kernels\n")])])]),a("p",[s._v("开启 BBR\n运行 "),a("code",[s._v("lsmod | grep bbr")]),s._v("，如果结果中没有 "),a("code",[s._v("tcp_bbr")]),s._v("，则先运行：")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('modprobe tcp_bbr\necho "tcp_bbr" >> /etc/modules-load.d/modules.conf\n')])])]),a("p",[s._v("运行：")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf\necho "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf\n')])])]),a("p",[s._v("运行：")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("sysctl -p\n")])])]),a("p",[s._v("保存生效。运行：")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("sysctl net.ipv4.tcp_available_congestion_control\nsysctl net.ipv4.tcp_congestion_control\n")])])]),a("p",[s._v("若均有 bbr，则开启 BBR 成功。\n至此，Shadowsock服务器端的基本配置已经全部完成了！")])])]),s._v(" "),a("h2",{attrs:{id:"客户端配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#客户端配置"}},[s._v("#")]),s._v(" 客户端配置")]),s._v(" "),a("p",[s._v("需要下载shadowsocks客户端\nmac下载地址："),a("code",[s._v("https://github.com/shadowsocks/ShadowsocksX-NG/releases")]),s._v("\nwindows下载地址："),a("code",[s._v("https://github.com/shadowsocks/shadowsocks-windows/releases")])]),s._v(" "),a("p",[s._v("在Shadowsocks客户端添加服务器，如果你使用的是我提供的那个配置文件的话，地址填写你的IPv4地址或IPv6地址，端口号为8388，加密方法为aes-256-cfb，密码为你设置的密码。然后设置客户端使用全局模式，浏览器登录Google试试应该能直接打开了。\nmac下的配置：\n"),a("img",{attrs:{src:"https://github.com/kaisa911/studyNotes/blob/master/public/image/kehuduan01.png?raw=true",alt:"mac下的配置"}}),s._v("\nwindows下的配置\n"),a("img",{attrs:{src:"https://github.com/kaisa911/studyNotes/blob/master/public/image/kehuduan02.png?raw=true",alt:"win下的配置"}})]),s._v(" "),a("p",[s._v("在mac下可能需要在偏好设置里设置一下socket5和http代理\n"),a("img",{attrs:{src:"https://github.com/kaisa911/studyNotes/blob/master/public/image/macpeizhi01.png?raw=true",alt:"win下的配置"}}),s._v(" "),a("img",{attrs:{src:"https://github.com/kaisa911/studyNotes/blob/master/public/image/macpeizhi02.png?raw=true",alt:"win下的配置"}})]),s._v(" "),a("p",[s._v("在mac下需要全局模式才能科学上网。可以直接上bt。\n在window下，代理模式可以科学上网，但是全局模式，外加需要设置一下ut才可以上bt\n设置utorrent\n打开设置 -> 连接\n代理服务选择Http，代理127.0.0.1，端口1080，勾选通过代理服务器解析主机名 和 对于点对点连接使用代理服务器\n然后点应用，就可以上网了。\n"),a("img",{attrs:{src:"https://github.com/kaisa911/studyNotes/blob/master/public/image/bt01.png?raw=true",alt:"mac上bt"}})])])}),[],!1,null,null,null);t.default=r.exports}}]);