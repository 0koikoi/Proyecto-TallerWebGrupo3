<?php
session_start();
include 'conexion.php';

if (isset($_POST['usuario']) && isset($_POST['password'])) {
    $usuario = $_POST["usuario"];
    $password = $_POST["password"];

    // Consulta segura
    $stmt = $conexion->prepare("SELECT id, nombre, password FROM usuarios WHERE nombre = ?");
    $stmt->bind_param("s", $usuario);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        $data = $resultado->fetch_assoc();
        
        // Verificar la contraseña encriptada
        if (password_verify($password, $data["password"])) {
            $_SESSION["usuario_id"] = $data["id"];
            $_SESSION["usuario_nombre"] = $data["nombre"];
            // Redirigir a la tienda
            header("Location: ../index.html"); // Ajusta la ruta a tu HTML principal
            exit();
        } else {
            echo '<script>alert("Contraseña incorrecta"); window.location = "../login.html";</script>';
        }
    } else {
        echo '<script>alert("El usuario no existe"); window.location = "../login.html";</script>';
    }
    $stmt->close();
    $conexion->close();
}
?>