<?php

namespace app\admin\controller;

use app\common\controller\AdminBase;

class Addons extends AdminBase
{
    protected function _initialize()
    {
        parent::_initialize();
    }

    public function index()
    {
        $config = get_addon_class('database');
        dump($config);
    }
}
