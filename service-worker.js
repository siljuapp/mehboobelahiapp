const CACHE_NAME = "elahi_study_app";
const urlsToCache = [
    "/",
    "/index.html",
    "/home.html",
    "/login.html",
    "/my_data_neet.json",
    "/my_data_ssc.json",
    "/my_data_upsc.json",
    "/styles.css",
    "/script.js",
    "/assets/esalogo192.png",
    "/assets/esalogo512.png",
    "/v6.4.2/css/sharp-solid-1.css",
    "v6.4.2/css/all-1.css",
    "v6.4.2/css/docs.css",
    "v6.4.2/css/sharp-light-1.css",
    "v6.4.2/css/sharp-regular-1.css",

    "v6.4.2/webfonts/fa-brands-400-1.ttf",
    "v6.4.2/webfonts/fa-brands-400-1.woff2",
    "v6.4.2/webfonts/fa-duotone-900-1.ttf",
    "v6.4.2/webfonts/fa-duotone-900-1.woff2",
    "v6.4.2/webfonts/fa-light-300-1.ttf",
    "v6.4.2/webfonts/fa-light-300-1.woff2",
    "v6.4.2/webfonts/fa-regular-400-1.ttf",
    "v6.4.2/webfonts/fa-regular-400-1.woff2",
    "v6.4.2/webfonts/fa-sharp-light-300-1.ttf",
    "v6.4.2/webfonts/fa-sharp-light-300-1.woff2",
    "v6.4.2/webfonts/fa-sharp-regular-400-1.ttf",
    "v6.4.2/webfonts/fa-sharp-regular-400-1.woff2",
    "v6.4.2/webfonts/fa-sharp-solid-900-1.ttf",
    "v6.4.2/webfonts/fa-sharp-solid-900-1.woff2",
    "v6.4.2/webfonts/fa-solid-900-1.ttf",
    "v6.4.2/webfonts/fa-solid-900-1.woff2",
    "v6.4.2/webfonts/fa-thin-100-1.ttf",
    "v6.4.2/webfonts/fa-thin-100-1.woff2",
    "v6.4.2/webfonts/fa-v4compatibility-1.ttf",
    "v6.4.2/webfonts/fa-v4compatibility-1.woff2",
];

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
