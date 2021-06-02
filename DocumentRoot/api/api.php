<?php
header("Content-Type:application/json");
header("Access-Control-Allow-Origin: *");
require('connection.php');


if (isset($_GET['nekretnine'])) {

    $sql = mysqli_query($con, "SELECT * FROM `nekretnine`");
    $data = array();
    while ($row = $sql->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
}
