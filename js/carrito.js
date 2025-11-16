// Función para mostrar el toast de confirmación
function openProductModal({ img, nombre, precio, cantidad }) {
  document.getElementById("modal-product-img").src = img;
  document.getElementById("modal-product-name").textContent = nombre;
  document.getElementById("modal-product-price").textContent = "S/ " + precio;
  document.getElementById("modal-product-qty").textContent = "Cantidad: " + cantidad;
s
  document.getElementById("modal-overlay").style.display = "block";

  const modal = document.getElementById("modal-cart");
  modal.style.display = "block";

  setTimeout(() => {
    modal.classList.add("show");
  }, 10);
}

function closeProductModal() {
  const modal = document.getElementById("modal-cart");
  modal.classList.remove("show");

  setTimeout(() => {
    modal.style.display = "none";
    document.getElementById("modal-overlay").style.display = "none";
  }, 250);
}

document.getElementById("modal-close").addEventListener("click", closeProductModal);
document.getElementById("modal-overlay").addEventListener("click", closeProductModal);
