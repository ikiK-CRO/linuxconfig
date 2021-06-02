<?php
header("Content-Type:application/json");
header("Access-Control-Allow-Origin: *");
require('db.php');

// GET SVE NEKRETNINE
if (isset($_GET['nekretnine'])) {
    $sql = mysqli_query($con, "SELECT * FROM `nekretnine`");
    $data = array();
    while ($row = $sql->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
}

// GET NEKRETNINU
if (isset($_GET['nekretnina']) && $_GET['nekretnina'] != "") {
    $id = mysqli_real_escape_string($con, $_GET['nekretnina']);

    $sql = mysqli_query($con, "SELECT * FROM `nekretnine` WHERE nek_id = '$id'");
    $data = array();
    while ($row = $sql->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
}

//LOGIN
if (isset($_GET['korisnik']) && $_GET['korisnik'] != "") {
    $korisnik = mysqli_real_escape_string($con, $_GET['korisnik']);
    $lozinka = mysqli_real_escape_string($con, $_GET['lozinka']);

    $sql = mysqli_query($con, "SELECT * FROM `users` WHERE usr_name = '$korisnik' AND usr_pass = '$lozinka'");
    $data = array();
    while ($row = $sql->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
}



// if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
//     echo "true";
// }



// DELETE
if (isset($_GET['delete']) && $_GET['delete'] != "") {
    $id = mysqli_real_escape_string($con, $_GET['delete']);

    $sql = "DELETE FROM nekretnine WHERE nek_id='$id'";

    if ($con->query($sql) === TRUE) {
        echo "true";
    } else {
        echo "Error deleting record: " . $con->error;
    }
}
