/*Zoom suave en la imagen cuando pasas el mouse*/

const img = document.querySelector(".nosotros");

img.addEventListener("mouseenter", () => {
  img.style.transform = "scale(1.05)";
});

img.addEventListener("mouseleave", () => {
  img.style.transform = "scale(1)";
});



/*Cambio de color gradual con animación*/ 
document.addEventListener("DOMContentLoaded", function () {
    const titulo = document.querySelector(".titulo-nosotros");

    // Guardar el color original
    const colorOriginal = window.getComputedStyle(titulo).color;

    // Cuando pasa el mouse
    titulo.addEventListener("mouseover", () => {
        titulo.style.color = "#F4A6B1";
    });

    // Cuando quita el mouse
    titulo.addEventListener("mouseout", () => {
        titulo.style.color = colorOriginal;
    });
});






