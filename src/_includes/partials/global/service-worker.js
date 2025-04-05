const CACHE_KEYS = {
	PRE_CACHE: `precache-${VERSION}`,
	RUNTIME: `runtime-${VERSION}`,
};

// URLS that we don’t want to end up in the cache
const EXCLUDED_URLS = [
	'admin',
	'.netlify',
	'https://identity.netlify.com/v1/netlify-identity-widget.js',
	'https://unpkg.com/netlify-cms@^2.9.3/dist/netlify-cms.js',
];

// URLS that we want to be cached when the worker is installed
const PRE_CACHE_URLS = ['/'];

// You might want to bypass a certain host
const IGNORED_HOSTS = ['localhost', 'unpkg.com'];

/**
 * Takes an array of strings and puts them in a named cache store
 *
 * @param {String} cacheName
 * @param {Array} items=[]
 */
const addItemsToCache = function (cacheName, items = []) {
	caches.open(cacheName).then((cache) => cache.addAll(items));
};

self.addEventListener('install', (evt) => {
	self.skipWaiting();

	addItemsToCache(CACHE_KEYS.PRE_CACHE, PRE_CACHE_URLS);
});

self.addEventListener('activate', (evt) => {
	// Look for any old caches that don't match our set and clear them out
	evt.waitUntil(
		caches
			.keys()
			.then((cacheNames) => {
				return cacheNames.filter((item) => !Object.values(CACHE_KEYS).includes(item));
			})
			.then((itemsToDelete) => {
				return Promise.all(
					itemsToDelete.map((item) => {
						return caches.delete(item);
					})
				);
			})
			.then(() => self.clients.claim())
	);
});

self.addEventListener('fetch', (evt) => {
	const { hostname } = new URL(evt.request.url);

	if (IGNORED_HOSTS.includes(hostname)) {
		return;
	}

	if (EXCLUDED_URLS.some((page) => evt.request.url.includes(page))) {
		return;
	}

	evt.respondWith(
		caches.match(evt.request).then((cachedResponse) => {
			if (cachedResponse) {
				return cachedResponse;
			}

			return fetch(evt.request)
				.then((response) => {
					// Only cache valid responses (status is 200 and type is basic or opaque)
					if (
						!response ||
						response.status !== 200 ||
						response.type !== 'basic'
					) {
						return response;
					}

					const responseClone = response.clone();

					caches.open(CACHE_KEYS.RUNTIME).then((cache) => {
						cache.put(evt.request, responseClone);
					});

					return response;
				})
				.catch(() => {
					// Optionally, return a fallback page here if desired
					return new Response('Network error occurred', {
						status: 408,
						statusText: 'Network Timeout',
					});
				});
		})
	);
});
