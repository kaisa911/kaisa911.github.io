---
title: tsconfig.json配置
date: 2020-08-27 16:08:00
tags: [TypeScript]
categories: TS学习
---

```json
{
  // 用来配置编译选项
  "compilerOptions": {
    "target": "esnext", // 生成js 的版本，下一版本
    "module": "esnext", // 生成的module的形式，esm，cmd，amd啥的
    "strict": false, // 是否严格模式
    "jsx": "preserve", // jsx用于的开发环境，preserve/react/RN
    "importHelpers": true, // 指定是否引入tslib里的复制工具函数
    "moduleResolution": "node", // 用于选择模块解析策略 node/classic
    "experimentalDecorators": true, // 用于指定是否启用实验性的装饰器特性
    "esModuleInterop": true, // 通过导入内容创建命名空间，实现CommonJS和ES模块之间的互操作性
    "allowSyntheticDefaultImports": true, // 用于允许从没有默认导出的模块中默认导入
    "sourceMap": true, // 编译时是否生成.map文件
    "baseUrl": ".", // 用于设置解析非相对模块名称的基本目录，相对模块不会受到baseUrl的影响
    //用于指定需要包含的模块，只有在这里列出的模块的声明文件才会被加载
    "types": ["webpack-env"],
    // 用于设置模块名到基于baseUrl的路径映射
    "paths": {
      "@/*": ["src/*"]
    },
    // 指定要包含在编译中的库文件
    "lib": ["esnext", "dom", "dom.iterable", "scripthost"]
  },
  // 指定编译的文件，没有include和exclude时候用
  "file": [],
  // 指定待编译的文件
  "include": ["src/**/*.ts"],
  // 指定排除的文件
  "exclude": ["node_modules"]
}
```

具体可见： [tsconfig.json 配置详解](https://segmentfault.com/a/1190000021749847)
