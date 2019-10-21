[TOC]

MySQL学习笔记
### 服务器的开启
```sql
service mysql start/stop/restart/status
```
###  登录MySQL
```sql
$ mysql -h127.0.0.1 -u root -p12345612
```

### 退出MySQL数据库服务器
```sql
exit;
```
基本语法
### 显示所有数据库
```sql
show databases;
```

### 创建数据库
```sql
CREATE DATABASE test;
--指定编码(注意是utf8)
CREATE DATABASE test default character set utf8;

```

### 切换数据库
```sql
use test;
```

### 显示数据库中的所有表
```sql
show tables;
```

### 创建数据表
```sql
CREATE TABLE pet (
-- 列名 类型 约束 comment '备注'
    name VARCHAR(20),
    owner VARCHAR(20),
    species VARCHAR(20),
    sex CHAR(1),
    birth DATE,
    death DATE
);
```

### 查看数据表结构
```sql
-- describe pet;
desc pet;
```

###  查询表
```sql
SELECT * from pet;
```

### 插入数据
```sql
INSERT INTO pet VALUES ('puffball', 'Diane', 'hamster', 'f', '1990-03-30', NULL);
```

###修改数据
```sql
UPDATE pet SET name = 'squirrel' where owner = 'Diane';
```

### 删除数据
```sql
DELETE FROM pet where name = 'squirrel';
```

###  删除表
```sql
DROP TABLE myorder;
```

