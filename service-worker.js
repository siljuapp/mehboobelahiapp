const CACHE_NAME = "elahi_study_app";
const urlsToCache = ["/", "/index.html", "/styles.css", "/script.js", "/assets/esalogo_192.png", "/assets/esalogo_512.png"];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("activate", function (event) {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});

/*
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open("revise-cache-v1").then(function (cache) {
            return cache.addAll(["/", "/index.html", "/styles.css?v1.2", "/script.js?v1.2", "/assets/icon-192x192.png", "/assets/icon-512x512.png"]);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});

/*
const CACHE_NAME = "revise-cache-v2"; // Increment the cache version
const urlsToCache = [
    "/",
    "/index.html",
    "/styles.css?v1.2", // Cache the file with query parameter
    "/script.js?v1.2", // Cache the file with query parameter
    "/assets/icon-192x192.png",
    "/assets/icon-512x512.png",
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                return response;
            }
            return fetch(event.request).then(function (response) {
                // Optional: Cache the new response for future requests
                if (event.request.url.includes("styles.css?v1") || event.request.url.includes("script.js?v1")) {
                    return caches.open(CACHE_NAME).then(function (cache) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                }
                return response;
            });
        })
    );
});

self.addEventListener("activate", function (event) {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
*/
