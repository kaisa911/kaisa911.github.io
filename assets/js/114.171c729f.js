(window.webpackJsonp=window.webpackJsonp||[]).push([[114],{689:function(t,e,n){"use strict";n.r(e);var r=n(17),o=Object(r.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("p",[t._v("题目：我有 40 亿个整数，再给一个新的整数，我需要判断新的整数是否在 40 亿个整数中，你会怎么做（每个整数是 32 位的）？")]),t._v(" "),n("p",[t._v("一个数在不在就是两个状态，在或者不在，就可以用 1 个位来代表。每个整数是 32 位的，那么所有的整数也就 2^32 个，大概 42 亿个数左右。可以申请 2^32 的位，把每一个整数都覆盖了，40 亿个数的位分别为 1，剩下的位为 0。新的整数，就可以跟进它的大小来判断相应的位，比如 1245，就去看 1245 位是 1 还是 0 来判断是否在这 40 亿个整数中。")]),t._v(" "),n("p",[t._v("2^32 个位，就是 2^29 个字节，也就是 500M 左右。")]),t._v(" "),n("p",[t._v("位图法（bitmap）")]),t._v(" "),n("p",[t._v("链接： "),n("a",{attrs:{href:"https://mp.weixin.qq.com/s/XC7Wpc5ZdvcT_7h3I956RQ",target:"_blank",rel:"noopener noreferrer"}},[t._v("漫画：如何判断一个数是否在 40 亿个整数中"),n("OutboundLink")],1)])])}),[],!1,null,null,null);e.default=o.exports}}]);