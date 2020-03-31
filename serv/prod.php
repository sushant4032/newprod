<?php
$server="localhost";
$user="root";
$pwd="";
$db="db1";

$conn = new mysqli($server,$user,$pwd,$db);
if($conn->connect_error){
    die('Connection Error');
}

$req=$_REQUEST;
$date=$req['date'];
$g8=$req['g8'];
$g10sd=$req['g10sd'];
$g10sm=$req['g10sm'];
$depteast=$req['depteast'];
$deptwest=$req['deptwest'];
$deptcoal=$req['deptcoal'];
$jwalasolid=$req['jwalasolid'];
$vindhyasolid=$req['vindhyasolid'];
$jyotisolid=$req['jyotisolid'];
$pawansolid=$req['pawansolid'];
$jwalareh=$req['jwalareh'];
$vindhyareh=$req['vindhyareh'];
$jyotireh=$req['jyotireh'];
$pawanreh=$req['pawanreh'];
$outeasttop=$req['outeasttop'];
$outwesttop=$req['outwesttop'];
$outeastmid=$req['outeastmid'];
$outwestmid=$req['outwestmid'];
$outeastdl=$req['outeastdl'];
$outwestdl=$req['outwestdl'];

$sql="INSERT INTO COAL (date,g8,g10sd,g10sm) VALUES('$date','$g8','$g10sd','$g10sm')";

if($conn->query($sql)===TRUE){
    echo "Data inserted For Coal";
    echo "<br>";
    echo "<br>";
}
$sql="INSERT INTO OB (date,depteast,deptwest,deptcoal,jwalasolid,vindhyasolid,jyotisolid,pawansolid,jwalareh,vindhyareh,jyotireh,pawanreh,outeasttop,outwesttop,outeastmid,outwestmid,outeastdl,outwestdl) VALUES('$date','$depteast','$deptwest','$deptcoal','$jwalasolid','$vindhyasolid','$jyotisolid','$pawansolid','$jwalareh','$vindhyareh','$jyotireh','$pawanreh','$outeasttop','$outwesttop','$outeastmid','$outwestmid','$outeastdl','$outwestdl')";

if($conn->query($sql)===TRUE){
    echo "Data inserted For OB";
}
?>