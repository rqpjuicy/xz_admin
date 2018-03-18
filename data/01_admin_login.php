<?php
require("00_init.php");
//4:获取用户数据   uname upwd
$uname = $_REQUEST["uname"];
$upwd = $_REQUEST["upwd"];
//创建二个变量保存正则表达式验证用户名和密码格式
//创建用户名正则表达式，字母数字3-12
$uPattern='/^[a-zA-Z0-9]{3,12}$/';
//验证用户名
if (!preg_match($uPattern,$uname)){
   //输出出错提示
   echo '{"code":-2,"msg":"用户名格式不正确"}';
   //停止php执行
   exit;
}
if (!preg_match($uPattern,$upwd)){
   //输出出错提示
   echo '{"code":-2,"msg":"密码格式不正确"}';
   //停止php执行
   exit;
}
//5:创建sql语句并且执行sql语句 注意大小写
$sql = " SELECT uid FROM t_admin";
$sql .= " WHERE uname='$uname' AND upwd=md5('$upwd')";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_row($result);
if(mysqli_error($conn)){
  echo mysqli_error($conn);
}
//向操作日志表添加操作
//创建sql insert 记录 uid opt opttime desc
$uid=($row[0]==null)?0:$row[0];
$ip=$_SERVER["REMOTE_ADDR"];
$rs="login success $uname ip:$ip";
if ($row==null){
   $rs="login error $uname ip:$ip";
}
mysqli_query($conn,"insert into t_log values(null,$uid,'login',now(),'$rs')");
//6:判断输出结果
if($row==null){
  echo '{"code":-1,"msg":"用户名或密码有误"}';
}else{
  echo '{"code":1,"msg":"登录成功"}';
}
?>