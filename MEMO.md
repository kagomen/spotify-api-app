## React

- イベントハンドラへの関数の渡し方

  1. `onClick = {hoge}`
  1. `onClick = {() => hoge()}`

  - `onClick = {hoge()}`とするとレンダリング時に実行される
  - そのため、実行する関数が引数をとるときは 2 の書き方を採択することになる
  - `onClick = {(e) => hoge(e.target.value)}`
  - JavaScript では、HTML 内で onclick を使用する際は`<button onclick="hoge()">ボタン</button>` とするので注意

- useRef

  - レンダリングせずに値を保持する
  - useState のようにレンダリングする必要がなければ useRef を使用する

- useState はレンダリング時に state の値を更新する

  ```js
  const [page, setPage] = useState(1);

  export function App(props) {
    const countUp = () => {
      setPage((prev) => prev + 1);
      console.log(page); // 1が表示される
    };
    return (
      <span>{page}</span> // 2が表示される
    );
  }
  ```

  - 解決策 1. useState と一緒に useEffect を使う

  ```js
  const countUp = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    console.log(page);
  }, [page]);
  ```

  - 解決策 2. 値を直接代入する

  ```js
  const countUp = () => {
    prevPage = page + 1;
    console.log(prevPage);
    setPage(prevPage);
  };
  ```

- useEffect に async をつけて非同期処理にするとエラーになる
  - useEffect はコールバック関数にクリーンアップ関数を返すことを期待している（指定しない場合は`undefined`となる）
  - async 関数は常に Promise を返すため、useEffect が期待するシグネチャと一致しない
  ```js
  useEffect(() => {
    (async () => {
      const res = await fetch(URL);
      const data = await res.json();
      console.log(data);
    })();
  }, []);
  ```

## JavaScript

- fill()

- `new Array(3)` などで生成した**値を持たない配列**に対し、値を持たせる関数

```js
// NG例
Array(20).map(() => {...})

// OK例
Array(20).fill().map(() => {...})
```

> callback は、値が代入されている配列のインデックスに対してのみ呼び出されます(undefined が代入されているものも含みます)。すでに削除されたインデックスや、まだ値が代入されていないインデックスに対しては呼び出されません。

- 参考: https://yucatio.hatenablog.com/entry/2019/04/07/110721

- static

  - クラス定義の中で、インスタンス化せずに直接呼び出せるメソッドやプロパティにつける接頭辞

- クラス内で定義するメソッドを宣言するときは、function を省略する

- json()も非同期処理なので、await をつけ忘れないこと

- トップレベル await
  - ES2022 からトップレベルで await を使用する際は、async 関数で囲う必要がなくなった
  - それ以前は即時実行関数を利用するなどして、半ば強引に（？）実行していた

## Web API

- HTTP ヘッダ
  - Content-Type: <メディアタイプ>
    - メディアタイプ例
      - text/plain
      - image/jpeg
      - audio/mpeg
      - video/mp4
      - application/json
    - charset=utf-8 などとして文字エンコーディングを指定
  - Content-Language: ja-JP
  - Accept: <クライアントが処理可能なメディアタイプ>
  - Content-Length: <レスポンスボディの長さ>
  - Transfer-Encoding: chunked
    - 大きなデータをチャンクして転送する
  - Authorization: <認証方法>
    - 認証方法
      - Basic 認証
        - base64 でエンコードしたユーザー ID とパスワードを使用
        - 簡単にデコードできるので HTTPS による通信暗号化が必須
      - Digest 認証
        - デコード不可能なハッシュ化されたパスワードを使用
        - メッセージは暗号化されないので HTTPS による通信暗号化が必須
      - Bearer 認証
        - 権限付きトークンを取得して使用する
        - OAuth2.0 で保護されたリソースなどの認証に使用
  - Cache-Control: <キャッシュ方法>
    - キャッシュ方法
      - no-store キャッシュしない
      - no-cache キャッシュするが再検証する
      - max-age=<有効期限（ms）>
      - must-revalidate 必ず検証する

## OAuth2.0

- トークンの種類
  - ベアラートークン
    - トークンを持つ者であれば誰でも使えるタイプ
    - リスクの低いものに使われる
  - 利用者制限トークン
    - 利用者が利用者情報と一致するか確認するタイプ

## ハッシュ化

- ハッシュ関数を用いてハッシュ値を得ること

- ハッシュ関数

  - MD5, SHA256, bcrypt など

- ハッシュ値
  - ハッシュ値からハッシュ前の値は算出できないが、レインボーテーブルによって算出ができてしまう
  - そのためソルト（ハッシュ前の文字列に結合するためのランダムな文字列）を利用する
    - ソルトはユーザ毎に新しいものが生成されるため、レインボーテーブルに対する対策になる（完璧ではない）

## メモ

- React の設計
  - 親コンポーネントで状態の宣言・管理をするっぽい
  - 子は状態を渡されて、画面に反映させるだけっぽい
