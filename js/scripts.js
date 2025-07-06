document.addEventListener('DOMContentLoaded', () => {
  AOS.init();

  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      const nombre = document.getElementById('nombre');
      const email = document.getElementById('email');
      const mensaje = document.getElementById('mensaje');

      // Validaciones personalizadas
      const nombreValido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/.test(nombre.value);
      const mensajeValido = mensaje.value.trim().length >= 10;

      if (!nombreValido) {
        nombre.setCustomValidity("Por favor, ingresa un nombre válido (mínimo 3 letras).");
      } else {
        nombre.setCustomValidity("");
      }

      if (!mensajeValido) {
        mensaje.setCustomValidity("El mensaje debe tener al menos 10 caracteres.");
      } else {
        mensaje.setCustomValidity("");
      }

      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault(); // Evita el envío real

        // 🟢 Guardar en localStorage
        const contacto = {
          nombre: nombre.value.trim(),
          email: email.value.trim(),
          mensaje: mensaje.value.trim(),
          fecha: new Date().toISOString()
        };

        let contactosGuardados = JSON.parse(localStorage.getItem('mensajesContacto')) || [];
        contactosGuardados.push(contacto);
        localStorage.setItem('mensajesContacto', JSON.stringify(contactosGuardados));

        // 🔔 Confirmación visual
        Swal.fire({
          icon: 'success',
          title: '¡Mensaje enviado!',
          text: 'Gracias por contactarnos. Te responderemos pronto.',
          confirmButtonColor: '#0d6efd'
        });

        form.reset();
        form.classList.remove('was-validated');
      }

      form.classList.add('was-validated');
    }, false);
  });
});
