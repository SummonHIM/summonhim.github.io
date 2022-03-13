cd $(dirname $0)
git fetch origin gh-pages
if [ -n "$(git log gh-pages..origin/gh-pages --oneline)" ]; then
    git merge origin/master
fi
