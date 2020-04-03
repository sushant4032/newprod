<?php
    $server="localhost";
    $user="root";
    $pwd="";
    $db="prod";
    $conn = new mysqli($server,$user,$pwd,$db);
    if($conn->connect_error){
        die('Connection Error');
    }
    $sql="SELECT * FROM daily order by dn";
    $rows=array();
   $res=$conn->query($sql);
   while($r=mysqli_fetch_assoc($res)){
       $rows[]=$r;
   }
   echo "#";
   echo json_encode($rows);
   echo "#";
?>