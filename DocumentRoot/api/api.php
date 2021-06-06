<?php
header("Content-Type:application/json");
header("Access-Control-Allow-Origin: *");
require('db.php');


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
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
}



if ($_SERVER['REQUEST_METHOD'] === 'PUT') {

    if (isset($_GET['edit']) && $_GET['edit'] != "") {
        $naslov = mysqli_real_escape_string($con, $_GET['edit']);
        $cijena = mysqli_real_escape_string($con, $_GET['cijena']);
        $kat = mysqli_real_escape_string($con, $_GET['kat']);
        $id = mysqli_real_escape_string($con, $_GET['id']);

        $sql = "UPDATE nekretnine SET nek_naslov='$naslov', nek_cijena='$cijena', kat_id='$kat' WHERE nek_id='$id'";

        if ($con->query($sql) === TRUE) {
            echo "true";
        } else {
            echo "Error: " . $sql . "<br>" . $con->error;
        }
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (isset($_GET['unos']) && $_GET['unos'] != "") {
        $naslov = mysqli_real_escape_string($con, $_GET['unos']);
        $cijena = mysqli_real_escape_string($con, $_GET['cijena']);
        $kat = mysqli_real_escape_string($con, $_GET['kat']);

        $sql = "INSERT INTO nekretnine (nek_naslov, nek_cijena, kat_id) VALUES ('$naslov', '$cijena', '$kat')";

        if ($con->query($sql) === TRUE) {
            echo "true";
        } else {
            echo "Error: " . $sql . "<br>" . $con->error;
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
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
}


if (isset($_FILES['file']['name'])) {
    $id = $_POST['id'];
    $filename = $_FILES['file']['name'];

    $location = '../src/img/' . $filename;

    $file_extension = pathinfo($location, PATHINFO_EXTENSION);
    $file_extension = strtolower($file_extension);
    $valid_ext = array("jpg", "png", "jpeg");

    $response = 0;
    if (in_array($file_extension, $valid_ext)) {
        // Upload file
        if (move_uploaded_file($_FILES['file']['tmp_name'], $location)) {
            if (!empty($id)) {
                $sql = "UPDATE nekretnine SET nek_img='$location' WHERE nek_id = '$id'";
            } else {
                $sql = "UPDATE nekretnine SET nek_img='$location' ORDER BY nek_id DESC LIMIT 1";
            }


            if ($con->query($sql) === TRUE) {
                $response = 1;
            } else {
                $response = "Error updating record: " . $con->error;
            }
        }
    }

    echo $response;
    exit;
}
