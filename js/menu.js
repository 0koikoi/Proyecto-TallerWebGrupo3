// MENU – se activa SOLO cuando el header ya cargó
document.addEventListener("componentLoaded", (e) => {
    //si el componente cargado no es el header, salir
    if (e.detail.id !== "header") return;

    //configuración del menú de navegación
    const navToggle = document.getElementById("navToggle"); // Botón de menú
    const navMenu   = document.getElementById("navMenu"); // Menú de navegación

    //si por algún motivo no los encuentra, avisar y salir
    if (!navToggle || !navMenu) {
        console.warn("No existe el menú en el header cargado.");
        return;
    }

    //esto según yo, activa el menú al hacer click en el botón
    navToggle.addEventListener("click", () => {
        const opened = navMenu.classList.toggle("open");
        navMenu.setAttribute("aria-hidden", !opened);
        navToggle.setAttribute("aria-expanded", opened);//y esto lo expande
    });

});