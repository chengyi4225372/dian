-- MySQL dump 10.13  Distrib 5.5.53, for Win32 (AMD64)
--
-- Host: localhost    Database: openbms
-- ------------------------------------------------------
-- Server version	5.5.53

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ob_ad`
--

DROP TABLE IF EXISTS `ob_ad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ob_ad` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL DEFAULT '0' COMMENT '分类',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '分类名称',
  `description` varchar(255) DEFAULT '' COMMENT '描述',
  `url` varchar(255) DEFAULT '' COMMENT '链接',
  `target` varchar(10) DEFAULT '' COMMENT '打开方式',
  `image` varchar(255) DEFAULT '',
  `sort_order` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='广告';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ob_ad`
--

LOCK TABLES `ob_ad` WRITE;
/*!40000 ALTER TABLE `ob_ad` DISABLE KEYS */;
/*!40000 ALTER TABLE `ob_ad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ob_ad_category`
--

DROP TABLE IF EXISTS `ob_ad_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ob_ad_category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL DEFAULT '' COMMENT '分类名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='广告分类';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ob_ad_category`
--

LOCK TABLES `ob_ad_category` WRITE;
/*!40000 ALTER TABLE `ob_ad_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `ob_ad_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ob_admin`
--

DROP TABLE IF EXISTS `ob_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ob_admin` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL DEFAULT '' COMMENT '管理员用户名',
  `password` varchar(32) NOT NULL DEFAULT '' COMMENT '管理员密码',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0禁用/1启动',
  `last_login_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '上次登录时间',
  `last_login_ip` varchar(16) NOT NULL DEFAULT '' COMMENT '上次登录IP',
  `login_count` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '登录次数',
  `edit_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `add_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='管理员';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ob_admin`
--

LOCK TABLES `ob_admin` WRITE;
/*!40000 ALTER TABLE `ob_admin` DISABLE KEYS */;
INSERT INTO `ob_admin` VALUES (1,'admin','e10adc3949ba59abbe56e057f20f883e',1,1535705476,'127.0.0.1',75,0,1506398114),(2,'demo','e10adc3949ba59abbe56e057f20f883e',1,1535632398,'127.0.0.1',2,0,1535599754);
/*!40000 ALTER TABLE `ob_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ob_admin_log`
--

DROP TABLE IF EXISTS `ob_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ob_admin_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '管理员id',
  `username` varchar(32) NOT NULL DEFAULT '' COMMENT '管理员用户名',
  `useragent` varchar(255) NOT NULL DEFAULT '' COMMENT 'User-Agent',
  `ip` varchar(16) NOT NULL DEFAULT '' COMMENT 'ip地址',
  `url` varchar(255) NOT NULL DEFAULT '' COMMENT '请求链接',
  `method` varchar(32) NOT NULL DEFAULT '' COMMENT '请求类型',
  `type` varchar(32) NOT NULL DEFAULT '' COMMENT '资源类型',
  `param` text NOT NULL COMMENT '请求参数',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '日志备注',
  `add_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='管理员日志';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ob_admin_log`
--

LOCK TABLES `ob_admin_log` WRITE;
/*!40000 ALTER TABLE `ob_admin_log` DISABLE KEYS */;
INSERT INTO `ob_admin_log` VALUES (1,1,'admin','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.62 Safari/537.36','127.0.0.1','http://www.openbms.cn/admin/index/logout.html','GET','xml','[]','退出了后台系统',1535715363);
/*!40000 ALTER TABLE `ob_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ob_article`
--

DROP TABLE IF EXISTS `ob_article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ob_article` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cid` smallint(5) unsigned NOT NULL DEFAULT '0',
  `title` varchar(255) NOT NULL DEFAULT '',
  `image` varchar(255) DEFAULT '',
  `author` varchar(255) DEFAULT '',
  `summary` varchar(255) DEFAULT '' COMMENT '简介',
  `photo` text COMMENT '相册',
  `content` text,
  `view` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '点击量',
  `is_top` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否置顶',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `keywords` varchar(255) DEFAULT '',
  `description` varchar(255) DEFAULT '',
  `edit_time` int(10) unsigned NOT NULL DEFAULT '0',
  `add_time` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='文章';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ob_article`
--

LOCK TABLES `ob_article` WRITE;
/*!40000 ALTER TABLE `ob_article` DISABLE KEYS */;
/*!40000 ALTER TABLE `ob_article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ob_article_category`
--

DROP TABLE IF EXISTS `ob_article_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ob_article_category` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `pid` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '上级分类ID',
  `category_name` varchar(255) NOT NULL DEFAULT '' COMMENT '标题',
  `sort_order` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `keywords` varchar(255) DEFAULT '',
  `description` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='文章分类';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ob_article_category`
--

LOCK TABLES `ob_article_category` WRITE;
/*!40000 ALTER TABLE `ob_article_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `ob_article_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ob_auth_group`
--

DROP TABLE IF EXISTS `ob_auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ob_auth_group` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL DEFAULT '',
  `description` varchar(255) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `rules` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='权限组';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ob_auth_group`
--

LOCK TABLES `ob_auth_group` WRITE;
/*!40000 ALTER TABLE `ob_auth_group` DISABLE KEYS */;
INSERT INTO `ob_auth_group` VALUES (1,'超级管理员','测试',1,'19,22,21,23,1,14,24,27,28,13,29,30,31,32,2,12,35,36,15');
/*!40000 ALTER TABLE `ob_auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ob_auth_group_access`
--

DROP TABLE IF EXISTS `ob_auth_group_access`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ob_auth_group_access` (
  `uid` smallint(5) unsigned NOT NULL DEFAULT '0',
  `group_id` smallint(5) unsigned NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='权限授权';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ob_auth_group_access`
--

LOCK TABLES `ob_auth_group_access` WRITE;
/*!40000 ALTER TABLE `ob_auth_group_access` DISABLE KEYS */;
INSERT INTO `ob_auth_group_access` VALUES (2,1);
/*!40000 ALTER TABLE `ob_auth_group_access` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ob_auth_rule`
--

DROP TABLE IF EXISTS `ob_auth_rule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ob_auth_rule` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(11) unsigned NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL DEFAULT '',
  `url` varchar(255) NOT NULL DEFAULT '',
  `icon` varchar(64) NOT NULL DEFAULT '',
  `sort_order` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `type` char(4) NOT NULL DEFAULT '' COMMENT 'nav,auth',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8 COMMENT='权限规则';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ob_auth_rule`
--

LOCK TABLES `ob_auth_rule` WRITE;
/*!40000 ALTER TABLE `ob_auth_rule` DISABLE KEYS */;
INSERT INTO `ob_auth_rule` VALUES (1,0,'内容','admin/article/index','fa fa-book',2,'nav',1),(2,0,'会员','admin/user/index','fa fa-users',3,'nav',1),(3,0,'扩展','admin/ad/index','fa fa-puzzle-piece',4,'nav',1),(4,0,'设置','admin/setting/index','fa fa-cog',5,'nav',1),(5,0,'权限','admin/admin/index','fa fa-lock',6,'nav',1),(6,4,'基本设置','admin/setting/index','fa fa-cog',0,'nav',1),(7,4,'配置管理','admin/config/index','fa fa-wrench',0,'nav',1),(8,4,'配置分组','admin/config/group','fa fa-navicon',0,'nav',1),(9,5,'权限规则','admin/auth/rule','fa fa-th-list',3,'nav',1),(10,3,'广告分类','admin/ad/category','fa fa-navicon',2,'nav',1),(11,3,'广告管理','admin/ad/index','fa fa-image',1,'nav',1),(12,2,'会员管理','admin/user/index','fa fa-users',0,'nav',1),(13,1,'文章分类','admin/article/category','fa fa-navicon',2,'nav',1),(14,1,'文章管理','admin/article/index','fa fa-book',1,'nav',1),(15,2,'会员日志','admin/user/log','fa fa-clock-o',0,'nav',1),(16,5,'管理员','admin/admin/index','fa fa-user',0,'nav',1),(17,5,'权限组','admin/auth/group','fa fa-users',0,'nav',1),(18,5,'管理员日志','admin/admin/log','fa fa-clock-o',4,'nav',1),(19,0,'控制台','admin/index/index','',1,'auth',1),(20,9,'新增','admin/auth/add_rule','',0,'auth',1),(21,19,'修改密码','admin/index/edit_password','',2,'auth',1),(22,19,'清除缓存','admin/index/clear','',1,'auth',1),(23,19,'退出登录','admin/index/logout','',3,'auth',1),(24,14,'新增','admin/article/add','',0,'auth',1),(25,14,'编辑','admin/article/edit','',0,'auth',1),(26,14,'删除','admin/article/del','',0,'auth',1),(27,14,'设置状态','admin/article/set_status','',0,'auth',1),(28,14,'设置排序','admin/article/set_sort_order','',0,'auth',1),(29,13,'新增','admin/article/add_category','',0,'auth',1),(30,13,'编辑','admin/article/edit_category','',0,'auth',1),(31,13,'删除','admin/article/del_category','',0,'auth',1),(32,13,'设置排序','admin/article/set_category_sort_order','',0,'auth',1),(33,12,'新增','admin/user/add','',0,'auth',1),(34,12,'编辑','admin/user/edit','',0,'auth',1),(35,12,'删除','admin/user/del','',0,'auth',1),(36,12,'设置状态','admin/user/set_status','',0,'auth',1),(37,11,'新增','admin/ad/add','',0,'auth',1),(38,11,'编辑','admin/ad/edit','',0,'auth',1),(39,11,'删除','admin/ad/del','',0,'auth',1),(40,11,'设置状态','admin/ad/set_status','',0,'auth',1),(41,11,'设置排序','admin/ad/set_sort_order','',0,'auth',1),(42,10,'新增','admin/ad/add_category','',0,'auth',1),(43,10,'编辑','admin/ad/edit_category','',0,'auth',1),(44,10,'删除','admin/ad/del_category','',0,'auth',1),(45,6,'更新','admin/setting/save','',0,'auth',1),(46,7,'新增','admin/config/add','',0,'auth',1),(47,7,'编辑','admin/config/edit','',0,'auth',1),(48,7,'删除','admin/config/del','',0,'auth',1),(49,7,'设置状态','admin/config/set_status','',0,'auth',1),(50,7,'设置排序','admin/config/set_sort_order','',0,'auth',1),(51,8,'新增','admin/config/add_group','',0,'auth',1),(52,8,'编辑','admin/config/edit_group','',0,'auth',1),(53,8,'删除','admin/config/del_group','',0,'auth',1),(54,8,'设置状态','admin/config/set_group_status','',0,'auth',1),(55,8,'设置排序','admin/config/set_group_sort_order','',0,'auth',1),(56,9,'编辑','admin/auth/edit_rule','',0,'auth',1),(57,9,'删除','admin/auth/del_rule','',0,'auth',1),(58,16,'新增','admin/admin/add','',0,'auth',1),(59,16,'编辑','admin/admin/edit','',0,'auth',1),(60,16,'删除','admin/admin/del','',0,'auth',1),(61,16,'设置状态','admin/admin/set_status','',0,'auth',1),(62,17,'新增','admin/auth/add_group','',0,'auth',1),(63,17,'编辑','admin/auth/edit_group','',0,'auth',1),(64,17,'删除','admin/auth/del_group','',0,'auth',1),(65,17,'设置状态','admin/auth/set_group_status','',0,'auth',1);
/*!40000 ALTER TABLE `ob_auth_rule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ob_config`
--

DROP TABLE IF EXISTS `ob_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ob_config` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '配置分类ID',
  `title` varchar(255) NOT NULL DEFAULT '' COMMENT '描述',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '配置标识',
  `type` varchar(32) NOT NULL DEFAULT '' COMMENT '配置类型',
  `value` text NOT NULL COMMENT '配置默认值',
  `options` text COMMENT '配置选项值',
  `sort_order` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态/0禁用/1启用',
  `system` tinyint(1) NOT NULL DEFAULT '0' COMMENT '系统/0否/1是(不可删除)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='配置';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ob_config`
--

LOCK TABLES `ob_config` WRITE;
/*!40000 ALTER TABLE `ob_config` DISABLE KEYS */;
INSERT INTO `ob_config` VALUES (4,1,'网站状态','site_status','radio','1','1:开启\r\n0:关闭',8,1,1),(5,1,'关闭原因','colse_explain','textarea','','',9,1,1),(6,1,'分页数量','page_number','input','10','',10,1,1),(7,1,'网站标题','site_title','input','OpenBMS 开源后台管理系统','',2,1,1),(8,1,'网站关键字','site_keywords','input','OpenBMS 开源后台管理系统','',3,1,1),(9,1,'网站描述','site_description','textarea','Open Background Management System 开源后台管理系统','',4,1,1),(10,1,'版权信息','site_copyright','input','OpenBMS','',5,1,1),(11,1,'ICP备案号','site_icp','input','粤ICP备88888888号','',6,1,1),(12,1,'统计代码','site_code','textarea','','',7,1,1),(13,1,'网站logo','logo','image','','',0,1,1),(14,1,'网站名称','site_name','input','OpenBMS','',1,1,0);
/*!40000 ALTER TABLE `ob_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ob_config_group`
--

DROP TABLE IF EXISTS `ob_config_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ob_config_group` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL DEFAULT '' COMMENT '配置分类名称',
  `value` varchar(32) NOT NULL DEFAULT '' COMMENT '配置分类值',
  `sort_order` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态/0禁用/1启用',
  `system` tinyint(1) NOT NULL DEFAULT '0' COMMENT '系统/0否/1是(不可删除)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='配置分组';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ob_config_group`
--

LOCK TABLES `ob_config_group` WRITE;
/*!40000 ALTER TABLE `ob_config_group` DISABLE KEYS */;
INSERT INTO `ob_config_group` VALUES (1,'网站配置','website',0,1,1);
/*!40000 ALTER TABLE `ob_config_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ob_config_type`
--

DROP TABLE IF EXISTS `ob_config_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ob_config_type` (
  `name` varchar(32) NOT NULL DEFAULT '' COMMENT '配置分类名称',
  `value` varchar(32) NOT NULL DEFAULT '' COMMENT '配置分类值'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='配置类型';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ob_config_type`
--

LOCK TABLES `ob_config_type` WRITE;
/*!40000 ALTER TABLE `ob_config_type` DISABLE KEYS */;
INSERT INTO `ob_config_type` VALUES ('单行文本','input'),('多行文本','textarea'),('下拉选项','select'),('单选项','radio'),('图片','image');
/*!40000 ALTER TABLE `ob_config_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ob_user`
--

DROP TABLE IF EXISTS `ob_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ob_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL COMMENT '用户名',
  `password` varchar(32) NOT NULL DEFAULT '' COMMENT '密码',
  `mobile` char(20) DEFAULT '' COMMENT '手机',
  `email` varchar(255) DEFAULT '' COMMENT '邮箱',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0禁用/1启动',
  `last_login_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '上次登录时间',
  `last_login_ip` varchar(16) NOT NULL DEFAULT '' COMMENT '上次登录IP',
  `login_count` int(11) NOT NULL DEFAULT '0' COMMENT '登录次数',
  `add_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='会员';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ob_user`
--

LOCK TABLES `ob_user` WRITE;
/*!40000 ALTER TABLE `ob_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `ob_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ob_user_log`
--

DROP TABLE IF EXISTS `ob_user_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ob_user_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '管理员id',
  `username` varchar(32) NOT NULL DEFAULT '' COMMENT '管理员用户名',
  `useragent` varchar(255) NOT NULL DEFAULT '' COMMENT 'User-Agent',
  `ip` varchar(16) NOT NULL DEFAULT '' COMMENT 'ip地址',
  `url` varchar(255) NOT NULL DEFAULT '' COMMENT '请求链接',
  `method` varchar(32) NOT NULL DEFAULT '' COMMENT '请求类型',
  `type` varchar(32) NOT NULL DEFAULT '' COMMENT '资源类型',
  `param` text NOT NULL COMMENT '请求参数',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '日志备注',
  `add_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='会员日志';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ob_user_log`
--

LOCK TABLES `ob_user_log` WRITE;
/*!40000 ALTER TABLE `ob_user_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `ob_user_log` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-08-31 19:37:47
