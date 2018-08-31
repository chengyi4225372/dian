<?php

namespace app\admin\controller;

use app\common\controller\AdminBase;
use think\Db;

class User extends AdminBase
{
    protected function _initialize()
    {
        parent::_initialize();
    }

    public function index()
    {
        $list = Db::name('user')->order('add_time desc')->paginate(config('system.page_number'));
        $this->assign('list', $list);
        return $this->fetch();
    }

    public function add()
    {
        if ($this->request->isPost()) {
            $param    = $this->request->param();
            $validate = $this->validate($param, 'user');
            if ($validate !== true) {
                $this->error($validate);
            }
            if (empty($param['password'])) {
                $this->error('密码不能为空');
            }
            $data = [
                'username' => $param['username'],
                'password' => md5($param['password']),
                'mobile'   => $param['mobile'],
                'email'    => $param['email'],
                'add_time' => time(),
            ];
            try {
                $user_id = Db::name('user')->insert($data, false, true);
            } catch (\Exception $e) {
                $this->error($e->getMessage());
            }
            if ($user_id) {
                insert_admin_log('添加了用户');
                $this->success('添加成功', url('admin/user/index'));
            } else {
                $this->error('添加失败');
            }
        }
        $this->assign('action', url('admin/user/add'));
        return $this->fetch('edit');
    }

    public function edit()
    {
        if ($this->request->isPost()) {
            $param    = $this->request->param();
            $validate = $this->validate($param, 'user');
            if ($validate !== true) {
                $this->error($validate);
            }
            $data = [
                'id'       => $param['id'],
                'username' => $param['username'],
                'mobile'   => $param['mobile'],
                'email'    => $param['email'],
            ];
            if (!empty($param['password'])) {
                $data['password'] = md5($param['password']);
            }
            try {
                $result = Db::name('user')->update($data);
            } catch (\Exception $e) {
                $this->error($e->getMessage());
            }
            if ($result) {
                insert_admin_log('修改了用户');
                $this->success('更新成功', url('admin/user/index'));
            } else {
                $this->error('更新失败');
            }
        }
        $this->assign('data', Db::name('user')->where('id', (int) input('id'))->find());
        $this->assign('action', url('admin/user/edit'));
        return $this->fetch();
    }

    public function del()
    {
        $this->single_table_delete('user', '删除了用户');
    }

    public function set_status()
    {
        $this->single_table_set('user', '修改了用户状态');
    }

    public function log()
    {
        $this->assign('list', Db::name('user_log')->order('add_time desc')->paginate(config('system.page_number')));
        return $this->fetch();
    }
}
