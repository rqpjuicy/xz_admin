<?php
header("Content-Type:application/json");
require("00_init.php");
@$pageSize=$_REQUEST["pageSize"];
@$pageIndex=$_REQUEST["pageIndex"];
@$kw=$_REQUEST["kw"];
if ($pageSize==null){
   $pageSize=10;
}
if($pageIndex==null){
   $pageIndex=1;
}
$totalCount=mysqli_fetch_row(mysqli_query($conn,"select count(1) from xz_laptop"))[0];
$totalPages=ceil($totalCount/$pageSize);
$startIndex=($pageIndex-1)*$pageSize;
$sql="SELECT lid,(select md from xz_laptop_pic where laptop_id=lid limit 1)as pic,fname,title,spec,price from xz_laptop  left JOIN xz_laptop_family ON family_id=fid ";
if ($kw){
  $kws=explode(" ",$kw);
  for($i=0;$i<count($kws);$i++){
     $kws[$i]=" title like '%$kws[$i]%' ";
  }
  $where=implode(" and ",$kws);
  $sql.=" where $where";
}
$sql.=" LIMIT $startIndex,$pageSize";
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,1);
$output=[
   "pno"=>$pageIndex,
   "pageSize"=>$pageSize,
   "totalCount"=>$totalCount,
   "totalPages"=>$totalPages,
   "data"=>$rows
];
echo json_encode($output);
?>