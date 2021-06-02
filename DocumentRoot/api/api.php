<?php
header("Content-Type:application/json");
header("Access-Control-Allow-Origin: *");
require('db.php');


if (isset($_GET['nekretnine'])) {
    $sql = mysqli_query($con, "SELECT * FROM `nekretnine`");
    $data = array();
    while ($row = $sql->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
}


if (isset($_GET['nekretnina']) && $_GET['nekretnina'] != "") {
    $id = mysqli_real_escape_string($con,$_GET['nekretnina']);

    $sql = mysqli_query($con, "SELECT * FROM `nekretnine` WHERE nek_id = '$id'");
    $data = array();
    while ($row = $sql->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
}


if (isset($_GET['korisnik']) && $_GET['korisnik'] != "") {
    $korisnik = mysqli_real_escape_string($con,$_GET['korisnik']);
    $lozinka = mysqli_real_escape_string($con,$_GET['lozinka']);

    $sql = mysqli_query($con, "SELECT * FROM `users` WHERE usr_name = '$korisnik' AND usr_pass = '$lozinka'");
    $data = array();
    while ($row = $sql->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
}


