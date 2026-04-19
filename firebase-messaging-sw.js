// Importa y configura el SDK de Firebase (versión 8)
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Inicializa Firebase en el Service Worker con tu configuración completa.
const firebaseConfig = {
    apiKey: "AIzaSyChBgp9zJMITMXAGq7HJuTFekUW2mKquaE",
    authDomain: "misas-aeropuerto-madrid.firebaseapp.com",
    databaseURL: "https://misas-aeropuerto-madrid-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "misas-aeropuerto-madrid",
    storageBucket: "misas-aeropuerto-madrid.firebasestorage.app",
    messagingSenderId: "3033346562",
    appId: "1:3033346562:web:ffc40f202d4b6c791eed1b"
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
        data: payload.data // Incluye cualquier dato adicional enviado con la notificación
    };

    // Muestra la notificación al usuario
    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Manejador opcional para cuando el usuario hace clic en la notificación
self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click received.');
    event.notification.close(); // Cierra la notificación

    // Si la notificación contiene una URL en 'data.click_action', ábrela
    if (event.notification.data && event.notification.data.click_action) {
        event.waitUntil(
            clients.openWindow(event.notification.data.click_action)
        );
    } else {
        // Por defecto, abre la raíz de tu sitio web
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});
