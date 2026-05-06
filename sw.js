const CACHE = "workout-tracker-v9";
const ASSETS = [
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap"
];

// Install: cache all core assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// Activate: delete old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: network-first for Firebase, cache-first for local assets
self.addEventListener("fetch", event => {
  const url = event.request.url;

  // Always go to network for Firebase (auth, Firestore)
  if (url.includes("firestore.googleapis.com") ||
      url.includes("firebase") ||
      url.includes("google.com/v1/messages")) {
    event.respondWith(fetch(event.request).catch(() => new Response("", { status: 503 })));
    return;
  }

  // Cache-first for everything else (fonts, app shell)
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type === "opaque") return response;
        const clone = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, clone));
        return response;
      });
    }).catch(() => caches.match("./index.html"))
  );
});
