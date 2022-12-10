<?php

include '../../db/conex.php';

//=========================================================
if (isset($_GET["login"])) {
    $sqlGarantias = mysqli_query($conexionBD,"CALL LOGIN('$_GET[login]')");
    $usuarios[0] = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
    if(mysqli_num_rows($sqlGarantias) > 0){
        $usuarios[1] = ["success"=>1];
        echo json_encode($usuarios);
        exit();
    }
    else{
        $usuarios[1] = ["success"=>0];
        echo json_encode($usuarios);
        exit();
    }
}

if (isset($_GET["register"])) {
    
    $data = json_decode(file_get_contents("php://input"));
    
    $nombre = $data->nombre;
    $ap_paterno = $data->ap_paterno;
    $ap_materno = $data->ap_materno;
    $contrasena = $data->contrasena;
    $direccion = $data->direccion;
    $dni = $data->dni;
    $foto = $data->fotoname;
    $celular = $data->celular;
    $genero = $data->genero;
    $user = substr($nombre, 0, 1) . $ap_paterno . substr($ap_materno, 0, 1) . rand(1, 1000);
    
    $sqlGarantias = mysqli_query($conexionBD,"CALL REGISTER('$user', '$contrasena', '$nombre', '$ap_paterno', '$ap_materno', '$dni', '$direccion', '$celular', 3,'$genero', '$foto')");
    echo json_encode($user);
    exit();
}
    
if (isset($_GET["editer"])) {
    
    $data = json_decode(file_get_contents("php://input"));
    
    $iduser = $data->id;
    $nombre = $data->nombre;
    $ap_paterno = $data->ap_paterno;
    $ap_materno = $data->ap_materno;
    $contrasena = $data->contrasena;
    $direccion = $data->direccion;
    $dni = $data->dni;
    $foto = $data->fotoname;
    $celular = $data->celular;
    $genero = $data->genero;

    $sqlGarantias = mysqli_query($conexionBD,"CALL EDITER('$iduser', '$contrasena', '$nombre', '$ap_paterno', '$ap_materno', '$dni', '$direccion', '$celular', '$genero', '$foto')");
    echo json_encode("exito");
    exit();
}

if (isset($_GET["listaranalistas"])) {
    $sqlGarantias = mysqli_query($conexionBD,"CALL LISTARANALISTA()");
    if(mysqli_num_rows($sqlGarantias) > 0){
        $analistas = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
        echo json_encode($analistas);
        exit();
    }
    else{ echo json_encode([["success"=>0]]); }
}

if (isset($_GET["crearanalista"])) {
    $data = json_decode(file_get_contents("php://input"));

    $nombre = $data->nombre;
    $ap_paterno = $data->ap_paterno;
    $ap_materno = $data->ap_materno;
    $contrasena = $data->contrasena;
    $direccion = $data->direccion;
    $dni = $data->dni;
    $foto = $data->fotoname;
    $celular = $data->celular;
    $genero = $data->genero;
    $user = substr($nombre, 0, 1) . $ap_paterno . substr($ap_materno, 0, 1) . rand(1, 1000);

    $sqlGarantias = mysqli_query($conexionBD,"CALL REGISTER('$user', '$contrasena', '$nombre', '$ap_paterno', '$ap_materno', '$dni', '$direccion', '$celular', 2,'$genero', '$foto')");

    echo json_encode($user);
    exit();
}
if (isset($_GET['eliminar'])){
    $data = json_decode(file_get_contents("php://input"));

    $sqlGarantias = mysqli_query($conexionBD,"CALL ELIMINARUSUARIO('$data')");

    echo json_encode($data);
    exit();
}


if (isset($_GET['listarclientes'])) {
    $sqlGarantias = mysqli_query($conexionBD,"CALL LISTARCLIENTES()");
    if(mysqli_num_rows($sqlGarantias) > 0){
        $usuarios = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
        echo json_encode($usuarios);
    }
    else{ echo json_encode([["success"=>0]]); }
    exit();
}

$sqlGarantias = mysqli_query($conexionBD,"CALL LISTARUSUARIO()");
if(mysqli_num_rows($sqlGarantias) > 0){
    $usuarios = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
    echo json_encode($usuarios);
    exit();
}
else{ echo json_encode([["success"=>0]]); }
?>