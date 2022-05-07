module.exports = {
  lang: 'zh-CN',
  title: '帕吉小馆',
  description: '谁人不爱大肉排',
  author: '帕吉',
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  shouldPrefetch: () => true,
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },
  theme: 'vuepress-theme-reco',
  nextLinks: false,
  prevLinks: false,
  themeConfig: {
    smoothScroll: true,
    search: false,

    nav: [
      { text: '首页', link: '/' },
      { text: '笔记', link: '/notes/default' },
      { text: '时间轴', link: '/timeline/', icon: 'reco-date' },
    ],
    sidebar: {
      '/notes/': [
        {
          title: '笔记们',
          collapsable: false,
          children: [{ title: '笔记汇总', path: '/notes/articles/' }],
        },
        {
          title: '看不懂的源码们',
          collapsable: false,
          children: [{ title: '看不懂看不懂', path: '/notes/sourceCode/' }],
        },
        {
          title: '刷不完的lc',
          collapsable: false,
          children: [{ title: '洗刷刷', path: '/notes/leetcode/' }],
        },
        {
          title: '师夷长技',
          collapsable: false,
          children: [{ title: '翻译文章', path: '/notes/translations/' }],
        },
      ],
    },
    sidebarDepths: 1,
    blogConfig: {
      category: {
        location: 4, // 在导航栏菜单中所占的位置，默认2
        text: '分类', // 默认文案 “分类”
      },
      tag: {
        location: 5, // 在导航栏菜单中所占的位置，默认3
        text: '标签', // 默认文案 “标签”
      },
    },
  },
};
