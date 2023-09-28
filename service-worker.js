// Service Worker Installation
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('my-pwa-cache-v1').then(function(cache) {
      return cache.addAll([
        // List the URLs of your application's core assets to cache
        '/',
        '/index.html', // Update with your HTML file(s)
        '/styles.css', // Update with your CSS file(s)
        '/app.js', // Update with your JavaScript file(s)
        '/images/logo.png', // Update with your image files
        // Add more URLs as needed
      ]);
    })
  );
});

// Service Worker Activation
self.addEventListener('activate', function(event) {
  // Clean up any outdated caches here if needed
});

// Service Worker Fetch
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
