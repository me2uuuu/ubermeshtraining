
const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  '/ubermeshtraining/',  // 🔥 GitHub Pages 환경에 맞게 경로 변경
  '/ubermeshtraining/index.html',
  '/ubermeshtraining/styles.css',
  '/ubermeshtraining/manifest.json',
  '/ubermeshtraining/icon_black_bg_white_logo.png'
];

// Install Service Worker and Cache Files
self.addEventListener('install', (event) => {
  console.log("✅ Service Worker 설치 완료!");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("✅ 캐싱 중:", urlsToCache);
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch and Serve Cached Files
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate and Clear Old Caches
self.addEventListener('activate', (event) => {
  console.log("✅ Service Worker 활성화됨!");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("❌ 이전 캐시 삭제:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
