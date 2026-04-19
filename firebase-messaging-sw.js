// Importa y configura el SDK de Firebase (versión 8)
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Inicializa Firebase en el Service Worker.
// ¡IMPORTANTE! Hemos añadido tu projectId aquí.
const firebaseConfig = {
    projectId: "misas-aeropuerto-madrid" // <-- ¡Aquí está la corrección!
};
firebase.initializeApp(firebaseConfig);

// Obtén una referencia al objeto de mensajería (Messaging)
const messaging = firebase.messaging();

// Maneja los mensajes de fondo (cuando la aplicación web no está en primer plano)
messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const notificationTitle = payload.notification.title || 'Nueva Notificación de Misa';
    const notificationOptions = {
        body: payload.notification.body || '¡Hay novedades sobre las misas!',
        icon: '/images/bell-icon.png', // Opcional: Reemplaza con la ruta a tu propio icono
        // badge: '/images/badge.png', // Opcional: para notificaciones en Android
        // El sonido de notificación será el predeterminado del sistema operativo.
        // No se garantiza la reproducción de sonidos personalizados en segundo plano.
    };

    // Muestra la notificación al usuario
    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Manejador opcional para cuando el usuario hace clic en la notificación
self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click received.');
    event.notification.close(); // Cierra la notificación

    // Abre la página principal de misas al hacer clic
    event.waitUntil(
        clients.openWindow('/') // Abre la raíz de tu sitio web
    );
});
