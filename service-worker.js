self.addEventListener("install", (event) => {
    console.log("Service Worker installing.");
    // Add caching or pre-caching logic here
});

self.addEventListener("fetch", (event) => {
    console.log("Service Worker fetching.", event.request.url);
    // Add network or caching logic here
});
