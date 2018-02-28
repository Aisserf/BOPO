<?php

$host = "localhost;
$user = "root";
$pass = "Root";

$databaseName = "bopo";
$tableName = "members";

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

     $value1 = $_POST['Name'];
     $value2 = $_POST['ID'];
     $value3 = $_POST['Mail'];
     $value4 = $_POST['UserName'];

     $sql = "INSERT INTO members (Name, ID, Mail, UserName) VALUES
     ('$value1', '$value2',
     '$value3', '$value4')";

     $result = mysql_query($sql);

     mysql_close();
