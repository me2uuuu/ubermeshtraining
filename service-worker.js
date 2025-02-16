self.addEventListener('install', (event) => {
  console.log("Service Worker 설치 완료!");
  event.waitUntil(
    caches.open('pwa-cache').then((cache) => {
      return cache.addAll(['/']);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
