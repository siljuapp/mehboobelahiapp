const CACHE_NAME = "elahi_study_app";
const urlsToCache = [
    "/",
    "/index.html",
    "/css/styles.css",
    "/js/script.js",
    "/assets/android-chrome-192x192.png",
    "/assets/android-chrome-512x512.png",
    "/offline.html", // Offline fallback page
];

// Install event - caching essential resources
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
            .catch((error) => console.error("Error caching resources during install:", error))
    );
});

// Activate event - clean up old caches
self.addEventListener("activate", function (event) {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (!cacheWhitelist.includes(cacheName)) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .catch((error) => console.error("Error cleaning up old caches:", error))
    );
});

// Fetch event - serve cached content or fetch from network
self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
            .match(event.request)
            .then((response) => {
                if (response) {
                    return response; // Return cached response if available
                }
                return fetch(event.request).catch(() => {
                    // If offline and fetch fails, serve fallback page
                    if (event.request.mode === "navigate") {
                        return caches.match("/offline.html");
                    }
                    return new Response("Network error occurred");
                });
            })
            .catch((error) => console.error("Error fetching resources:", error))
    );
});
