/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-963a54e';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./bidnici_ii_002.html","./bidnici_ii_005.html","./bidnici_ii_006.html","./bidnici_ii_007.html","./bidnici_ii_008.html","./bidnici_ii_009.html","./bidnici_ii_010.html","./bidnici_ii_011.html","./bidnici_ii_012.html","./bidnici_ii_013.html","./bidnici_ii_014.html","./bidnici_ii_015.html","./bidnici_ii_016.html","./bidnici_ii_017.html","./bidnici_ii_018.html","./bidnici_ii_019.html","./bidnici_ii_020.html","./bidnici_ii_021.html","./bidnici_ii_022.html","./bidnici_ii_023.html","./bidnici_ii_024.html","./bidnici_ii_025.html","./bidnici_ii_026.html","./bidnici_ii_027.html","./bidnici_ii_028.html","./bidnici_ii_029.html","./bidnici_ii_030.html","./bidnici_ii_031.html","./bidnici_ii_032.html","./colophon.html","./favicon.png","./index.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001_fmt.png","./resources/image002_fmt.png","./resources/obalka_bidnici_ii_fmt.png","./resources/upoutavka_eknihy_fmt.png","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
