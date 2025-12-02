<?php
include 'conexion.php'; 

if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['password'])) {
    
    $nombre = $_POST["name"];
    $email = $_POST["email"];
    $telefono = $_POST["telefono"];
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

    $checkEmail = $conexion->prepare("SELECT id FROM usuarios WHERE correo = ?");
    $checkEmail->bind_param("s", $email);
    $checkEmail->execute();
    $checkEmail->store_result();

    if ($checkEmail->num_rows > 0) {
        echo '<script>
                alert("Este correo ya está registrado");
                window.location = "../Registro.html";
              </script>';
        exit();
    }

    $stmt = $conexion->prepare("INSERT INTO usuarios (nombre, correo, telefono, password) VALUES (?, ?, ?, ?)");
    // "ssss" significa que son 4 Strings
    $stmt->bind_param("ssss", $nombre, $email, $telefono, $password);

    if ($stmt->execute()) {
        echo '<script>
                alert("Usuario registrado exitosamente");
                window.location = "../login.html";
              </script>';
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conexion->close();
} else {
    header("Location: ../Registro.html");
}
?>