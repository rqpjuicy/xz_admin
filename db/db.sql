#15:35-15:40
#1:进入xuezi库中
USE xuezi;
#2:创建管理员用户表 t_admin
CREATE TABLE t_admin(
  uid   INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(50) NOT NULL DEFAULT '',
  upwd  VARCHAR(32) NOT NULL DEFAULT '',
  ctime DATETIME NOT NULL DEFAULT 0,
  cuid INT NOT NULL DEFAULT 0,
  mtime DATETIME NOT NULL DEFAULT 0,
  muid INT NOT NULL DEFAULT 0，
  v1 INT NOT NULL DEFAULT 0,
  v2 VARCHAR(255) NOT NULL DEFAULT ''
);
#3:添加三条记录    uid uname upwd
INSERT INTO t_admin VALUES(null,'tom',md5('123'),now(),1,now(),1,0,'');
INSERT INTO t_admin VALUES(null,'jerry',md5('123'),now(),1,now(),1,0,'');
INSERT INTO t_admin VALUES(null,'james',md5('123'),now(),1,now(),1,0,'');

#创建用户操作日志表
CREATE TABLE t_log(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uid INT NOT NULL DEFAULT 0,
  opt VARCHAR(255) NOT NULL DEFAULT '',
  opttime DATETIME NOT NULL DEFAULT 0,
  desct VARCHAR(255) CHARACTER set utf8 NOT NULL DEFAULT '' CHARACTER set utf8
);


