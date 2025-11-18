document.addEventListener("DOMContentLoaded", function () {
  const botonesCarrito = document.querySelectorAll(".add-cart");
  const notificacion = document.getElementById("cart-notification");

  botonesCarrito.forEach((boton) => {
    boton.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      // Mostrar notificación
      notificacion.classList.add("show");

      // Ocultar después de 3 segundos
      setTimeout(() => {
        notificacion.classList.remove("show");
      }, 3000);

      // Feedback visual en el botón
      const icono = this.querySelector("i");
      const iconoOriginal = icono.className;

      icono.className = "fa-solid fa-check";
      setTimeout(() => {
        icono.className = iconoOriginal;
      }, 1000);
    });
  });
});
