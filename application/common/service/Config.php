<?php

namespace app\common\service;

use think\Db;

class Config
{
    /**
     * object 对象实例
     */
    private static $instance;

    // 禁外部实例化
    private function __construct()
    {}

    // 单例模式
    public static function getInstance()
    {
        if (!(self::$instance instanceof self)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    // 禁克隆
    private function __clone()
    {}

    // 获取配置数据
    public function get_config($map = [])
    {
        $config_group = $this->get_config_group();
        $list         = [];
        foreach ($config_group as $k => $v) {
            $list[$k]           = $v;
            $map['group_id']    = $v['id'];
            $list[$k]['config'] = Db::name('config')->where($map)->order('sort_order asc')->select();
            foreach ($list[$k]['config'] as $i => $j) {
                if (!empty($j['options'])) {
                    $list[$k]['config'][$i]['options'] = parse_attr($j['options']);
                }
            }
        }
        return $list;
    }

    // 获取配置分类
    public function get_config_group()
    {
        return Db::name('config_group')->where('status', 1)->order('sort_order asc')->select();
    }

    // 获取配置类型
    public function get_config_type()
    {
        return Db::name('config_type')->select();
    }
}
