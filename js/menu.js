// Menú hamburguesa
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  navToggle.classList.toggle("active");
});

// Cerrar menú al hacer clic fuera en móvil
document.addEventListener("click", (e) => {
  const clickInside = navMenu.contains(e.target) || navToggle.contains(e.target);
  if (!clickInside && navMenu.classList.contains("open")) {
    navMenu.classList.remove("open");
    navToggle.classList.remove("active");
  }
});

// Dropdown mega menú
const dropdownBtn = document.querySelector(".dropdown-btn");
const megaMenu = document.querySelector(".mega-menu");

dropdownBtn.addEventListener("click", () => {
  megaMenu.classList.toggle("open");
});

// Cerrar dropdown al hacer clic fuera
document.addEventListener("click", (e) => {
  const inside =
    megaMenu.contains(e.target) || dropdownBtn.contains(e.target);

  if (!inside) {
    megaMenu.classList.remove("open");
  }
});