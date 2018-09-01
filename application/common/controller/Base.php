<?php

namespace app\common\controller;

use think\Controller;
use think\Db;

class Base extends Controller
{
    protected function _initialize()
    {
        parent::_initialize();
        $system = cache('db_system_data');
        if (!$system) {
            $data   = Db::name('system')->select();
            $system = [];
            foreach ($data as $v) {
                $system[$v['name']] = $v['value'];
            }
            cache('db_system_data', $system);
        }
        config($system);
    }
}
