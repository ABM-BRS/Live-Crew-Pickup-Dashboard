// sw.js - Service Worker for ABM Crew Dashboard

const CACHE_NAME = 'abm-dashboard-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/favicon.ico',
  'https://cdn.jsdelivr.net/npm/chart.js',
  // You can add more assets like CSS, images, fonts here if needed
];

// Install - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch - serve cached assets first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
      .catch(() => {
        // Optional: fallback if offline
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      })
  );
});
