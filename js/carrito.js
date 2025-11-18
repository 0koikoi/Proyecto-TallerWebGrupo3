// js/carrito.js

// Esperamos a que el componente 'header' termine de cargar
document.addEventListener("componentLoaded", (e) => {
    // Solo nos interesa cuando se carga el header
    if (e.detail.id !== "header") return;

    console.log("Iniciando lógica del carrito...");

    // ================================
    // SELECCIÓN DE ELEMENTOS (IDs en Español)
    // ================================
    const fondoCarrito = document.getElementById('fondo-carrito');
    const menuCarrito = document.getElementById('menu-carrito');
    const btnCerrarCarrito = document.getElementById('cerrar-carrito');
    const iconoCarritoHeader = document.querySelector('.cart-btn'); 
    const contenedorItems = document.getElementById('contenedor-items-carrito');
    const textoSubtotal = document.getElementById('subtotal-carrito');
    const burbujaContador = document.querySelector('.cart-count'); 
    
    let carrito = []; // Aquí guardamos los productos en memoria

    // ================================
    // FUNCIONES PRINCIPALES
    // ================================

    // 1. Abrir/Cerrar el menú lateral
    const alternarCarrito = () => {
        menuCarrito.classList.toggle('activo');
        fondoCarrito.classList.toggle('activo');
    };

    // Eventos de botones para abrir/cerrar
    if(iconoCarritoHeader) iconoCarritoHeader.addEventListener('click', alternarCarrito);
    if(btnCerrarCarrito) btnCerrarCarrito.addEventListener('click', alternarCarrito);
    if(fondoCarrito) fondoCarrito.addEventListener('click', alternarCarrito);

    // 2. Detectar Click en "Comprar" (Delegación de eventos global)
    document.addEventListener('click', (event) => {
        // Buscamos si el click fue en un botón de compra o carrito
        const btn = event.target.closest('.add-cart') || event.target.closest('button');
        
        // Validamos que sea un botón dentro de una tarjeta de producto
        if (btn && (btn.closest('.card-product') || btn.closest('.tarjeta'))) {
            
            // Evitamos que abra el carrito si el botón es del menú o buscador
            if(btn.closest('.search-box') || btn.closest('.nav-menu')) return;

            // Identificamos la tarjeta completa
            const tarjeta = btn.closest('.card-product') || btn.closest('.tarjeta');
            
            agregarAlCarrito(tarjeta);
            
            // Abrimos el carrito automáticamente si está cerrado
            if(!menuCarrito.classList.contains('activo')){
                alternarCarrito();
            }
        }
    });

    // 3. Leer datos de la tarjeta y sumar al array
    function agregarAlCarrito(tarjeta) {
        const titulo = tarjeta.querySelector('h3').textContent;
        const imagenSrc = tarjeta.querySelector('img').src;
        
        // Limpieza del precio (quita letras y símbolos)
        let textoPrecio = tarjeta.querySelector('.price') ? tarjeta.querySelector('.price').innerText : tarjeta.querySelector('.precio').innerText;
        
        // Tomamos el primer número que encontremos
        let precio = parseFloat(textoPrecio.replace(/[^0-9.]/g, '').split('\n')[0]);
        if (isNaN(precio)) { precio = 0; }

        const producto = {
            id: titulo.replace(/\s+/g, '-').toLowerCase(), // ID único
            titulo: titulo,
            precio: precio,
            imagen: imagenSrc,
            cantidad: 1
        };

        // Si ya existe, sumamos cantidad. Si no, lo agregamos.
        const existe = carrito.find(item => item.id === producto.id);
        if (existe) {
            existe.cantidad++;
        } else {
            carrito.push(producto);
        }

        dibujarCarrito();
    }

    // 4. Dibujar el HTML del carrito
    function dibujarCarrito() {
        contenedorItems.innerHTML = '';
        let total = 0;
        let totalProductos = 0;

        if (carrito.length === 0) {
            contenedorItems.innerHTML = '<div class="msj-vacio">Tu bolsa está vacía</div>';
        }

        carrito.forEach(item => {
            total += item.precio * item.cantidad;
            totalProductos += item.cantidad;

            const itemHTML = document.createElement('div');
            itemHTML.classList.add('item-carrito');
            itemHTML.innerHTML = `
                <img src="${item.imagen}" alt="${item.titulo}">
                <div class="detalles-item">
                    <h4>${item.titulo}</h4>
                    <p class="precio-item">S/ ${item.precio.toFixed(2)} x ${item.cantidad}</p>
                </div>
                <i class="fa-solid fa-trash btn-eliminar" data-id="${item.id}"></i>
            `;
            contenedorItems.appendChild(itemHTML);
        });

        // Actualizar totales visuales
        textoSubtotal.textContent = `S/ ${total.toFixed(2)}`;
        if(burbujaContador) burbujaContador.textContent = totalProductos;

        actualizarBarraEnvio(total);
    }

    // 5. Eliminar Item (Click en basurero)
    contenedorItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-eliminar')) {
            const id = e.target.getAttribute('data-id');
            carrito = carrito.filter(item => item.id !== id);
            dibujarCarrito();
        }
    });

    // 6. Barra de progreso
    function actualizarBarraEnvio(total) {
        const meta = 190.00; 
        const barra = document.getElementById('relleno-barra');
        const mensaje = document.getElementById('msj-envio');
        
        if (!barra || !mensaje) return;

        if (total >= meta) {
            mensaje.textContent = "¡Genial! Tienes envío gratis";
            barra.style.width = "100%";
            barra.style.backgroundColor = "#4cd137"; 
        } else {
            const falta = meta - total;
            const porcentaje = (total / meta) * 100;
            mensaje.textContent = `¡Te falta S/ ${falta.toFixed(2)} para envío gratis!`;
            barra.style.width = `${porcentaje}%`;
            barra.style.backgroundColor = "var(--primary-color)";
        }
    }
});

//falta arreglar esto dhsakdhkjash