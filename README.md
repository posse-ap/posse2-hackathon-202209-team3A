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

### mainの変更を自分のいるブランチに取り込む + コンフリクトを自分のパソコンで解消する
1. ブランチを移動
```sh
git checkout [branch-name]
```

2. リモートのmainの変更を取り込む
```sh
git pull origin main
```

3. コンフリクトしたら、VS CodeのSource Control (左のタブの上から二番目くらいにあるやつ)でコンフリクトが起きているファイルを確認

4. 例えば、 `common.css` みたいな自動生成のファイルがコンフリクトを起こしているなら、それを削除して、もう一回作成

5. それ以外のファイルは手動でコンフリクトを解消する！


### ブランチを削除する
```sh
git branch -d [branch-name]
```

