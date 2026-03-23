const CACHE_NAME = 'abm-crew-dashboard-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/Live-Crew-Pickup-Dashboard/',
  '/Live-Crew-Pickup-Dashboard/index.html',
  '/Live-Crew-Pickup-Dashboard/manifest.json',
  '/Live-Crew-Pickup-Dashboard/icon-192.png',
  '/Live-Crew-Pickup-Dashboard/icon-512.png',
  // Add any other JS/CSS files if needed
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
