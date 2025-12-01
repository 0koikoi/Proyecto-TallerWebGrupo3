// /js/menu.js - CÓDIGO FINAL Y COMPLETO CON PERSISTENCIA Y COMPRA

// ************************************************************
// LÓGICA 1: Declaración Global de Variables
// ************************************************************
let carrito = []; 

// Se obtienen los elementos del DOM (Para alcance global)
const carritoPanelLateral = document.getElementById("carrito-panel-lateral");
const contenedorElementosCarrito = document.getElementById("contenedor-elementos-carrito");
const precioTotalCarrito = document.getElementById("precio-total-carrito");
const cartNotification = document.getElementById("cart-notification");


// ************************************************************
// LÓGICA 2: Funciones Auxiliares
// ************************************************************

// --- FUNCIONES DE PERSISTENCIA (LocalStorage) ---
function guardarCarrito() {
    localStorage.setItem('carritoTienda', JSON.stringify(carrito));
}

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carritoTienda');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado); 
    }
}
// --- FIN PERSISTENCIA ---


// ---- Función para AGREGAR producto ----
function agregarAlCarrito(datosProducto) {
    let valorPrecio = parseFloat(datosProducto.price.replace("S/", "").replace(",", "."));
    const elementoExistente = carrito.find((item) => item.name === datosProducto.name);

    if (elementoExistente) {
        elementoExistente.quantity++;
    } else {
        carrito.push({
            id: Date.now(),
            name: datosProducto.name,
            price: valorPrecio,
            image: datosProducto.image,
            quantity: 1,
        });
    }

    actualizarContadoresCarrito();
    renderizarCarrito();
    mostrarNotificacion();
    guardarCarrito(); // Guarda después de agregar/modificar
}

// ---- Función para FINALIZAR COMPRA ----
function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. ¡Añade productos para comprar!");
        return;
    }

    const total = carrito.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

    // Muestra el mensaje de éxito en el panel
    mostrarMensajeExito(total); 

    // Vaciar el carrito y actualizar
    carrito = []; 
    actualizarContadoresCarrito();
    guardarCarrito(); // Guarda el carrito vacío
}

// ---- Función para mostrar el Mensaje de Éxito (Usa clases CSS) ----
function mostrarMensajeExito(total) {
    if (!contenedorElementosCarrito) return; 

    const carritoPanelLateral = document.getElementById("carrito-panel-lateral");
    if (carritoPanelLateral && !carritoPanelLateral.classList.contains("abierto")) {
        carritoPanelLateral.classList.add("abierto");
    }

    // Usa las CLASES CSS para el diseño (mensaje-compra-finalizada, icono-confirmacion, etc.)
    contenedorElementosCarrito.innerHTML = `
        <div class="mensaje-compra-finalizada">
            <i class="fa-solid fa-check-circle icono-confirmacion"></i> 
            
            <h4>¡Pedido Procesado!</h4>
            <p>Gracias por tu compra.</p>
            <p class="total-pagado">Total Pagado: S/${total}</p>
        </div>
    `;

    // Ocultar el pie de página del carrito (Total y Botón de Compra)
    const carritoPie = document.querySelector(".carrito-pie");
    if (carritoPie) {
        carritoPie.style.display = 'none';
    }

    // Temporizador para restablecer la vista después de 5 segundos
    setTimeout(() => {
        if (carritoPie) {
            carritoPie.style.display = 'flex'; // Vuelve a mostrar el pie
        }
        renderizarCarrito(); // Renderiza el carrito vacío
    }, 5000); 
}

