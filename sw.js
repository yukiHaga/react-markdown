// キャッシュの名前を定義します。
// キャッシュAPIは、このキャッシュ名に応じて別のキャッシュを提供してくれます。
const CacheName = "Cache:v1";

// Web Workerと同じように、selfはサービスワーカー自身を指す
// 今回はインストールとアクティベートのタイミングで、
// コンソールにメッセージとイベントの内容を表示するだけの処理を記述しています。
self.addEventListener("install", (event) => {
  console.log("ServiceWorker install:", event);
});

const networkFallingBackToCache = async (request) => {
  // 定義した名前で、キャッシュを開きます。
  const cache = await caches.open(CacheName);
  // 通常の fetch リクエストを実行してレスポンスを取得しています。
  // レスポンス内容をキャッシュに保存しています。
  // なお response.clone() でレスポンスの内容をコピーしてから保存しなければなりません。
  // これはレスポンスの内部で一度しか読み取りできない処理があるためです。
  // なので、コピーしたものをキャッシュに保存してください。
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());
    return response;
  } catch (err) {
    console.error(err);
    return cache.match(request);
  }
};

// fetch イベント時に実行する処理を登録します。
// fetch とはネットワークなどを経由してリソースを取得するために使用するAPIです。
// ここにサービスワーカーは介入できるので、リソース取得に対して様々な処理を挟むことができます。
// event.respondWith は先ほど説明したとおり、非同期処理を待機して結果を返却してくれるメソッドです。
// networkFallingBackToCache(event.request) は作成した関数にリクエストを渡しています。
self.addEventListener("fetch", (event) => {
  event.respondWith(networkFallingBackToCache(event.request));
});
