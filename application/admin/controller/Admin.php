<?php

namespace app\admin\controller;

use app\common\controller\AdminBase;
use think\Db;

class Admin extends AdminBase
{
    public function index()
    {
        $list = Db::view('admin')
            ->view('auth_group_access', 'group_id', 'admin.id=auth_group_access.uid', 'left')
            ->view('auth_group', 'name', 'auth_group_access.group_id=auth_group.id', 'left')
            ->where('admin.username', 'neq', 'admin')
            ->paginate(config('page_number'));
        $this->assign('list', $list);
        return $this->fetch();
    }

    public function add()
    {
        if ($this->request->isPost()) {
            $param    = $this->request->param();
            $validate = $this->validate($param, 'admin');
            if ($validate !== true) {
                $this->error($validate);
            }
            if (empty($param['password'])) {
                $this->error('密码不能为空');
            }
            $data = [
                'username' => $param['username'],
                'password' => md5($param['password']),
                'add_time' => time(),
            ];
            $admin_id = Db::name('admin')->insert($data, false, true);
            if ($admin_id) {
                Db::name('auth_group_access')->insert([
                    'uid'      => $admin_id,
                    'group_id' => $param['group_id'],
                ]);
                insert_admin_log('添加了管理员');
                $this->success('添加成功', url('admin/admin/index'));
            } else {
                $this->error('添加失败');
            }
        }
        $this->assign('auth_group', Db::name('auth_group')->where('status', 1)->select());
        $this->assign('action', url('admin/admin/add'));
        return $this->fetch();
    }

    public function edit()
    {
        if ($this->request->isPost()) {
            $param    = $this->request->param();
            $validate = $this->validate($param, 'admin');
            if ($validate !== true) {
                $this->error($validate);
            }
            $data = [
                'id'        => $param['id'],
                'username'  => $param['username'],
                'edit_time' => time(),
            ];
            if (!empty($param['password'])) {
                $data['password'] = md5($param['password']);
            }
            if (Db::name('admin')->update($data)) {
                Db::name('auth_group_access')->where('uid', $param['id'])->update([
                    'group_id' => $param['group_id'],
                ]);
                insert_admin_log('修改了管理员');
                $this->success('更新成功', url('admin/admin/index'));
            } else {
                $this->error('更新失败');
            }
        }
        $data = Db::view('admin')
            ->view('auth_group_access', 'group_id', 'admin.id=auth_group_access.uid', 'left')
            ->where('admin.id', (int) input('id'))
            ->find();
        $this->assign('data', $data);
        $this->assign('auth_group', Db::name('auth_group')->where('status', 1)->select());
        $this->assign('action', url('admin/admin/edit'));
        return $this->fetch('add');
    }

    public function del()
    {
        try {
            $result = Db::name('admin')->delete((int) input('id'));
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
        if ($result) {
            Db::name('auth_group_access')->where('uid', (int) input('id'))->delete();
            insert_admin_log('删除了管理员');
            $this->success('删除成功');
        } else {
            $this->error('删除失败');
        }
    }

    public function set_status()
    {
        $this->single_table_set('admin', '修改了管理员状态');
    }

    public function log()
    {
        $this->assign('list', Db::name('admin_log')->order('add_time desc')->paginate(config('page_number')));
        return $this->fetch();
    }
}
