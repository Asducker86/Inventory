// Service Worker Installation
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('my-pwa-cache-v1').then(function(cache) {
      return cache.addAll([
        '/', // Cache the root URL
        '/index.html', // Cache your HTML file(s)
        '/styles.css', // Cache your CSS file(s)
        '/app.js', // Cache your JavaScript file(s)
        '/images/logo.png', // Cache your image files
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
