import * as marked from "marked";
import * as sanitizeHtml from "sanitize-html";
// Web Workerを変数にセットする
const worker: Worker = self as any;

// メインスレッドからデータを渡された際に実行する関数を定義しています。
// postMessageという関数を呼び出して、メインスレッドへ処理結果を送信しています。
worker.addEventListener("message", (event) => {
  const text = event.data;
  const html = sanitizeHtml(marked(text), {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "h1", "h2"],
  });
  worker.postMessage({ html });
});
