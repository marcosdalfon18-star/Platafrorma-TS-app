// A basic service worker to make the app installable.

self.addEventListener('install', (event) => {
  console.log('Service worker installing...');
  // Skip waiting to activate the new service worker immediately.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activating...');
  // Take control of all open clients immediately.
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // For now, just pass through the request to the network.
  // This ensures the app works online as before.
  event.respondWith(fetch(event.request));
});
