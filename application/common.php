<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用公共文件

require_once 'helper.php';

use think\Db;

/**
 * 验证手机号是否正确
 * @param number $mobile
 */
function check_mobile($mobile)
{
    if (!is_numeric($mobile)) {
        return false;
    }
    return preg_match('#^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0,6,7,8]{1}\d{8}$|^18[\d]{9}$|^19[\d]{9}$#', $mobile) ? true : false;
}

/**
 * 验证密码长度
 * @param string $password 需要验证的密码
 * @param int    $min      最小长度
 * @param int    $max      最大长度
 */
function check_password($password, $min, $max)
{
    if (strlen($password) < $min || strlen($password) > $max) {
        return false;
    }
    return true;
}

/**
 * 清除系统缓存
 */
function clear_cache()
{
    $dir = new \core\Dir();
    $dir->delDir(ROOT_PATH . 'runtime/cache/');
}

/**
 * 是否在微信中
 */
function in_wechat()
{
    return strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false;
}

/**
 * 配置值解析成数组
 * @param string $value 配置值
 * @return array|string
 */
function parse_attr($value)
{
    if (is_array($value)) {
        return $value;
    }
    $array = preg_split('/[,;\r\n]+/', trim($value, ",;\r\n"));
    if (strpos($value, ':')) {
        $value = array();
        foreach ($array as $val) {
            list($k, $v) = explode(':', $val);
            $value[$k]   = $v;
        }
    } else {
        $value = $array;
    }
    return $value;
}

/**
 * 数组层级缩进转换
 * @param array $array 源数组
 * @param int   $pid
 * @param int   $level
 * @return array
 */
function list_to_level($array, $pid = 0, $level = 1)
{
    static $list = [];
    foreach ($array as $v) {
        if ($v['pid'] == $pid) {
            $v['level'] = $level;
            $list[]     = $v;
            list_to_level($array, $v['id'], $level + 1);
        }
    }
    return $list;
}

/**
 * 把返回的数据集转换成Tree
 * @param array $list 要转换的数据集
 * @param string $pid parent标记字段
 * @param string $level level标记字段
 * @return array
 * @author 麦当苗儿 <zuojiazi@vip.qq.com>
 */
function list_to_tree($list, $pk = 'id', $pid = 'pid', $child = 'children', $root = 0)
{
    // 创建Tree
    $tree = array();
    if (is_array($list)) {
        // 创建基于主键的数组引用
        $refer = array();
        foreach ($list as $key => $data) {
            $refer[$data[$pk]] = &$list[$key];
        }
        foreach ($list as $key => $data) {
            // 判断是否存在parent
            $parentId = $data[$pid];
            if ($root == $parentId) {
                $tree[] = &$list[$key];
            } else {
                if (isset($refer[$parentId])) {
                    $parent           = &$refer[$parentId];
                    $parent[$child][] = &$list[$key];
                }
            }
        }
    }
    return $tree;
}

/**
 * 将list_to_tree的树还原成列表
 * @param  array $tree  原来的树
 * @param  string $child 孩子节点的键
 * @param  string $order 排序显示的键，一般是主键 升序排列
 * @param  array  $list  过渡用的中间数组，
 * @return array        返回排过序的列表数组
 * @author yangweijie <yangweijiester@gmail.com>
 */
function tree_to_list($tree, $child = 'children', $order = 'id', &$list = array())
{
    if (is_array($tree)) {
        $refer = array();
        foreach ($tree as $key => $value) {
            $reffer = $value;
            if (isset($reffer[$child])) {
                unset($reffer[$child]);
                tree_to_list($value[$child], $child, $order, $list);
            }
            $list[] = $reffer;
        }
        $list = list_sort_by($list, $order, $sortby = 'asc');
    }
    return $list;
}

/**
 * 对查询结果集进行排序
 * @access public
 * @param array $list 查询结果
 * @param string $field 排序的字段名
 * @param array $sortby 排序类型
 * asc正向排序 desc逆向排序 nat自然排序
 * @return array
 */
function list_sort_by($list, $field, $sortby = 'asc')
{
    if (is_array($list)) {
        $refer = $resultSet = array();
        foreach ($list as $i => $data) {
            $refer[$i] = &$data[$field];
        }

        switch ($sortby) {
            case 'asc': // 正向排序
                asort($refer);
                break;
            case 'desc': // 逆向排序
                arsort($refer);
                break;
            case 'nat': // 自然排序
                natcasesort($refer);
                break;
        }
        foreach ($refer as $key => $val) {
            $resultSet[] = &$list[$key];
        }

        return $resultSet;
    }
    return false;
}

// 驼峰命名法转下划线风格
function to_under_score($str)
{
    $array = array();
    for ($i = 0; $i < strlen($str); $i++) {
        if ($str[$i] == strtolower($str[$i])) {
            $array[] = $str[$i];
        } else {
            if ($i > 0) {
                $array[] = '_';
            }
            $array[] = strtolower($str[$i]);
        }
    }
    $result = implode('', $array);
    return $result;
}

