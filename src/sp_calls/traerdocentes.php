<?php
include 'conexion.php';
$nombre = $_POST['nombre'];

$query = "CALL ad_traerdocentes_lista ('" . $nombre . "')";
$datos = mysqli_query($con, $query) or die(mysqli_error($con));


while ($row = mysqli_fetch_array($datos, MYSQLI_ASSOC)) {
    $apellido = $row['apellido'];
    $nombres  = $row['nombres'];
    $docnro = $row['docnro'];
    $email = $row['email'];
    $id = $row['id'];

    $salida[] = array($apellido, $nombres, $docnro, $email, $id);
}

$json_string = json_encode($salida);
echo $json_string;
