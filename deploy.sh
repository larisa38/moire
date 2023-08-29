git init
git add -A
git commit -m 'deploy'
git push -f   master:gh-pages

cd -
npm run build