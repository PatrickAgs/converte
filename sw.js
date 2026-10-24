// Guarda a página e as bibliotecas no aparelho: depois da primeira visita o Converte abre sem internet.
const CACHE = "converte-v1";
const FILES = [
  "./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png",
  "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js",
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(FILES.map((u) => c.add(u).catch(() => {})))));
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  const page = url.origin === location.origin;
  // página: tenta a internet primeiro (pega atualizações) e cai para a cópia guardada
  if (page) {
    e.respondWith(fetch(e.request).then((r) => {
      const copy = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); return r;
    }).catch(() => caches.match(e.request).then((r) => r || caches.match("./index.html"))));
    return;
  }
  // bibliotecas e fontes: usa a cópia guardada; se não tiver, baixa e guarda
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request).then((r) => {
    const copy = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); return r;
  })));
});
