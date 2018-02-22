<?php

$host = "127.0.0.1";
$user = "root";
$pass = "pwd";

$databaseName = "BOPO";
$tableName = "user_registry";

//--------------------------------------------------------------------------
// 1) Connect to mysql database
//--------------------------------------------------------------------------
//include 'DB.php';
$con = mysql_connect($host,$user,$pass);
$dbs = mysql_select_db($databaseName, $con);

if (mysqli_connect_errno())
{
echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

     $value1 = $_POST['name'];
     $value2 = $_POST['username'];
     $value3 = $_POST['email'];
     $value4 = $_POST['password'];

     $sql = "INSERT INTO user_registry (name, username, email, password) VALUES
     ('$value1', '$value2',
     '$value3', '$value4')";

     $result = mysql_query($sql);

     mysql_close();

     ?>
