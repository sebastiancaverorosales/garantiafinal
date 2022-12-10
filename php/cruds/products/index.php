<?php

include '../../db/conex.php';

if (isset($_GET["dashboardcantidades"])) {

    $sqlGarantias = mysqli_query($conexionBD,"SELECT COUNT(*) FROM pedido");
    if(mysqli_num_rows($sqlGarantias) > 0){
        $data[0] = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
    }
    else{ $data[0] = 0; }

    $sqlGarantias = mysqli_query($conexionBD,"SELECT COUNT(*) FROM garantia");
    if(mysqli_num_rows($sqlGarantias) > 0){
        $data[1] = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
    }
    else{ $data[1] = 0; }

    $sqlGarantias = mysqli_query($conexionBD,"SELECT COUNT(*) FROM producto");
    if(mysqli_num_rows($sqlGarantias) > 0){
        $data[2] = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
    }
    else{ $data[2] = 0; }

    $sqlGarantias = mysqli_query($conexionBD,"SELECT COUNT(*) FROM revisión");
    if(mysqli_num_rows($sqlGarantias) > 0){
        $data[3] = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
    }
    else{ $data[3] = 0; }

    $sqlGarantias = mysqli_query($conexionBD,"SELECT COUNT(*) FROM categoriaproducto");
    if(mysqli_num_rows($sqlGarantias) > 0){
        $data[4] = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
    }
    else{ $data[4] = 0; }

    $sqlGarantias = mysqli_query($conexionBD,"SELECT COUNT(*) FROM marca");
    if(mysqli_num_rows($sqlGarantias) > 0){
        $data[5] = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
    }
    else{ $data[5] = 0; }

    echo json_encode($data);
    exit();
}

// if (isset($_GET["reportes"])) {

//     $sqlGarantias = mysqli_query($conexionBD,"CALL REPORTES");
//     if(mysqli_num_rows($sqlGarantias) > 0){
//         $data[0] = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
//     }
//     else{ $data[0] = 0; }

//     $sqlGarantias = mysqli_query($conexionBD,"CALL REPORTES1");
//     if(mysqli_num_rows($sqlGarantias) > 0){
//         $data[1] = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
//     }
//     else{ $data[1] = 0; }

//     $sqlGarantias = mysqli_query($conexionBD,"CALL REPORTES2");
//     if(mysqli_num_rows($sqlGarantias) > 0){
//         $data[2] = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
//     }
//     else{ $data[2] = 0; }

//     // $sqlGarantias = mysqli_query($conexionBD,"SELECT * FROM revisión");
//     // if(mysqli_num_rows($sqlGarantias) > 0){
//     //     $data[3] = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
//     // }
//     // else{ $data[3] = 0; }

//     // $sqlGarantias = mysqli_query($conexionBD,"SELECT * FROM usuario WHERE id_rol = 2");
//     // if(mysqli_num_rows($sqlGarantias) > 0){
//     //     $data[4] = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
//     // }

//     // else{ $data[4] = 0; }
//     echo json_encode($data);
//     exit();
// }

if (isset($_GET["listarrevisiones"])) {
    $sqlGarantias = mysqli_query($conexionBD,"CALL LISTARREVISION()");
    if(mysqli_num_rows($sqlGarantias) > 0){
        $revisiones = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
        echo json_encode($revisiones);
        exit();
    }
    else{ echo json_encode([["success"=>0]]); }
}

if (isset($_GET["listarpedidos"])) {
    $sqlGarantias = mysqli_query($conexionBD,"CALL LISTARPEDIDOS()");
    if(mysqli_num_rows($sqlGarantias) > 0){
        $pedidos = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
        echo json_encode($pedidos);
        exit();
    }
    else{ echo json_encode([["success"=>0]]); }
}

if (isset($_GET["listargarantias"])) {
    $sqlGarantias = mysqli_query($conexionBD,"CALL LISTARGARANTIAS()");
    if(mysqli_num_rows($sqlGarantias) > 0){
        $revisiones = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
        echo json_encode($revisiones);
        exit();
    }
    else{ echo json_encode([["success"=>0]]); }
}

if (isset($_GET["listarproductos"])) {
    $sqlGarantias = mysqli_query($conexionBD,"CALL LISTARPRODUCTOS()");
    if(mysqli_num_rows($sqlGarantias) > 0){
        $productos = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
        echo json_encode($productos);
        exit();
    }
    else{ echo json_encode([["success"=>0]]); }
}

if (isset($_GET["editarrevisiones"])) {
    $data = json_decode(file_get_contents("php://input"));

    $idRevision = $data->idRevision;
    $idProducto = $data->idProducto;
    $idUsuario = $data->idUsuario;
    $descripcion = $data->descripcion;

    $sqlGarantias = mysqli_query($conexionBD,"CALL EDITARREVISION('$idRevision', '$idProducto', '$idUsuario', '$descripcion')");
    echo json_encode($data);
    exit();
}

