// Service Worker de limpieza
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// La lógica de push se queda comentada o vacía para que no dé errores
/*
self.addEventListener('push', function(e) {
  const data = e.data.json();
  self.registration.showNotification("Misa Aeropuerto", { body: data.msg });
});
*/
