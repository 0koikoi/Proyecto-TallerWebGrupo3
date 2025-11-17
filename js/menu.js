function initMenu() {
    console.log("Intentando iniciar menú...");

    const hamburgerMenu = document.getElementById('navToggle');
    const navLinks = document.getElementById('navMenu');

    if (hamburgerMenu && navLinks) {

        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('open');

            const isExpanded = navLinks.classList.contains('open');
            hamburgerMenu.setAttribute('aria-expanded', isExpanded);
        });
    } else {
        console.warn("Elementos del menú no encontrados todavía.");
    }
}

// Llamar initMenu cuando el header se haya cargado
document.addEventListener('componentLoaded', (e) => {
    if (e.detail && e.detail.id === 'header') {
        initMenu();
    }
});

// Fallback: si el header ya existe (páginas estáticas), inicializa al DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('navToggle')) {
        initMenu();
    }
});