if (isset($_GET["insertarrevisiones"])) {
    $data = json_decode(file_get_contents("php://input"));
    
    $idRevision = $data->idRevision;
    $idProducto = $data->idProducto;
    $idUsuario = $data->idUsuario;
    $descripcion = $data->descripcion;

    $sqlGarantias = mysqli_query($conexionBD,"CALL INSERTARREVISION('$idRevision','$idProducto', '$idUsuario', '$descripcion')");
    echo json_encode($data->idRevision);
    exit();
}

if (isset($_GET["eliminarproducto"])) {
    $data = json_decode(file_get_contents("php://input"));
    
    $sqlGarantias = mysqli_query($conexionBD, "DELETE FROM PRODUCTO WHERE id_producto = '$data'");
    echo json_encode($data);
    exit();
}

if (isset($_GET['mostrarmarcas'])) {
    $sqlGarantias = mysqli_query($conexionBD,"SELECT * FROM MARCA");
    if(mysqli_num_rows($sqlGarantias) > 0){
        $marcas = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
        echo json_encode($marcas);
        exit();
    }
    else{ echo json_encode([["success"=>0]]); }

}

if (isset($_GET['mostrarcategorias'])) {
    $sqlGarantias = mysqli_query($conexionBD,"SELECT * FROM CATEGORIAPRODUCTO");
    if(mysqli_num_rows($sqlGarantias) > 0){
        $categorias = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
        echo json_encode($categorias);
        exit();
    }
    else{ echo json_encode([["success"=>0]]); }
}

if (isset($_GET['crearmarca'])) {
    $data = json_decode(file_get_contents("php://input"));
    $id = $data->id;
    $nombre = $data->nombre;
    $sqlGarantias = mysqli_query($conexionBD,"INSERT INTO MARCA(id_marca, nombre) VALUES('$id','$nombre')");
    echo json_encode([["success"=>1]]);
        exit();

}

if (isset($_GET['crearcategoria'])) {
    $data = json_decode(file_get_contents("php://input"));
    $id = $data->id;
    $nombre = $data->nombre;
    $sqlGarantias = mysqli_query($conexionBD,"INSERT INTO CATEGORIAPRODUCTO(id_categoria, nombre) VALUES('$id','$nombre')");
    echo json_encode([["success"=>1]]);
        exit();

}

if (isset($_GET["editarproducto"])) {
    $data = json_decode(file_get_contents("php://input"));

    $id = $data->id;
    $nombre = $data->nombre;
    $categoria = $data->categoria;
    $marca = $data->marca;
    $precio = $data->precio;
    $stock = $data->stock;
    $descripcion = $data->descripcion;


    $sqlGarantias = mysqli_query($conexionBD,"UPDATE PRODUCTO SET nombre = '$nombre', descripcion='$descripcion', stock='$stock', precio='$precio', id_marca='$marca', id_categoria='$categoria' WHERE id_producto = '$id'");
    echo json_encode($data);
    exit();
}

if (isset($_GET['crearproducto'])) {
    $data = json_decode(file_get_contents("php://input"));

    $id = $data->id;
    $nombre = $data->nombre;
    $categoria = $data->categoria;
    $marca = $data->marca;
    $precio = $data->precio;
    $stock = $data->stock;
    $descripcion = $data->descripcion;


    $sqlGarantias = mysqli_query($conexionBD,"INSERT INTO PRODUCTO (id_producto, nombre, descripcion, stock, precio, id_marca, id_categoria) VALUES ('$id', '$nombre', '$descripcion', '$stock', '$precio', '$marca', '$categoria' )");
    echo json_encode($data);
    exit();
}

if (isset($_GET['eliminargarantía'])) {
    $data = json_decode(file_get_contents("php://input"));

    $sqlGarantias = mysqli_query($conexionBD, "DELETE FROM GARANTIA WHERE id_garantia = '$data'");
    echo json_encode($data);
    exit();
}

if (isset($_GET['renovargarantia'])) {
    $data = json_decode(file_get_contents("php://input"));
    $id = $data->id;
    $fecha = $data->fecha;
    $sqlGarantias = mysqli_query($conexionBD, "UPDATE GARANTIA SET fechavencimiento ='$fecha', estadorenovar='0'  WHERE id_garantia='$id'");
    echo json_encode($data);
    exit();
}

if (isset($_GET['listartipogarantia'])) {
    $sqlGarantias = mysqli_query($conexionBD, "SELECT * FROM TIPOGARANTIA");
    if(mysqli_num_rows($sqlGarantias) > 0){
        $tipoGarantia = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
        echo json_encode($tipoGarantia);
        exit();
    }
    else{ echo json_encode([["success"=>0]]); }
}

if (isset($_GET['insertarGarantias'])) {
    $data = json_decode(file_get_contents("php://input"));
    $idGarantia = $data->idGarantia;
    $idProducto = $data->idProducto;
    $idUsuario = $data->idUsuario;
    $idTipoGarantia = $data->idTipoGarantia;
    $fechaVencimiento = $data->fechaVencimiento;

    $sqlGarantias = mysqli_query($conexionBD,"INSERT INTO `garantia`(`id_garantia`, `id_producto`, `id_usuario`, `id_tipogarantia`, `fechavencimiento`, `estadorenovar`) VALUES ('$idGarantia','$idProducto','$idUsuario','$idTipoGarantia','$fechaVencimiento','0')");
    echo json_encode($data);
    exit();
}

