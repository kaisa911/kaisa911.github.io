---
title: 在HTML中使用JS
date: 2018-06-10 22:20:34
tags: Javascript
categories: JS高程填坑笔记
---
这是js高程的第二章，主要讲的内容就是怎样在HTML中使用javascript。
这章的内容包含四个部分：
* &lt;script&gt; 标签
* 嵌入脚本和外部脚本
* 文档模式的影响
* 禁用javascript的场景

## &lt;script&gt; 标签
向HTML页面中插入JavaScript的主要方法，就是使用&lt;script&gt;元素。
html 4.01给script标签定义了以下属性
  * async 异步标签，表示应该立即下载脚本，但不应妨碍页面中的其他操作。该属性只对外部脚本文件有效。但是，标记为async的脚本并不保证按照script排列的先后顺序执行。异步脚本一定会在页面的load事件前执行，但可能会在DOMContentLoaded事件触发之前或之后执行。
  * charset:表示通过 src 属性指定的代码的字符集。由于大多数浏览器会忽略它的值，因此这个属性很少有人用。
  * defer:表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。脚本会被延迟到整个页面都解析完毕后再运行。HTML5规范要求脚本按照它们出现的先后顺序执行，因此第一个延迟脚本会先于第二个延迟脚本执行，而这两个脚本会先于DOMContentLoaded事件执行。但是在现实当中，延迟脚本并不一定会按照顺序执行，也不一定会在 DOMContentLoaded事件触发前执行，因此最好只包含一个延迟脚本。
  ```javascript
  <script defer="defer">
  ```
  * src:表示包含要执行代码的外部文件。如果要通过&lt;script&gt;元素来包含外部JavaScript文件，那么src 属性就是必需的。这个属性的值是一个指向外部JavaScript文件的链接。
  需要注意的是，带有src属性的&lt;script&gt;元素不应该在其&lt;script&gt;和&lt;script&gt;标签之间再 包含额外的JavaScript代码。如果包含了嵌入的代码，则只会下载并执行外部脚本文件，嵌入的代码会被忽略。
  通过&lt;script&gt;元素的 src 属性还可以包含来自外部域的 JavaScript 文件。
  ```javascript
  <script src="example.js"></script>
  ```
  * type:type 属性规定脚本的MIME类型。type属性标示 &lt;script&gt;与&lt;/script&gt;标签之间的内容。MIME类型包括两部分：media type 和 subtype。对于JavaScript，MIME 类型是 "text/javascript"。在 HTML5中，type属性不再是必需的。默认值是"text/javascript"。

## 嵌入脚本和外部脚本

使用&lt;script&gt;元素的方式有两种:直接在页面中嵌入JavaScript代码和包含外部 JavaScript文件。无论如何包含代码，只要不存在defer和async属性，浏览器都会按照&lt;script&gt;元素在页面中 出现的先后顺序对它们依次进行解析。

外部脚本的优势：
 可维护性
 可缓存: 浏览器能够根据具体的设置缓存链接的所有外部 JavaScript 文件
 适应未来

## 文档模式的影响

最初的两种文档模式是:混杂模式(quirks mode)和标准模式(standards mode)。
```html
<!-- HTML 4.01 严格型 -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<!-- HTML 5 -->
<!DOCTYPE html>
```
## 禁用javascript的场景

关于禁用javascript的场景，主要是&lt;noscript&gt;
这个元素可以包含能够出现在文档&lt;body&gt;中的任何 HTML 元素——&lt;script&gt;元素除外。包含 在&lt;noscript&gt;元素中的内容只有在下列情况下才会显示出来:
 浏览器不支持脚本;
 浏览器支持脚本，但脚本被禁用。
```html
<html>
  <head>
    <title>Example HTML Page</title>
  </head>
  <body>
    <noscript> 
      <p>本页面需要浏览器支持(启用)JavaScript。
    </noscript> 
    <script type="text/javascript" defer="defer" src="example1.js"></script> 
    <script type="text/javascript" defer="defer" src="example2.js"></script>
  </body>
</html>
```

## 总结

把 JavaScript 插入到 HTML 页面中要使用&lt;script&gt;元素。使用这个元素可以把 JavaScript 嵌入到 HTML 页面中，让脚本与标记混合在一起;也可以包含外部的 JavaScript 文件。而我们需要注意的地方有:
 在包含外部 JavaScript 文件时，必须将 src 属性设置为指向相应文件的 URL。而这个文件既可 以是与包含它的页面位于同一个服务器上的文件，也可以是其他任何域中的文件。
 所有&lt;script&gt;元素都会按照它们在页面中出现的先后顺序依次被解析。在不使用 defer 和 async 属性的情况下，只有在解析完前面&lt;script&gt;元素中的代码之后，才会开始解析后面 &lt;script&gt;元素中的代码。
 由于浏览器会先解析完不使用 defer 属性的&lt;script&gt;元素中的代码，然后再解析后面的内容， 所以一般应该把&lt;script&gt;元素放在页面最后，即主要内容后面，&lt;／body&gt;标签前面。
 使用 defer 属性可以让脚本在文档完全呈现之后再执行。延迟脚本总是按照指定它们的顺序执行。
 使用 async 属性可以表示当前脚本不必等待其他脚本，也不必阻塞文档呈现。不能保证异步脚
本按照它们在页面中出现的顺序执行。 另外，使用&lt;noscript&gt;元素可以指定在不支持脚本的浏览器中显示的替代内容。但在启用了脚本的情况下，浏览器不会显示&lt;noscript&gt;元素中的任何内容。

