cd $(dirname $0)
git fetch origin gh-pages
if [ -n "$(git log gh-pages..origin/gh-pages --oneline)" ]; then
    echo 检测到更改，正在合并最新拉取的更改...
    git merge origin/gh-pages
    echo 正在编译 Jekyll 站点
    Jekyll build
    echo 正在复制站点到 /var/www/html
    cp _site/* /var/www/html/*
    echo 正在复制 BuildWith 到 /var/www/html
    cp /var/www/work/buildwith/* /var/www/html/*
else
    echo 无需更新。
fi
