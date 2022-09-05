## クイズの作成方法

1. `quiz_data` ディレクトリ以下に自分の名前のディレクトリを作成する（日本語・英語は挙動確認済み）<- 以後、`name` ディレクトリと呼ぶ

2. `name` ディレクトリの下に `***.json` を作成する。この `***` 部分がクイズの名前となる。 <- 以後、 `quiz.json` と呼ぶ

例: `beginner.json` `ほぼゆりえ.json`

参考: [【初心者向け】JSONファイルとは何か？jsonファイルの構造と使い方を実例でわかりやすく解説](https://prograshi.com/language/json/what-is-json-file/)

3. `quiz.json` のフォーマットに従って、クイズ作成のために必要な情報を記載する。（下記に詳細を記載）



4. 一覧画面でアイコンや自分の顔写真を表示したい場合は、 `quiz_img` ディレクトリ以下に `name` ディレクトリと同じ名前で `.jpg` ファイルを作成する。
例 `ゆうな.jpg` 
注意: 現状、 `.png` はもちろんのこと、`.jpeg` など拡張子の記述が違うだけで表示されなくなる。


## JSONファイルのフォーマット

`template.json`
```json
[
  {
    "question": "日本のIT人材が2030年には最大どれくらい不足すると言われているでしょうか？",
    "choices": ["約28万人", "約79万人", "約183万人"],
    "answer": "約79万人"
  },
  {
    "question": "既存業界のビジネスと、先進的なテクノロジーを結びつけて生まれた、新しいビジネスのことをなんと言うでしょう？",
    "choices": ["INTECH", "BIZTECH", "XTECH"],
    "answer": "XTECH"
  }
]
```

基本的には、この `template.json` をコピーし必要箇所を変更する形で行なっていただきたい。
ルートが配列となり、その要素ひとつひとつがクイズとなる。 

### 各フィールドの説明

`question`
- 文字列
- 問題の質問部分に利用

`choices`
- 文字列の配列
- 問題の選択肢に利用

`answer`
- 文字列
- 問題の解答に利用

### その他特記事項

- 一人の人が作れるクイズの数や、1つのクイズの中に含められる問題の数に制限はありません。同様にひとつのクイズに含める選択肢にも制限はありません。
- `answer` は `choices` のどれか一つと一字一句一緒になるようにしてください


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

