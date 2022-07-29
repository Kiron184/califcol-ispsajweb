<?php
include 'conexion.php';
$iddocente = $_POST['iddocente'];

$query = "CALL ad_traerdatosdocentes (' . $iddocente . ')";
$datos = mysqli_query($con, $query) or die(mysqli_error($con));

while ($row = mysqli_fetch_array($datos, MYSQLI_ASSOC)) {
    $apellido = $row['apellido'];
    $nombres  = $row['nombres'];
    $docnro = $row['docnro'];
    $email = $row['email'];

    $salida[] = array($apellido, $nombres, $docnro, $email);
}

$json_string = json_encode($salida);
echo $json_string;
