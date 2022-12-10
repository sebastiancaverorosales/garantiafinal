<?php
include '../../db/conex.php';
$archivo = $_FILES["archivo"];
$resultado = move_uploaded_file($archivo["tmp_name"], "../../../public/images/users/".$archivo["name"]);
// $currentLocation = "/intro.jpg";
// $newLocation = '../../../public/images/users/intro.jpg';
// rename($currentLocation, $newLocation);
if ($resultado) {
    echo $archivo["name"];
} else {
    echo "Error al subir archivo";
}
?>