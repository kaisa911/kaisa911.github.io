const path = require('path');
const fs = require('fs');

const sourceDir = path.resolve(__dirname, '../notes');

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
      { text: 'Vue源码学习', link: '/notes/Vue源码学习/1.开始' },
      { text: '时间轴', link: '/timeline/', icon: 'reco-date' },
    ],
    sidebar: {
      '/notes/Vue源码学习/': sidebarFactory('Vue源码学习'),
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
    sidebarDepths: 3,
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

// 获取目标目录
function addFileDir(dir) {
  return path.resolve(__dirname, `../notes/${dir}`);
}
// 收集目录下的文件
function collectFileDir(dir, callback) {
  let fileTree = {};
  const rootDir = dir;
  let arr = [dir];
  let current = null;
  let index = 0;
  while ((current = arr[index++])) {
    // 读取当前文件，并做一个判断，文件目录分别处理
    let stat = fs.statSync(current);
    //如果文件是目录
    if (stat.isDirectory()) {
      //读取当前目录，拿到所有文件和目录
      let files = fs.readdirSync(current);
      // 将非根目录的文件添加到文件树
      if (current === dir) {
        fileTree[path.basename(current)] = files.map((file) => {
          try {
            let data = fs.readFileSync(path.resolve(current, file), 'utf8');
            let headling = /^(title:)([^(title:)\n].*)$/m;

            let title = headling.exec(data)[2].trim();
            return { title, fileName: path.basename(file, path.extname(file)) };
          } catch (err) {
            console.error(err);
          }
        });
      }
      arr = arr.concat(files.map((file) => path.resolve(current, file)));
    }
  }
  callback && callback(fileTree);
}
function sidebarFactory(dirName) {
  let res = [];
  collectFileDir(addFileDir(dirName), (tree) => {

    res = Object.keys(tree).map((key) => ({
      text: key,
      collapsable: false,
      children: tree[key].map(({ title, fileName }) => {
        return { title: title, path: `/notes/${dirName}/${fileName}.html` };
      }),
    }));
  });
  return res;
}
