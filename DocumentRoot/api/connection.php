<?php
$con = mysqli_connect("172.21.0.2", "root", "rootpwd", "testdb");
// Check connection
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
