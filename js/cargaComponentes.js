function cargaComponentes(id, file) {
    fetch(file)
        .then(res => res.text())
        .then(html => {
            document.getElementById(id).innerHTML = html;
            // Emitir evento para notificar que el componente se cargó
            document.dispatchEvent(new CustomEvent('componentLoaded', { detail: { id } }));
        })
        .catch(err => console.error("Error cargando", file, err));
}

cargaComponentes("header", "componentes/header.html");
cargaComponentes("footer", "componentes/footer.html");