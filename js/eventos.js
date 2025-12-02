function animarTitulo() {
    let titulo = document.getElementById("titulo");
    titulo.classList.add("brillo");
    setTimeout(function() {
        titulo.classList.remove("brillo");
    }, 800);
}

document.getElementById("titulo").addEventListener("click", animarTitulo);


function resaltarTarjeta(event) {
    event.currentTarget.classList.add("zoom-brillo");
}

function quitarResaltado(event) {
    event.currentTarget.classList.remove("zoom-brillo");
}

let tarjetas = document.querySelectorAll(".tarjeta");

tarjetas.forEach(function(tarjeta) {
    tarjeta.addEventListener("mouseover", resaltarTarjeta);
    tarjeta.addEventListener("mouseout", quitarResaltado);
});
