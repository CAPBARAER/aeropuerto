self.addEventListener('push', function(e) {
  const data = e.data.json();
  self.registration.showNotification("Misa Aeropuerto", { body: data.msg });
});
