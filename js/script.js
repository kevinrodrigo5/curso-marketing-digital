// scripts.js


const formulario = document.querySelector("form");

if (formulario) {
  formulario.addEventListener("submit", function (e) {
    if (!formulario.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      alert("Formulario enviado correctamente. Nos pondremos en contacto contigo pronto.");
    }
    formulario.classList.add("was-validated");
  });
}
