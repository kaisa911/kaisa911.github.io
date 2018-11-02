---
title: linux 服务器安装nginx及配置
date: 2018-11-02 10:53:39
tags: nginx
categories: 学习笔记
---

在 linux 服务器上安装 nginx，是想把自己写的项目配置到服务器上, 于是就研究了一下 nginx

## 安装 nginx

我是用 yum 安装的 nginx，简单快捷，命令也简单

```
yum -y install nginx;

已加载插件：fastestmirror, security
设置安装进程
Loading mirror speeds from cached hostfile
解决依赖关系
--> 执行事务检查
---> Package nginx.i686 0:1.0.15-12.el6 will be 安装
--> 完成依赖关系计算

依赖关系解决

========================================================================================================================================
 软件包                        架构                         版本                                     仓库                          大小
========================================================================================================================================
正在安装:
 nginx                         i686                         1.0.15-12.el6                            epel                         410 k

事务概要
========================================================================================================================================
Install       1 Package(s)

总下载量：410 k
Installed size: 1.1 M
下载软件包：
nginx-1.0.15-12.el6.i686.rpm                                                                                     | 410 kB     00:00
运行 rpm_check_debug
执行事务测试
事务测试成功
执行事务
Warning: RPMDB altered outside of yum.
  正在安装   : nginx-1.0.15-12.el6.i686                                                                                             1/1
  Verifying  : nginx-1.0.15-12.el6.i686                                                                                             1/1

已安装:
  nginx.i686 0:1.0.15-12.el6

完毕！
```

然后可以查看一下 nginx 的版本

```
nginx -v
nginx version: nginx/1.12.2
```

然后记一下 nginx 的启动，停止，和重启的问题就好了

```
// 启动服务
service nginx start

// 关闭服务
service nginx stop

// 重启服务
service nginx restart
```

然后把项目记得放在／usr 目录下，然后你就需要配置 nginx.conf 了

我的 nginx.conf 是放在/etc/nginx/目录下，打开目录。

```
vim nginx.conf
```

然后可以在 vim 里处理 nginx.conf 文件

默认配置可以不动。

```
// 由于是单页应用虚拟路由的原因，需要将nginx的所有请求都转发到index.html页面，所以需要修改配置文件：
server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  _;
        root         /usr/project/projectName/dist;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        
        location ~* html {
            rewrite .* /index.html break;
            root /usr/project/projectName/dist/;
        }

        error_page 404 /404.html;
            location = /index.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }
```
然后重启nginx服务，在浏览器里输入ip地址就可以看到你的项目啦～
