#!/bin/bash

echo "Running cache update with recent blocks..."

cd cache

dao-stats update hype.tkn.near

git config user.name github-actions
git config user.email github-actions@github.com

git add .
git commit -m "Updates DAO cache."
git push

cd ..
rm -Rf cache
