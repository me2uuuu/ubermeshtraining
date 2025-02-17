
const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  '/',  // 홈페이지
  '/index.html',  // 홈페이지 HTML
  '/styles.css',  // 스타일시트
  '/manifest.json',  // 매니페스트 파일
  '/icon_black_bg_white_logo.png',  // 아이콘 이미지
];

// Service Worker 설치 및 캐시 파일 추가
self.addEventListener('install', (event) => {
  console.log("✅ Service Worker 설치 중...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("✅ 캐시 파일 추가 중:", urlsToCache);
      return cache.addAll(urlsToCache);
    })
  );
});

// 네트워크 요청 처리: 캐시된 파일을 우선적으로 제공하고, 없으면 네트워크에서 가져오기
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);  // 캐시가 있으면 캐시된 파일 제공, 없으면 네트워크에서 가져오기
    })
  );
});

// Service Worker 활성화 및 이전 캐시 삭제
self.addEventListener('activate', (event) => {
  console.log("✅ Service Worker 활성화 중...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("❌ 이전 캐시 삭제 중:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
