<?php
//1:修改响应头格式 json
//如果出现下载php或者是text/html
header("Content-Type:application/json;charset=utf-8");
//2:获取数据库连接
$conn = mysqli_connect("127.0.0.1","root","","xuezi",3306);
//3:设置数据库编码为 utf-8
mysqli_query($conn,"SET NAMES UTF8");
?>