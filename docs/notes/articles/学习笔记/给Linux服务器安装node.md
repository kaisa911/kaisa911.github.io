---
title: 给Linux服务器安装node
date: 2019-02-26 13:11:09
tags: [Linux]
categories: 学习笔记
---

新买了一个腾讯云的服务器，需要给新服务器搞定一大些东西，准备记录一下，方便以后更换服务器的时候不用再谷歌了

步骤 1、安装 nvm ：

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

source ~/.bashrc

步骤 2、nvm --version 查看安装的 nvm 的版本

步骤 3、nvm ls-remote 可查看 node 所有版本

步骤 4、nvm install <version>(版本号)例如：nvm install v10.6.0

步骤 5、node -v ,npm -v 查看版本
