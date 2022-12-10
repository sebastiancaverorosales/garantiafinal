<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD

$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "dbgarantias";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

if ($conexionBD -> connect_errno) {
    echo json_encode("Error al conectar a la base de datos");
    exit();
}



?>