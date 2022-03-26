runSync() {
    echo 正在清空之前的更改...
    git restore .
    git merge origin/gh-pages
    echo 正在删除旧站点...
    rm -rf /var/www/html/*
    echo 正在编译 Jekyll 站点...
    sed -i 's/url: "https:\/\/summonhim.top"/url: "https:\/\/8bits.group"/g' _config.yml
    sed -i "s/title: SummonHIM's Logs/title: 8-Bits Group/g" _config.yml
    sed -i "s/header_text: SummonHIM's Logs/header_text: 八点八位元/g" _config.yml
    sed -i 's/header_feature_image: http:\/\/www.dmoe.cc\/random.php/header_feature_image: https:\/\/api.sunweihu.com\/api\/bing1\/api.php/g' _config.yml
    sed -i 's/chn_website_approve: false/chn_website_approve: true/g' _config.yml
    sed -i 's/cusdis_app_id: adaf6c7e-8ca3-4335-aeb1-e04b20102f11/cusdis_app_id: /g' _config.yml
    jekyll build
    echo 正在复制站点到 /var/www/html...
    cp -r _site/* /var/www/html
    cp -r /var/www/work/buildwith/* /var/www/html
}

cd $(dirname $0)

time=$(date "+%Y-%m-%d %H:%M:%S")
echo "--- ${time} ---"

echo 正在获取远程仓库数据...
git fetch origin gh-pages

if [ "$1" == "force" ]; then
    echo 已启用强制合并并编译。
    runSync
fi

echo 正在检查 gh-pages 分支是否有更新...
if [ -n "$(git log gh-pages..origin/gh-pages --oneline)" ]; then
    echo 检测到更改！正在合并最新拉取的更改并尝试编译...
    runSync
else
    echo 未检测到更新...
fi
