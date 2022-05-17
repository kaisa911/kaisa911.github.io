---
title: Flutter上手环境搭建
date: 2020-07-01 21:40:17
tags: [Flutter]
categories: 学习笔记
---

最近开始学习 Flutter，但是把 Flutter 开发环境配置好，还是花费了一些时间，于是整理下来，以备以后。

## 一、安装 Flutter SDK

去官
网[https://flutter.dev/docs/development/tools/sdk/releases](https://flutter.dev/docs/development/tools/sdk/releases)下载
最新版的 sdk
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200706205107546.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQ2Mjc4MDc=,size_16,color_FFFFFF,t_70)
下载完成后，解压到用户目录下，我放到了～/目录下，目录为～/flutter

## 二、抛出变量

```bash
vim ~/.bash_profile

// 把变量抛出
export PATH=～/flutter/bin:$PATH
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn

source ～/.bash_profile

// 然后就可以尝试一下了～
flutter -h
```

## 三、下载 Android Studio

下载 android studio 之后，在 preference 里找 plugin 然后安装 flutter 和 dart 插件

## 四、检查安装依赖

```bash
flutter doctor
```

执行命令之后，就可以把没安装的依赖都安装了

## 五、生成一个 flutter 项目

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200706213817964.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQ2Mjc4MDc=,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200706213838548.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQ2Mjc4MDc=,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200706213859659.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQ2Mjc4MDc=,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200706213915737.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQ2Mjc4MDc=,size_16,color_FFFFFF,t_70)
然后 finish 就可以了。
