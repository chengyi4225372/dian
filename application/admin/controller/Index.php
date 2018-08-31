<?php

namespace app\admin\controller;

use app\common\controller\AdminBase;
use think\Db;

class Index extends AdminBase
{
    public function index()
    {
        return $this->fetch();
    }

    // 修改密码
    public function edit_password()
    {
        if ($this->request->isPost()) {
            $param    = $this->request->param();
            $admin_id = session('admin_auth.admin_id');
            // 验证条件
            empty($param['password']) && $this->error('请输入旧密码');
            empty($param['new_password']) && $this->error('请输入新密码');
            empty($param['rep_password']) && $this->error('请输入确认密码');
            !check_password($param['new_password'], 6, 16) && $this->error('请输入6-16位的密码');
            if ($param['new_password'] != $param['rep_password']) {
                $this->error('两次密码不一致');
            }
            if (Db::name('admin')->where(['id' => $admin_id, 'password' => md5($param['password'])])->count()) {
                if (Db::name('admin')->where('id', $admin_id)->update(['password' => md5($param['new_password'])])) {
                    insert_admin_log('修改了登录密码');
                    $this->success('更新成功', url('admin/index/index'));
                } else {
                    $this->error('更新失败');
                }
            } else {
                $this->error('旧密码错误');
            }
        }
        return $this->fetch();
    }

    // 退出登录
    public function logout()
    {
        insert_admin_log('退出了后台系统');
        session('admin_auth', null);
        session('admin_auth_sign', null);
        $this->redirect('admin/common/login');
    }

    // 清除缓存
    public function clear()
    {
        clear_cache();
        insert_admin_log('清除了系统缓存');
        return $this->success('清除完成');
    }
}