/**
 * 自动生成新尺寸的图片
 * @param string $filename 文件名
 * @param int $width  新图片宽度
 * @param int $height 新图片高度(如果没有填写高度，把高度等比例缩小)
 * @param int $type   缩略图裁剪类型
 *                    1 => 等比例缩放类型
 *                    2 => 缩放后填充类型
 *                    3 => 居中裁剪类型
 *                    4 => 左上角裁剪类型
 *                    5 => 右下角裁剪类型
 *                    6 => 固定尺寸缩放类型
 * @return string     生成缩略图的路径
 */
function resize($filename, $width, $height = null, $type = 1)
{
    if (!is_file(ROOT_PATH . $filename)) {
        return;
    }
    // 如果没有填写高度，把高度等比例缩小
    if ($height == null) {
        $info = getimagesize(ROOT_PATH . $filename);
        if ($width > $info[0]) {
            // 如果缩小后宽度尺寸大于原图尺寸，使用原图尺寸
            $width  = $info[0];
            $height = $info[1];
        } elseif ($width < $info[0]) {
            $height = floor($info[1] * ($width / $info[0]));
        } elseif ($width == $info[0]) {
            return $filename;
        }
    }
    $extension = pathinfo($filename, PATHINFO_EXTENSION);
    $old_image = $filename;
    $new_image = mb_substr($filename, 0, mb_strrpos($filename, '.')) . '_' . $width . 'x' . $height . '.' . $extension;
    $new_image = str_replace('uploads', 'cache', $new_image); // 缩略图存放于cache文件夹
    if (!is_file(ROOT_PATH . $new_image) || filectime(ROOT_PATH . $old_image) > filectime(ROOT_PATH . $new_image)) {
        $path        = '';
        $directories = explode('/', dirname(str_replace('../', '', $new_image)));
        foreach ($directories as $directory) {
            $path = $path . '/' . $directory;
            if (!is_dir(ROOT_PATH . $path)) {
                @mkdir(ROOT_PATH . $path, 0777);
            }
        }
        list($width_orig, $height_orig) = getimagesize(ROOT_PATH . $old_image);
        if ($width_orig != $width || $height_orig != $height) {
            $image = \think\Image::open(ROOT_PATH . $old_image);
            switch ($type) {
                case 1:
                    $image->thumb($width, $height, \think\Image::THUMB_SCALING);
                    break;

                case 2:
                    $image->thumb($width, $height, \think\Image::THUMB_FILLED);
                    break;

                case 3:
                    $image->thumb($width, $height, \think\Image::THUMB_CENTER);
                    break;

                case 4:
                    $image->thumb($width, $height, \think\Image::THUMB_NORTHWEST);
                    break;

                case 5:
                    $image->thumb($width, $height, \think\Image::THUMB_SOUTHEAST);
                    break;

                case 5:
                    $image->thumb($width, $height, \think\Image::THUMB_FIXED);
                    break;

                default:
                    $image->thumb($width, $height, \think\Image::THUMB_SCALING);
                    break;
            }
            $image->save(ROOT_PATH . $new_image);
        } else {
            copy(ROOT_PATH . $old_image, ROOT_PATH . $new_image);
        }
    }
    return $new_image;
}

/**
 * 保存后台用户行为
 * @param string $remark 日志备注
 */
function insert_admin_log($remark)
{
    $admin = session('admin_auth');
    Db::name('admin_log')->insert([
        'admin_id'  => $admin['admin_id'],
        'username'  => $admin['username'],
        'useragent' => request()->server('HTTP_USER_AGENT'),
        'ip'        => request()->ip(),
        'url'       => request()->url(true),
        'method'    => request()->method(),
        'type'      => request()->type(),
        'param'     => json_encode(request()->param()),
        'remark'    => $remark,
        'add_time'  => time(),
    ]);
}

/**
 * 保存前台用户行为
 * @param string $remark 日志备注
 */
function insert_user_log($remark)
{
    $user = session('user_auth');
    Db::name('user_log')->insert([
        'user_id'   => $user['user_id'],
        'username'  => $user['username'],
        'useragent' => request()->server('HTTP_USER_AGENT'),
        'ip'        => request()->ip(),
        'url'       => request()->url(true),
        'method'    => request()->method(),
        'type'      => request()->type(),
        'param'     => json_encode(request()->param()),
        'remark'    => $remark,
        'add_time'  => time(),
    ]);
}

/**
 * 检测管理员是否登录
 * @return integer 0/管理员ID
 */
function is_admin_login()
{
    $admin = session('admin_auth');
    if (empty($admin)) {
        return 0;
    } else {
        return session('admin_auth_sign') == data_auth_sign($admin) ? $admin['admin_id'] : 0;
    }
}

/**
 * 检测会员是否登录
 * @return integer 0/管理员ID
 */
function is_user_login()
{
    $user = session('user_auth');
    if (empty($user)) {
        return 0;
    } else {
        return session('user_auth_sign') == data_auth_sign($user) ? $user['user_id'] : 0;
    }
}

/**
 * 数据签名认证
 * @param  array $data 被认证的数据
 * @return string       签名
 */
function data_auth_sign($data)
{
    // 数据类型检测
    if (!is_array($data)) {
        $data = (array) $data;
    }
    ksort($data); // 排序
    $code = http_build_query($data); // url编码并生成query字符串
    $sign = sha1($code); // 生成签名
    return $sign;
}