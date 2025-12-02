const nombre = document.getElementById("name")
const email = document.getElementById("email")
const pass = document.getElementById("password")
const form = document.getElementById("form")
const parrafo = document.getElementById("warnings")

form.addEventListener("submit", e => {
    e.preventDefault() // Detenemos el envío automático para validar primero
    let warnings = ""
    let entrar = false
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    parrafo.innerHTML = ""

    if (nombre.value.length < 4) {
        warnings += "El nombre es muy corto <br>"
        entrar = true
    }

    if (!regexEmail.test(email.value)) {
        warnings += "El email no es válido <br>"
        entrar = true
    }

    if (pass.value.length < 6) {
        warnings += "La contraseña es muy corta <br>"
        entrar = true
    }

    if (entrar) {
        parrafo.innerHTML = warnings
    } else {
        parrafo.style.color = "green";
        parrafo.innerHTML = "Enviando datos...";
        // AQUÍ ESTÁ LA MAGIA: Si no hay errores, enviamos el formulario
        e.currentTarget.submit(); 
    }
})