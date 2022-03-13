cd $(dirname $0)
git fetch origin gh-pages
if [ -n "$(git log gh-pages..origin/gh-pages --oneline)" ]; then
    echo 检测到更改，正在更新...
    git merge origin/gh-pages
else
    echo 无需更新。
fi
