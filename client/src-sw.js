const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache files specified in the Workbox manifest.
precacheAndRoute(self.__WB_MANIFEST);

// Cache strategy for pages (HTML).
const pageCache = new CacheFirst({
    cacheName: 'page-cache',
    plugins: [
        new CacheableResponsePlugin({
            statuses: [0, 200], // Cache successful responses.
        }),
        new ExpirationPlugin({
            maxAgeSeconds: 30 * 24 * 60 * 60, // Set how long the cached responses are considered valid.
        }),
    ],
});

// Strategy to keep the list of URLs in the cache fresh.
warmStrategyCache({
    urls: ['/index.html', '/'],
    strategy: pageCache,
});

// Route to manage navigation requests with a cache-first strategy.
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Caching strategy for assets like CSS, JS, and worker scripts.
registerRoute(
    ({ request }) =>
        ['style', 'script', 'worker'].includes(request.destination),
    new CacheFirst({
        cacheName: 'asset-cache',
        plugins: [
            new CacheableResponsePlugin({ statuses: [0, 200] }), // Cache successful responses.
            new ExpirationPlugin({ maxEntries: 50 }), // Limit the number of entries in the cache.
        ],
    })
);

