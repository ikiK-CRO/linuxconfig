<?php
$con = mysqli_connect("linuxconfig_mariadb_1", "root", "rootpwd", "testdb");
// Check connection
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
