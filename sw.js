// دفتر تمرین — service worker: keeps the app working without internet.
// The page itself (index.html) is network-first: with internet, every launch
// gets the latest version straight from the server (bypassing the HTTP cache);
// offline, or if the network is slow, the cached copy opens instead.
// Icons and the manifest are cache-first and refresh in the background.
const CACHE = 'daftar-tamrin-3.8.3';
const FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png'
];
const NET_TIMEOUT = 4000;

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE)
    .then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' }))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('daftar-tamrin-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isPage(req, url) {
  return req.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('/index.html');
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(new URL('./',self.location.href).pathname)) return;

  if (isPage(req, url)) {
    event.respondWith(caches.open(CACHE).then(async cache => {
      const cached = (await cache.match(req, { ignoreSearch: true })) || (await cache.match('./index.html')) || (await cache.match('./'));
      const network = fetch(req, { cache: 'no-cache' }).then(res => {
        if (res && res.ok) { event.waitUntil(Promise.all([cache.put('./index.html', res.clone()),cache.put('./', res.clone())]).catch(()=>{})); }
        return res;
      }).catch(() => null);
      if (!cached) return (await network) || new Response('آفلاین', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
      const timeout = new Promise(r => setTimeout(() => r(null), NET_TIMEOUT));
      const res = await Promise.race([network, timeout]);
      if (res && res.ok) return res;
      event.waitUntil(network);
      return cached;
    }));
    return;
  }

  event.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(req, { ignoreSearch: true });
    const network = fetch(req, { cache: 'no-cache' }).then(res => {
      if (res && res.ok) event.waitUntil(cache.put(req,res.clone()).catch(()=>{}));
      return res;
    }).catch(() => null);
    if (cached) { event.waitUntil(network); return cached; }
    const res = await network;
    return res || new Response('', { status: 504 });
  }));
});
