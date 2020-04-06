<?php
    $server="localhost";
    $user="root";
    $pwd="";
    $db="prod";

    $conn = new mysqli($server,$user,$pwd,$db);
    if($conn->connect_error){
        die('Connection Error');
    }

    $qry = json_decode(file_get_contents('php://input'), true);
    $dn=$qry['dn'];
    $dt=$qry['dt'];
    $val=$qry['val'];


    $sql="IF EXISTS (SELECT * FROM daily WHERE dn='$dn') THEN UPDATE daily set val='$val' WHERE dn ='$dn'; ELSE INSERT INTO daily (dn,dt,val) VALUES('$dn','$dt','$val'); END IF";

    echo $sql;

    if($conn->query($sql)===TRUE){
        echo "Data inserted";
        echo "<br>";
    }
    else{
        echo $conn->error;
    }
?>