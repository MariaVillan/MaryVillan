const CACHE_NAME = 'mary-villanueva-cache-v1';
const urlsToCache = [
  './index.html',
  './css/styles.css', // Asegúrate de incluir tu archivo CSS real
  './js/script.js',   // Asegúrate de incluir tu archivo JS real
  './img/icon-192x192.png',
  './img/icon-512x512.png',
  './img/logo.png'    // Incluye otros recursos según sea necesario
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intercepción de solicitudes
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
