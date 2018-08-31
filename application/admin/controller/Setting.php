<?php

namespace app\admin\controller;

use app\common\controller\AdminBase;
use think\Db;

class Setting extends AdminBase
{
    protected function _initialize()
    {
        parent::_initialize();
    }

    public function index()
    {
        $this->assign('list', ob_config()->get_config(['status' => 1]));
        return $this->fetch();
    }

    public function save()
    {
        if (request()->isPost()) {
            $data   = input();
            $config = Db::name('config');
            foreach ($data as $name => $value) {
                $config->where('name', $name)->setField('value', $value);
            }
            clear_cache();
            insert_admin_log('更新系统基本设置');
            $this->success('更新成功', '');
        }
    }
}
