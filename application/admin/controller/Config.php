<?php

namespace app\admin\controller;

use app\common\controller\AdminBase;
use think\Db;

class Config extends AdminBase
{
    public function index()
    {
        $this->assign('list', ob_config()->get_config());
        return $this->fetch();
    }

    public function add()
    {
        if ($this->request->isPost()) {
            $this->single_table_insert('config', '添加了系统配置', url('admin/config/index'));
        }
        $this->assign('config_group', ob_config()->get_config_group());
        $this->assign('config_type', ob_config()->get_config_type());
        $this->assign('action', url('admin/config/add'));
        return $this->fetch();
    }

    public function edit()
    {
        $data = Db::name('config')->where('id', (int) input('id'))->find();
        if ($this->request->isPost()) {
            if ($data['system'] == 1) {
                $this->error('系统配置不可编辑');
            }
            $this->single_table_update('config', '修改了系统配置', url('admin/config/index'));
        }
        $this->assign('data', $data);
        $this->assign('config_group', ob_config()->get_config_group());
        $this->assign('config_type', ob_config()->get_config_type());
        $this->assign('action', url('admin/config/edit'));
        return $this->fetch('add');
    }

    public function del()
    {
        $data = Db::name('config')->where('id', (int) input('id'))->find();
        if ($data['system'] == 1) {
            $this->error('系统配置不可删除');
        }
        $this->single_table_delete('config', '删除了系统配置');
    }

    public function set_status()
    {
        $this->single_table_set('config', '修改了配置状态');
    }

    public function set_sort_order()
    {
        $this->single_table_set('config', '修改了配置排序');
    }

    // 配置分组
    public function group()
    {
        $this->assign('list', Db::name('config_group')->order('sort_order asc')->paginate(config('system.page_number')));
        return $this->fetch();
    }

    // 添加配置分组
    public function add_group()
    {
        if ($this->request->isPost()) {
            $this->single_table_insert('config_group', '添加了配置分类', url('admin/config/group'));
        }
        $this->assign('action', url('admin/config/add_group'));
        return $this->fetch();
    }

    // 修改配置分组
    public function edit_group()
    {
        $data = Db::name('config_group')->where('id', (int) input('id'))->find();
        if ($this->request->isPost()) {
            if ($data['system'] == 1) {
                $this->error('系统配置分类不可编辑');
            }
            $this->single_table_update('config_group', '修改了配置分类', url('admin/config/group'));
        }
        $this->assign('data', $data);
        $this->assign('action', url('admin/config/edit_group'));
        return $this->fetch('add_group');
    }

    // 删除配置分组
    public function del_group()
    {
        $data = Db::name('config_group')->where('id', (int) input('id'))->find();
        if ($data['system'] == 1) {
            $this->error('系统配置分类不可删除');
        }
        $this->single_table_delete('config_group', '删除了配置分类');
    }

    // 设置配置分组状态
    public function set_group_status()
    {
        $this->single_table_set('config_group', '修改了配置分组状态');
    }

    // 设置配置分组排序
    public function set_group_sort_order()
    {
        $this->single_table_set('config_group', '修改了配置分组排序');
    }
}
