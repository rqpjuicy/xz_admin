<?php
header("Content-Type:application/json");
require("00_init.php");
@$lid=$_REQUEST["lid"];
$result=mysqli_query($conn,"delete from xz_laptop where lid=$lid");
if ($result){
   echo json_encode([
     "code"=>1,
     "msg"=>"删除编号$lid成功"
   ]);
}else{
   echo json_encode([
     "code"=>0,
     "msg"=>"删除失败"
   ]);
}

?>