function renderizarCarrito() {
    if (!contenedorElementosCarrito) return;

    // Código para limpiar y dibujar los elementos del carrito...

    contenedorElementosCarrito.innerHTML = "";

    if (carrito.length === 0) {
        contenedorElementosCarrito.innerHTML = '<p class="mensaje-carrito-vacio">El carrito está vacío.</p>';
    } else {
        carrito.forEach((item) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("elemento-carrito");
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" />
                <div class="detalles-elemento">
                    <h4>${item.name}</h4>
                    <p class="precio">S/${item.price.toFixed(2)}</p>
                </div>
                <div class="control-cantidad">
                    <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="input-cantidad" />
                </div>
                <button class="btn-eliminar-elemento" data-id="${item.id}">
                    <i class="fa-solid fa-trash-alt"></i>
                </button>
            `;
            contenedorElementosCarrito.appendChild(itemElement);
        });
    }

    actualizarContadoresCarrito();
    agregarEscuchadoresCarrito();
}

function actualizarContadoresCarrito() {
    const totalItems = carrito.reduce((sum, item) => sum + item.quantity, 0);
    const precioTotal = carrito.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const cartCountSpan = document.querySelector(".cart-count");
    if (cartCountSpan) cartCountSpan.textContent = totalItems;

    if (precioTotalCarrito) precioTotalCarrito.textContent = `S/${precioTotal.toFixed(2)}`;
}

function agregarEscuchadoresCarrito() {
    // Escuchadores de elementos dentro del carrito (Eliminar y Cantidad)
    document.querySelectorAll(".btn-eliminar-elemento").forEach((button) => {
        button.addEventListener("click", (e) => {
            const idToRemove = parseInt(e.currentTarget.dataset.id);
            carrito = carrito.filter((item) => item.id !== idToRemove);
            renderizarCarrito();
            guardarCarrito(); 
        });
    });

    document.querySelectorAll(".input-cantidad").forEach((input) => {
        input.addEventListener("change", (e) => {
            const idToUpdate = parseInt(e.currentTarget.dataset.id);
            let nuevaCantidad = parseInt(e.currentTarget.value);

            if (nuevaCantidad < 1 || isNaN(nuevaCantidad)) {
                nuevaCantidad = 1;
                e.currentTarget.value = 1;
            }

            const item = carrito.find((item) => item.id === idToUpdate);
            if (item) {
                item.quantity = nuevaCantidad;
                actualizarContadoresCarrito();
                guardarCarrito(); 
            }
        });
    });
}

function mostrarNotificacion() {
    if (cartNotification) {
        cartNotification.classList.add("show");
        setTimeout(() => {
            cartNotification.classList.remove("show");
        }, 2000);
    }
}

function alternarPanelCarrito() {
    if (carritoPanelLateral) {
        carritoPanelLateral.classList.toggle("abierto");
        if (carritoPanelLateral.classList.contains("abierto")) {
            renderizarCarrito();
        }
    }
}


// ************************************************************
// LÓGICA 3: Activación del Menú (Depende de la carga del Header)
// ************************************************************
document.addEventListener("componentLoaded", (e) => {
    if (e.detail.id !== "header") return;
    
    // 1. Carga los datos guardados del LocalStorage
    cargarCarrito(); 

    // --- Lógica del Menú de Navegación ---
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            const opened = navMenu.classList.toggle("open");
            navMenu.setAttribute("aria-hidden", !opened);
            navToggle.setAttribute("aria-expanded", opened);
        });
    }

    // --- Lógica de Apertura/Cierre del Panel Carrito ---
    const cartBtn = document.querySelector(".cart-btn");
    const cerrarCarritoBtn = document.getElementById("cerrar-carrito-btn");

    if (cartBtn) cartBtn.addEventListener("click", alternarPanelCarrito);
    if (cerrarCarritoBtn) cerrarCarritoBtn.addEventListener("click", alternarPanelCarrito);

    actualizarContadoresCarrito(); // Actualiza el número en el icono de canasta
});


// ************************************************************
// LÓGICA 4: Activación de Botones de Producto y Botón de Compra (Activa en todas las páginas)
// ************************************************************
document.addEventListener("DOMContentLoaded", () => {
    
    // --- 4.1 Activación del Botón de Compra ---
    const botonComprarAhora = document.querySelector(".btn-comprar"); 
    if (botonComprarAhora) {
        botonComprarAhora.addEventListener("click", finalizarCompra); 
    }

    // --- 4.2 Activación de Botones de Producto ---
    const addCartBtns = document.querySelectorAll(".add-cart");
    addCartBtns.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();

            // Feedback visual (animación de check)
            const icono = e.currentTarget.querySelector("i");
            const iconoOriginal = icono.className;
            icono.className = "fa-solid fa-check";
            setTimeout(() => { 
                icono.className = iconoOriginal;
            }, 1000);

            // Obtención de datos y adición al carrito
            const cardProduct = e.target.closest(".card-product");
            if (!cardProduct) return;

            const name = cardProduct.querySelector("h3").textContent.trim();
            const priceElement = cardProduct.querySelector(".price");
            const priceText = priceElement.childNodes[0].textContent.trim();
            const image = cardProduct.querySelector(".container-img img").src;

            const datosProducto = { name, price: priceText, image };
            agregarAlCarrito(datosProducto); 
        });
    });
});