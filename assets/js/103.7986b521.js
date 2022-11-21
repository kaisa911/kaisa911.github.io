(window.webpackJsonp=window.webpackJsonp||[]).push([[103],{677:function(n,e,t){"use strict";t.r(e);var a=t(17),i=Object(a.a)({},(function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[t("p",[n._v("在 linux 服务器上安装 nginx，是想把自己写的项目配置到服务器上, 于是就研究了一下 nginx")]),n._v(" "),t("h2",{attrs:{id:"安装-nginx"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装-nginx"}},[n._v("#")]),n._v(" 安装 nginx")]),n._v(" "),t("p",[n._v("我是用 yum 安装的 nginx，简单快捷，命令也简单")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("yum -y install nginx;\n\n已加载插件：fastestmirror, security\n设置安装进程\nLoading mirror speeds from cached hostfile\n解决依赖关系\n--\x3e 执行事务检查\n---\x3e Package nginx.i686 0:1.0.15-12.el6 will be 安装\n--\x3e 完成依赖关系计算\n\n依赖关系解决\n\n========================================================================================================================================\n 软件包                        架构                         版本                                     仓库                          大小\n========================================================================================================================================\n正在安装:\n nginx                         i686                         1.0.15-12.el6                            epel                         410 k\n\n事务概要\n========================================================================================================================================\nInstall       1 Package(s)\n\n总下载量：410 k\nInstalled size: 1.1 M\n下载软件包：\nnginx-1.0.15-12.el6.i686.rpm                                                                                     | 410 kB     00:00\n运行 rpm_check_debug\n执行事务测试\n事务测试成功\n执行事务\nWarning: RPMDB altered outside of yum.\n  正在安装   : nginx-1.0.15-12.el6.i686                                                                                             1/1\n  Verifying  : nginx-1.0.15-12.el6.i686                                                                                             1/1\n\n已安装:\n  nginx.i686 0:1.0.15-12.el6\n\n完毕！\n")])])]),t("p",[n._v("然后可以查看一下 nginx 的版本")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("nginx -v\nnginx version: nginx/1.12.2\n")])])]),t("p",[n._v("然后记一下 nginx 的启动，停止，和重启的问题就好了")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("// 启动服务\nservice nginx start\n\n// 关闭服务\nservice nginx stop\n\n// 重启服务\nservice nginx restart\n")])])]),t("p",[n._v("然后把项目记得放在／usr 目录下，然后你就需要配置 nginx.conf 了")]),n._v(" "),t("p",[n._v("我的 nginx.conf 是放在/etc/nginx/目录下，打开目录。")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("vim nginx.conf\n")])])]),t("p",[n._v("然后可以在 vim 里处理 nginx.conf 文件")]),n._v(" "),t("p",[n._v("默认配置可以不动。")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("// 由于是单页应用虚拟路由的原因，需要将nginx的所有请求都转发到index.html页面，所以需要修改配置文件：\nserver {\n        listen       80 default_server;\n        listen       [::]:80 default_server;\n        server_name  _;\n        root         /usr/project/projectName/dist;\n\n        # Load configuration files for the default server block.\n        include /etc/nginx/default.d/*.conf;\n\n        \n        location ~* html {\n            rewrite .* /index.html break;\n            root /usr/project/projectName/dist/;\n        }\n\n        error_page 404 /404.html;\n            location = /index.html {\n        }\n\n        error_page 500 502 503 504 /50x.html;\n            location = /50x.html {\n        }\n    }\n")])])]),t("p",[n._v("然后重启nginx服务，在浏览器里输入ip地址就可以看到你的项目啦～")])])}),[],!1,null,null,null);e.default=i.exports}}]);