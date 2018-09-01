<?php

namespace app\common\controller;

use think\Db;

class IndexBase extends Base
{
    protected function _initialize()
    {
        parent::_initialize();
        // 设置基本配置
        $config = cache('db_config_data');
        if (!$config) {
            $data = ob_config()->get_config();
            $config = [];
            foreach ($data as $v) {
                foreach ($v['config'] as $c) {
                    $config[$v['value']][$c['name']] = $c['value'];
                }
            }
            cache('db_config_data', $config);
        }
        config($config);
    }
}
