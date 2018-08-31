<?php

namespace app\admin\controller;

use app\common\controller\AdminBase;
use think\Db;

class Auth extends AdminBase
{
    public function group()
    {
        $this->assign('list', Db::name('auth_group')->paginate(config('system.page_number')));
        return $this->fetch();
    }

    public function add_group()
    {
        if ($this->request->isPost()) {
            $this->single_table_insert('auth_group', '添加了用户组', url('admin/auth/group'));
        }
        $auth_rule  = Db::name('auth_rule')->order('sort_order asc')->select();
        foreach ($auth_rule as $k => $v) {
            // $auth_rule[$k]['open'] = true;
        }
        $this->assign('auth_rule', json_encode(list_to_tree($auth_rule)));
        $this->assign('action', url('admin/auth/add_group'));
        return $this->fetch();
    }

    public function edit_group()
    {
        if ($this->request->isPost()) {
            $this->single_table_update('auth_group', '修改了用户组', url('admin/auth/group'));
        }
        $data = Db::name('auth_group')->where('id', (int) input('id'))->find();
        $rules = explode(',', $data['rules']);
        $auth_rule  = Db::name('auth_rule')->order('sort_order asc')->select();
        foreach ($auth_rule as $k => $v) {
            // $auth_rule[$k]['open'] = true;
            if (in_array($v['id'], $rules)) {
                $auth_rule[$k]['checked'] = true;
            }
        }
        $this->assign('data', $data);
        $this->assign('auth_rule', json_encode(list_to_tree($auth_rule)));
        $this->assign('action', url('admin/auth/edit_group'));
        return $this->fetch('add_group');
    }

    public function del_group()
    {
        $this->single_table_delete('auth_group', '删除了用户组');
    }

    public function set_group_status()
    {
        $this->single_table_set('auth_group', '修改了用户组状态');
    }

    public function rule()
    {
        $auth_rule  = Db::name('auth_rule')->order('sort_order asc')->select();
        foreach ($auth_rule as $k => $v) {
            // $auth_rule[$k]['open'] = true;
        }
        $this->assign('auth_rule', json_encode(list_to_tree($auth_rule)));
        return $this->fetch();
    }

    public function add_rule()
    {
        if ($this->request->isPost()) {
            $this->single_table_insert('auth_rule', '添加了权限规则', url('admin/auth/rule'));
        }
        $this->assign('action', url('admin/auth/add_rule'));
        return $this->fetch();
    }

    public function edit_rule()
    {
        if ($this->request->isPost()) {
            $this->single_table_update('auth_rule', '修改了权限规则', url('admin/auth/rule'));
        }
        $this->assign('data', Db::name('auth_rule')->where('id', (int) input('id'))->find());
        $this->assign('action', url('admin/auth/edit_rule'));
        return $this->fetch('add_rule');
    }

    public function del_rule()
    {
        if (Db::name('auth_rule')->where('pid', (int) input('id'))->find()) {
            $this->error('请先删除子节点');
        }
        $this->single_table_delete('auth_rule', '删除了权限规则');
    }
}
