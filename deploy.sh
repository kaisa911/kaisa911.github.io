#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 发布到自定义域名
# echo "把域名放到CNAME文件中"
echo 'blog.pudge.tech' > docs/.vuepress/dist/CNAME

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:kaisa911/kaisa911.github.io.git master:gh-pages

cd -