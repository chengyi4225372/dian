
-- -----------------------------
-- Table structure for `ob_ad`
-- -----------------------------
DROP TABLE IF EXISTS `ob_ad`;
CREATE TABLE `ob_ad` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(32) NOT NULL DEFAULT '0' COMMENT '分类',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '分类名称',
  `description` varchar(255) DEFAULT '' COMMENT '描述',
  `url` varchar(255) DEFAULT '' COMMENT '链接',
  `target` varchar(10) DEFAULT '' COMMENT '打开方式',
  `image` varchar(255) DEFAULT '' COMMENT '图片',
  `sort_order` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='广告';


-- -----------------------------
-- Table structure for `ob_admin`
-- -----------------------------
DROP TABLE IF EXISTS `ob_admin`;
CREATE TABLE `ob_admin` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL DEFAULT '' COMMENT '管理员用户名',
  `password` varchar(32) NOT NULL DEFAULT '' COMMENT '管理员密码',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0禁用/1启动',
  `last_login_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '上次登录时间',
  `last_login_ip` varchar(16) NOT NULL DEFAULT '' COMMENT '上次登录IP',
  `login_count` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '登录次数',
  `create_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='管理员';

-- -----------------------------
-- Records of `ob_admin`
-- -----------------------------
INSERT INTO `ob_admin` VALUES ('1', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '1', '1542186820', '127.0.0.1', '12', '0', '1542186820');
INSERT INTO `ob_admin` VALUES ('2', 'demo', 'e10adc3949ba59abbe56e057f20f883e', '1', '1539076116', '127.0.0.1', '1', '1539076102', '1539076116');

