## internal

### これから作業を始める

1. `main` ブランチに移動する

```sh
git checkout main
```

2. `main` の最新の変更を取り込む

```sh
git pull origin main
```

3. 新しいブランチを作成

```sh
git branch [branch-name]
```

4. 新しいブランチに移動

```sh
git checkout [branch=-name]
```

### PRあげたい

1. stagingに追加
```sh
git add -A
```

2. コミットする
```sh
git commmit -m [commit-message]
```

3. リモートに送る
```sh
git push origin [branch-name]
```

4. githubにアクセスして、PRを作る！

```sh
