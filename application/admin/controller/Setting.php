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
        if ($this->request->isPost()) {
            $param  = $this->request->param();
            $config = Db::name('config');
            foreach ($param as $name => $value) {
                $config->where('name', $name)->setField('value', $value);
            }
            clear_cache();
            insert_admin_log('更新基本设置');
            $this->success('更新成功', '');
        }
        $this->assign('list', ob_config()->get_config(['status' => 1]));
        return $this->fetch();
    }

    public function system()
    {
        if ($this->request->isPost()) {
            try {
                $param = $this->request->param();
                foreach ($param as $name => $value) {
                    Db::name('system')->where('name', $name)->setField('value', $value);
                }
            } catch (\Exception $e) {
                $this->error($e->getMessage());
            }
            clear_cache();
            insert_admin_log('更新系统设置');
            $this->success('保存成功');
        }
        $list = Db::name('system')->select();
        $data = [];
        foreach ($list as $v) {
            $data[$v['name']] = $v['value'];
        }
        $this->assign('data', $data);
        return $this->fetch();
    }
}