-- -----------------------------
-- Table structure for `ob_admin_log`
-- -----------------------------
DROP TABLE IF EXISTS `ob_admin_log`;
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
  `create_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='管理员日志';

-- -----------------------------
-- Records of `ob_admin_log`
-- -----------------------------
INSERT INTO `ob_admin_log` VALUES ('1', '1', 'admin', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36', '127.0.0.1', 'http://www.openbms.com/admin/auth/editgroup/id/1.html', 'POST', 'json', '{\"name\":\"\\u8d85\\u7ea7\\u7ba1\\u7406\\u5458\",\"description\":\"\",\"rules\":\"6,44,43,1,8,34,35,36,7,2,9,28,29,30,10,54,3,11,25,26,27,46,4,12,14,13,45,55,5,16,17,15,18\",\"id\":\"1\"}', '修改了用户组', '1541840962');
INSERT INTO `ob_admin_log` VALUES ('2', '1', 'admin', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36', '127.0.0.1', 'http://www.openbms.com/admin.html', 'POST', 'json', '{\"username\":\"admin\",\"password\":\"123456\",\"captcha\":\"wnhr\"}', '登录了后台系统', '1542186820');
INSERT INTO `ob_admin_log` VALUES ('3', '1', 'admin', 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko', '127.0.0.1', 'http://www.openbms.com/admin/database/del/time/1541840920.html', 'POST', 'json', '{\"time\":\"1541840920\"}', '删除了数据', '1542186827');

-- -----------------------------
-- Table structure for `ob_article`
-- -----------------------------
DROP TABLE IF EXISTS `ob_article`;
CREATE TABLE `ob_article` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cid` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '分类ID',
  `title` varchar(255) NOT NULL DEFAULT '' COMMENT '标题',
  `image` varchar(255) DEFAULT '' COMMENT '图片',
  `author` varchar(255) DEFAULT '' COMMENT '作者',
  `summary` text COMMENT '简介',
  `photo` text COMMENT '相册',
  `content` longtext COMMENT '内容',
  `view` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '点击量',
  `is_top` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否置顶',
  `is_hot` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否推荐',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态',
  `sort_order` int(11) NOT NULL DEFAULT '100' COMMENT '排序',
  `keywords` varchar(255) DEFAULT '' COMMENT '关键字',
  `description` varchar(255) DEFAULT '' COMMENT '描述',
  `create_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='文章';

-- -----------------------------
-- Records of `ob_article`
-- -----------------------------
INSERT INTO `ob_article` VALUES ('1', '1', '初识模块化开发工具', '', '', '初识模块化开发工具：git 是分布式代码管理工具，管理代码的npm 是包管理工具，管理插件、工具啊，是个转换器，他是哪来的了，他是伴随node下载下来的，版本也是伴随node变化；node 是个后台的环境；首先安装node，然后用命令安装browserify：npm install -g brows ...', '', '', '0', '0', '0', '1', '100', '', '', '1541840580', '1541840580');
INSERT INTO `ob_article` VALUES ('2', '1', 'window.open方法被浏览器拦截的处理方式', '', '', '问题现象 当我们在一个 ajax 回调中执行 window.open 方法时，新页面会被浏览器拦截。 原因 在 Chrome 的安全机制里，非用户直接触发的 window.open 方法，是会被拦截的。 处理 $(\'#jump-btn\').on(\'click\', function () { // 打 ...', '', '', '0', '0', '0', '1', '100', '', '', '1541840601', '1541840601');
INSERT INTO `ob_article` VALUES ('3', '1', '理解JavaScript中的柯里化', '', '', '函数式编程是一种编程风格，这种编程风格就是试图将传递函数作为参数（即将作为回调函数）和返回一个函数，但没有函数副作用（函数副作用即会改变程序的状态）。 有很多语言采用这种编程风格，其中包括JavaScript、Haskell、Clojure、Erlang和Scala等一些很流行的编程语言。 ...', '', '', '0', '0', '0', '1', '100', '', '', '1541840625', '1541840625');
INSERT INTO `ob_article` VALUES ('4', '1', '小程序开发框架', '', '', '小程序开发框架，支持百度小程序、微信小程序、支付宝小程序 ...', '', '', '0', '0', '0', '1', '100', '', '', '1541840645', '1541840645');
INSERT INTO `ob_article` VALUES ('5', '1', 'JavaScript异步、事件循环与消息队列、微任务与宏任务', '', '', '关于JavaScript异步、事件循环与消息队、微任务与宏任务的总结 ...', '', '', '0', '0', '0', '1', '100', '', '', '1541840663', '1541840663');
INSERT INTO `ob_article` VALUES ('6', '1', '关于Array中的srot()方法和compare()方法', '', '', 'Array中的srot()方法 sort()方法是用来重排序的方法。在默认情况下，sort()方法按升序排列数组项 即最小的值位于最前面，最大的值排在最后面。 我们看看官方是怎么说的： arrayObj.srot(sortFunction) 参数 arrayObj 必选项。任意Array对象 sor ...', '', '', '0', '0', '0', '1', '100', '', '', '1541840681', '1541840681');
INSERT INTO `ob_article` VALUES ('7', '1', '使用Arcgis进行画面(线)并计算大小(长度)', '', '', '在使用Arcgis API for JavaScript进行做地图开发的过程中，在地图进行画线、画面是经常使用的功能。本文主要介绍这一功能。 本文适用Arcgis API版本：Arcgis API for JS 4.x以上。 方案分析： 方案分析： 首先要初始化&nbsp;map&nbsp;和&nbsp;mapView（2D m ...', '', '', '0', '0', '0', '1', '100', '', '', '1541840700', '1541840700');
INSERT INTO `ob_article` VALUES ('8', '1', 'sass使用中出现的问题', '', '', '问题一：ruby按照官方文档安装后更换gem源时，报错Error fetching https://gems.ruby-china.org/: bad response Not Found 404 (https://gems.ruby-china.org/specs.4.8.gz)；不知就里，在网上 ...', '', '', '0', '0', '0', '1', '100', '', '', '1541840718', '1541840718');
INSERT INTO `ob_article` VALUES ('9', '1', 'xss 跨站脚本攻击', '', '', '攻击原理 XSS（cross-site scripting跨域脚本攻击）攻击是最常见的Web攻击，它允许恶意web用户将代码植入到提供给其它用户使用的页面中。 xss 与其他的攻击方式相比缺点明显，如下： 1、耗时间 2、有一定几率不成功 3、没有相应的软件来完成自动化攻击 4、前期需要基本的htm ...', '', '', '0', '0', '0', '1', '100', '', '', '1541840736', '1541840736');
INSERT INTO `ob_article` VALUES ('10', '2', 'JSON解析', '', '', '以下为网络上搜集的关于JSON的资料，整合为随笔记录，供以后回顾。 百度：https://baike.baidu.com/item/JSON/2462549?fr=aladdin 一. 数据格式 1.数组方式： [ {\"key1\": \"value1\"}, {\"key2\": \"value2\"} ] 2 ...', '', '', '0', '0', '0', '1', '100', '', '', '1541840756', '1541840756');
INSERT INTO `ob_article` VALUES ('11', '1', 'visual studio2017 创建Vue项目', '', '', '1:打开Visual studio 2017后 按图片操作新建项目 也可以使用快捷键Ctrl+Shift+N 进入创建项目页面 2:选择JavaScript 里的Node.js创建对应的Vue项目 如果没有javaScript对应的node.js选项 打开最下面的visual studio安装程序  ...', '', '', '0', '0', '0', '1', '100', '', '', '1541840778', '1541840778');
INSERT INTO `ob_article` VALUES ('12', '1', 'javascript  数组 常用方法', '', '', '前言 学学忘忘 闲来做个笔记 整理下数组常用方法。 Array 数组常用方法 创建数组的基本方式有两种 1.第一种是使用Array构造函数， var arr = new Array(); 使用构造函数方式的话&nbsp;var arr = new Array(20),则表示创建了一个lenght值为20的数组 ...', '', '', '0', '0', '0', '1', '100', '', '', '1541840793', '1541840793');
INSERT INTO `ob_article` VALUES ('13', '1', '学了两天 react，乱讲一下学习思路，顺便弄了一个脚手架', '', '', '之前一直用 vue 做一些小项目，最近接触了一个项目是用 react 做前端，虽然本身是做后端开发的，但是前端还是要了解一点的。 现在的项目基本上都是前后端分离的，后端就先不提了。前端的框架也是层出不穷，使用最多的就是 angular、vue、react 。angular 是前几年用的比较多，最近好 ...', '', '', '0', '0', '0', '1', '100', '', '', '1541840808', '1541840808');
INSERT INTO `ob_article` VALUES ('14', '2', 'PHP 中的CURL 模拟表单的post提交', '', '', '废话不多说啦，直接上代码： 这里需要注意的是： 要想以 x-www-form-urlencoded 方式发送，最关键是发送的数据格式。 方式from-data试发送的数据用的是array格式，而方式为 x-www-form-urlencoded 时需要用key=value&key=value的格式发 ...', '', '', '0', '0', '0', '1', '100', '', '', '1541840846', '1541840846');
INSERT INTO `ob_article` VALUES ('15', '2', ' PHP解决跨域问题', '', '', '在做项目的过程中经常需要跨域访问。这里主要介绍一下 PHP 中怎么解决跨域问题。 1、允许所有域名访问 2、允许单个域名访问 3、允许多个域名访问 在实际项目中最好指定能跨域访问的域名，增加安全性。可以写在一个公共类里面，封装一个方法调用。 ...', '', '', '0', '0', '0', '1', '100', '', '', '1541840863', '1541840863');
INSERT INTO `ob_article` VALUES ('16', '1', '接口技术的实现:规范用户类的成员与类型', '', '', '', '', '', '0', '0', '0', '1', '100', '', '', '1541840882', '1541840882');

-- -----------------------------
-- Table structure for `ob_auth_group`
-- -----------------------------
DROP TABLE IF EXISTS `ob_auth_group`;
CREATE TABLE `ob_auth_group` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL DEFAULT '',
  `description` varchar(255) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `rules` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='权限组';

-- -----------------------------
-- Records of `ob_auth_group`
-- -----------------------------
INSERT INTO `ob_auth_group` VALUES ('1', '超级管理员', '', '1', '6,44,43,1,8,34,35,36,7,2,9,28,29,30,10,54,3,11,25,26,27,46,4,12,14,13,45,55,5,16,17,15,18');

-- -----------------------------
-- Table structure for `ob_auth_group_access`
-- -----------------------------
DROP TABLE IF EXISTS `ob_auth_group_access`;
CREATE TABLE `ob_auth_group_access` (
  `uid` smallint(5) unsigned NOT NULL DEFAULT '0',
  `group_id` smallint(5) unsigned NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='权限授权';

-- -----------------------------
-- Records of `ob_auth_group_access`
-- -----------------------------
INSERT INTO `ob_auth_group_access` VALUES ('1', '1');
INSERT INTO `ob_auth_group_access` VALUES ('2', '1');

-- -----------------------------
-- Table structure for `ob_auth_rule`
-- -----------------------------
DROP TABLE IF EXISTS `ob_auth_rule`;
CREATE TABLE `ob_auth_rule` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(11) unsigned NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL DEFAULT '',
  `url` varchar(255) NOT NULL DEFAULT '',
  `icon` varchar(64) NOT NULL DEFAULT '',
  `sort_order` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `type` char(4) NOT NULL DEFAULT '' COMMENT 'nav,auth',
  `index` tinyint(1) NOT NULL DEFAULT '0' COMMENT '快捷导航',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8 COMMENT='权限规则';

-- -----------------------------
-- Records of `ob_auth_rule`
-- -----------------------------
INSERT INTO `ob_auth_rule` VALUES ('1', '0', '内容', '', 'fa fa-book', '2', 'nav', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('2', '0', '会员', '', 'fa fa-users', '3', 'nav', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('3', '0', '扩展', '', 'fa fa-puzzle-piece', '4', 'nav', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('4', '0', '设置', '', 'fa fa-gear', '5', 'nav', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('5', '0', '权限', '', 'fa fa-lock', '6', 'nav', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('6', '0', '控制台', 'admin/index/index', '', '1', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('7', '1', '分类管理', 'admin/category/index', 'fa fa-navicon', '2', 'nav', '1', '1');
INSERT INTO `ob_auth_rule` VALUES ('8', '1', '文章管理', 'admin/article/index', 'fa fa-book', '1', 'nav', '1', '1');
INSERT INTO `ob_auth_rule` VALUES ('9', '2', '会员管理', 'admin/user/index', 'fa fa-users', '0', 'nav', '1', '1');
INSERT INTO `ob_auth_rule` VALUES ('10', '2', '会员日志', 'admin/user/log', 'fa fa-clock-o', '0', 'nav', '1', '1');
INSERT INTO `ob_auth_rule` VALUES ('11', '3', '广告管理', 'admin/ad/index', 'fa fa-image', '1', 'nav', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('12', '4', '基本设置', 'admin/config/setting', 'fa fa-cog', '1', 'nav', '1', '1');
INSERT INTO `ob_auth_rule` VALUES ('13', '4', '系统设置', 'admin/config/system', 'fa fa-wrench', '3', 'nav', '1', '1');
INSERT INTO `ob_auth_rule` VALUES ('14', '4', '设置管理', 'admin/config/index', 'fa fa-bars', '2', 'nav', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('15', '5', '权限规则', 'admin/auth/rule', 'fa fa-th-list', '3', 'nav', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('16', '5', '管理员', 'admin/admin/index', 'fa fa-user', '0', 'nav', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('17', '5', '权限组', 'admin/auth/group', 'fa fa-users', '1', 'nav', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('18', '5', '管理员日志', 'admin/admin/log', 'fa fa-clock-o', '5', 'nav', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('19', '14', '添加', 'admin/config/add', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('20', '14', '编辑', 'admin/config/edit', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('21', '14', '删除', 'admin/config/del', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('22', '15', '添加', 'admin/auth/addRule', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('23', '15', '编辑', 'admin/auth/editRule', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('24', '15', '删除', 'admin/auth/delRule', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('25', '11', '添加', 'admin/ad/add', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('26', '11', '编辑', 'admin/ad/edit', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('27', '11', '删除', 'admin/ad/del', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('28', '9', '添加', 'admin/user/add', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('29', '9', '编辑', 'admin/user/edit', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('30', '9', '删除', 'admin/user/del', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('31', '7', '添加', 'admin/category/add', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('32', '7', '编辑', 'admin/category/edit', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('33', '7', '删除', 'admin/category/del', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('34', '8', '添加', 'admin/article/add', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('35', '8', '编辑', 'admin/article/edit', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('36', '8', '删除', 'admin/article/del', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('37', '16', '添加', 'admin/admin/add', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('38', '16', '编辑', 'admin/admin/edit', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('39', '16', '删除', 'admin/admin/del', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('40', '17', '添加', 'admin/auth/addGroup', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('41', '17', '编辑', 'admin/auth/editGroup', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('42', '17', '删除', 'admin/auth/delGroup', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('43', '6', '修改密码', 'admin/index/editPassword', '', '2', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('44', '6', '清除缓存', 'admin/index/clear', '', '1', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('45', '4', '上传设置', 'admin/config/upload', 'fa fa-upload', '4', 'nav', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('46', '3', '数据管理', 'admin/database/index', 'fa fa-database', '4', 'nav', '1', '1');
INSERT INTO `ob_auth_rule` VALUES ('47', '46', '还原', 'admin/database/import', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('48', '46', '备份', 'admin/database/backup', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('49', '46', '优化', 'admin/database/optimize', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('50', '46', '修复', 'admin/database/repair', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('51', '46', '下载', 'admin/database/download', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('52', '46', '删除', 'admin/database/del', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('53', '18', '一键清空', 'admin/admin/truncate', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('54', '10', '一键清空', 'admin/user/truncate', '', '0', 'auth', '0', '1');
INSERT INTO `ob_auth_rule` VALUES ('55', '4', '邮件设置', 'admin/config/email', 'fa fa-envelope', '5', 'nav', '0', '1');

-- -----------------------------
-- Table structure for `ob_category`
-- -----------------------------
DROP TABLE IF EXISTS `ob_category`;
CREATE TABLE `ob_category` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `pid` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '上级分类ID',
  `category_name` varchar(255) NOT NULL DEFAULT '' COMMENT '标题',
  `sort_order` int(11) NOT NULL DEFAULT '100' COMMENT '排序',
  `keywords` varchar(255) DEFAULT '' COMMENT '关键字',
  `description` varchar(255) DEFAULT '' COMMENT '描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='分类';

-- -----------------------------
-- Records of `ob_category`
-- -----------------------------
INSERT INTO `ob_category` VALUES ('1', '0', '前端开发', '100', '', '');
INSERT INTO `ob_category` VALUES ('2', '0', '后端开发', '100', '', '');
INSERT INTO `ob_category` VALUES ('3', '0', '移动互联', '100', '', '');
INSERT INTO `ob_category` VALUES ('4', '0', '人工智能', '100', '', '');

-- -----------------------------
-- Table structure for `ob_config`
-- -----------------------------
DROP TABLE IF EXISTS `ob_config`;
CREATE TABLE `ob_config` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `group` varchar(32) NOT NULL DEFAULT '' COMMENT '配置分组',
  `title` varchar(255) NOT NULL DEFAULT '' COMMENT '配置标题',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '配置标识',
  `type` varchar(32) NOT NULL DEFAULT '' COMMENT '配置类型',
  `value` text NOT NULL COMMENT '默认值',
  `options` text COMMENT '选项值',
  `sort_order` int(11) NOT NULL DEFAULT '100' COMMENT '排序',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='配置';

-- -----------------------------
-- Records of `ob_config`
-- -----------------------------
INSERT INTO `ob_config` VALUES ('1', 'website', '网站logo', 'logo', 'image', '', '', '100', '1');
INSERT INTO `ob_config` VALUES ('2', 'website', '网站名称', 'site_name', 'input', 'OpenBMS', '', '100', '1');
INSERT INTO `ob_config` VALUES ('3', 'website', '网站标题', 'site_title', 'input', 'OpenBMS 开源后台管理系统', '', '100', '1');
INSERT INTO `ob_config` VALUES ('4', 'website', '网站关键字', 'site_keywords', 'input', 'OpenBMS,开源后台管理系统', '', '100', '1');
INSERT INTO `ob_config` VALUES ('5', 'website', '网站描述', 'site_description', 'textarea', 'OpenBMS,开源后台管理系统,Open Background Management System 开源后台管理系统', '', '100', '1');
INSERT INTO `ob_config` VALUES ('6', 'website', '版权信息', 'site_copyright', 'input', '', '', '100', '1');
INSERT INTO `ob_config` VALUES ('7', 'website', 'ICP备案号', 'site_icp', 'input', '', '', '100', '1');
INSERT INTO `ob_config` VALUES ('8', 'website', '统计代码', 'site_code', 'textarea', '', '', '100', '1');
INSERT INTO `ob_config` VALUES ('9', 'contact', '公司名称', 'company', 'input', '', '', '100', '1');
INSERT INTO `ob_config` VALUES ('10', 'contact', '公司地址', 'address', 'input', '', '', '100', '1');
INSERT INTO `ob_config` VALUES ('11', 'contact', '联系电话', 'tel', 'input', '', '', '100', '1');
INSERT INTO `ob_config` VALUES ('12', 'contact', '联系邮箱', 'email', 'input', '', '', '100', '1');

-- -----------------------------
-- Table structure for `ob_system`
-- -----------------------------
DROP TABLE IF EXISTS `ob_system`;
CREATE TABLE `ob_system` (
  `name` varchar(255) NOT NULL DEFAULT '',
  `value` text NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='系统配置';

-- -----------------------------
-- Records of `ob_system`
-- -----------------------------
INSERT INTO `ob_system` VALUES ('administrator', 'admin');
INSERT INTO `ob_system` VALUES ('colse_explain', '');
INSERT INTO `ob_system` VALUES ('email_server', 'a:7:{s:4:\"host\";s:0:\"\";s:6:\"secure\";s:3:\"tls\";s:4:\"port\";s:0:\"\";s:8:\"username\";s:0:\"\";s:8:\"password\";s:0:\"\";s:8:\"fromname\";s:0:\"\";s:5:\"email\";s:0:\"\";}');
INSERT INTO `ob_system` VALUES ('is_develop', '0');
INSERT INTO `ob_system` VALUES ('page_number', '10');
INSERT INTO `ob_system` VALUES ('upload_image', 'a:15:{s:8:\"is_thumb\";s:1:\"1\";s:9:\"max_width\";s:4:\"1200\";s:10:\"max_height\";s:4:\"3600\";s:8:\"is_water\";s:1:\"0\";s:12:\"water_source\";s:0:\"\";s:12:\"water_locate\";s:1:\"1\";s:11:\"water_alpha\";s:0:\"\";s:7:\"is_text\";s:1:\"0\";s:4:\"text\";s:0:\"\";s:9:\"text_font\";s:0:\"\";s:11:\"text_locate\";s:1:\"1\";s:9:\"text_size\";s:0:\"\";s:10:\"text_color\";s:0:\"\";s:11:\"text_offset\";s:0:\"\";s:10:\"text_angle\";s:0:\"\";}');
INSERT INTO `ob_system` VALUES ('website_status', '1');

-- -----------------------------
-- Table structure for `ob_user`
-- -----------------------------
DROP TABLE IF EXISTS `ob_user`;
CREATE TABLE `ob_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL COMMENT '用户名',
  `mobile` char(20) DEFAULT '' COMMENT '手机',
  `password` varchar(32) NOT NULL DEFAULT '' COMMENT '密码',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0禁用/1启动',
  `last_login_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '上次登录时间',
  `last_login_ip` varchar(16) NOT NULL DEFAULT '' COMMENT '上次登录IP',
  `login_count` int(11) NOT NULL DEFAULT '0' COMMENT '登录次数',
  `create_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='会员';

-- -----------------------------
-- Records of `ob_user`
-- -----------------------------
INSERT INTO `ob_user` VALUES ('1', 'lejRej', '13800138000', 'e10adc3949ba59abbe56e057f20f883e', '1', '1539134525', '127.0.0.1', '1', '1539134389', '1539134525');

-- -----------------------------
-- Table structure for `ob_user_log`
-- -----------------------------
DROP TABLE IF EXISTS `ob_user_log`;
CREATE TABLE `ob_user_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '管理员id',
  `username` varchar(32) NOT NULL DEFAULT '' COMMENT '管理员用户名',
  `useragent` varchar(255) NOT NULL DEFAULT '' COMMENT 'User-Agent',
  `ip` varchar(16) NOT NULL DEFAULT '' COMMENT 'ip地址',
  `url` varchar(255) NOT NULL DEFAULT '' COMMENT '请求链接',
  `method` varchar(32) NOT NULL DEFAULT '' COMMENT '请求类型',
  `type` varchar(32) NOT NULL DEFAULT '' COMMENT '资源类型',
  `param` text NOT NULL COMMENT '请求参数',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '日志备注',
  `create_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='会员日志';