if (isset($_GET['editarpedido'])) {
    $data = json_decode(file_get_contents("php://input"));

    $id = $data->id;
    $estado = $data->estado;


    $sqlGarantias = mysqli_query($conexionBD,"UPDATE PEDIDO SET estado = '$estado' WHERE id_pedido = '$id'");
    echo json_encode($id);
    exit();
}

if (isset($_GET['insertarpedidos'])) {
    $data = json_decode(file_get_contents("php://input"));
    $idPedido = $data->idPedido;
    $idProducto = $data->idProducto;
    $idUsuario = $data->idUsuario;
    $fecha = $data->fecha;
    $totalPagar = $data->totalPagar;

    $sqlGarantias = mysqli_query($conexionBD,"INSERT INTO `pedido`(`id_pedido`, `id_usuario`, `id_producto`, `fecha`, `totalpagar`, `estado`) VALUES ('$idPedido','$idUsuario','$idProducto','$fecha','$totalPagar','0')");
    echo json_encode($data);
    exit();
}

if (isset($_GET["listarrevisionesusuario"])) {

    $data = json_decode(file_get_contents("php://input"));

    $sqlGarantias = mysqli_query($conexionBD,"CALL LISTARREVISIONUSUARIO()");
    if(mysqli_num_rows($sqlGarantias) > 0){
        $revisiones = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
        echo json_encode($revisiones);
        exit();
    }
    else{ echo json_encode([["success"=>0]]); }

}
if (isset($_GET["listarpedidosusuario"])) {

    $data = json_decode(file_get_contents("php://input"));

    $sqlGarantias = mysqli_query($conexionBD,"CALL LISTARPEDIDOSUSUARIO('$data')");
    if(mysqli_num_rows($sqlGarantias) > 0){
        $revisiones = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
        echo json_encode($revisiones);
        exit();
    }
    else{ echo json_encode([["success"=>0]]); }

}
if (isset($_GET["listargarantiasusuario"])) {

    $data = json_decode(file_get_contents("php://input"));

    $sqlGarantias = mysqli_query($conexionBD,"CALL LISTARGARANTIASUSUARIO('$data');");
    if(mysqli_num_rows($sqlGarantias) > 0){
        $revisiones = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
        echo json_encode($revisiones);
        exit();
    }
    else{ echo json_encode([["success"=>0]]); }

}
if (isset($_GET['pedirrenovacion'])) {
    $data = json_decode(file_get_contents("php://input"));

    $sqlGarantias = mysqli_query($conexionBD, "UPDATE GARANTIA SET estadorenovar='1'  WHERE id_garantia='$data'");
    echo json_encode($data);
    exit();
}
if (isset($_GET["reportesusuario"])) {

    $datos = json_decode(file_get_contents("php://input"));

    $sqlGarantias = mysqli_query($conexionBD,"SELECT * FROM pedido WHERE id_usuario='$datos'");
    if(mysqli_num_rows($sqlGarantias) > 0){
        $data[0] = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
    }
    else{ $data[0] = 0; }

    $sqlGarantias = mysqli_query($conexionBD,"SELECT * FROM garantia WHERE id_usuario='$datos'");
    if(mysqli_num_rows($sqlGarantias) > 0){
        $data[1] = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
    }
    else{ $data[1] = 0; }

    $sqlGarantias = mysqli_query($conexionBD,"SELECT * FROM producto");
    if(mysqli_num_rows($sqlGarantias) > 0){
        $data[2] = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
    }
    else{ $data[2] = 0; }

    $sqlGarantias = mysqli_query($conexionBD,"SELECT * FROM revisión WHERE id_usuario='$datos'");
    if(mysqli_num_rows($sqlGarantias) > 0){
        $data[3] = mysqli_fetch_all($sqlGarantias,MYSQLI_ASSOC);
    }
    else{ $data[3] = 0; }


    echo json_encode($data);
    exit();
}
if (isset($_GET['adquirir'])) {
    $data = json_decode(file_get_contents("php://input"));

    $idPedido = $data->idPedido;
    $idProducto = $data->idProducto;
    $idUsuario = $data->idUsuario;
    $fecha = $data->fecha;
    $total = $data->total;

    $sqlGarantias = mysqli_query($conexionBD,"CALL ADQUIRIR('$idUsuario', '$idProducto', '$idPedido', '$total', '$fecha')");
    echo json_encode($data);
    exit();
}

if (isset($_GET['actualizarstock'])) {
    $data = json_decode(file_get_contents("php://input"));

    $idProducto = $data->idProducto;
    $stock = $data->stock;


    $sqlGarantias = mysqli_query($conexionBD,"UPDATE PRODUCTO SET stock = '$stock' WHERE id_producto = '$idProducto'");
    echo json_encode($id);
    exit();
}
?>