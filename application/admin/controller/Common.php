<?php

namespace app\admin\controller;

use app\common\controller\Base;
use think\Db;

class Common extends Base
{
    protected function _initialize()
    {
        parent::_initialize();
        if (is_admin_login()) {
            if (in_array($this->request->action(), ['login', 'captcha'])) {
                $this->redirect('admin/index/index');
            }
        } else {
            if (in_array($this->request->action(), ['upload', 'icon'])) {
                die();
            }
        }
    }

    public function login()
    {
        if (is_admin_login()) {
            $this->redirect('admin/index/index');
        }
        if ($this->request->isPost()) {
            $param    = $this->request->param();
            $validate = $this->validate($param, 'login');
            if ($validate !== true) {
                $this->error($validate);
            } else {
                $admin = Db::name('admin')->where([
                    'username' => $param['username'],
                    'password' => md5($param['password']),
                ])->find();
                if ($admin) {
                    if ($admin['status'] != 1) {
                        $this->error('账号已禁用');
                    }
                    // 保存状态
                    $auth = [
                        'admin_id' => $admin['id'],
                        'username' => $admin['username'],
                    ];
                    session('admin_auth', $auth);
                    session('admin_auth_sign', data_auth_sign($auth));
                    // 更新信息
                    Db::name('admin')->where('id', $admin['id'])->update([
                        'last_login_time' => time(),
                        'last_login_ip'   => $this->request->ip(),
                        'login_count'     => Db::raw('login_count+1'),
                    ]);
                    insert_admin_log('登录了后台系统');
                    $this->success('登录成功', url('admin/index/index'));
                } else {
                    $this->error('账号或密码错误');
                }
            }
        }
        return $this->fetch();
    }

    public function captcha()
    {
        $config = [
            // 验证码字符集合
            'codeSet'  => '2345678abcdefhijkmnpqrstuvwxyzABCDEFGHJKLMNPQRTUVWXY',
            // 验证码字体大小(px)
            'fontSize' => 16,
            // 是否画混淆曲线
            'useCurve' => false,
            // 验证码图片高度
            'imageH'   => 42,
            // 验证码图片宽度
            'imageW'   => 135,
            // 验证码位数
            'length'   => 4,
            // 验证成功后是否重置
            'reset'    => true,
        ];
        return captcha('', $config);
    }

    public function upload()
    {
        $files = $this->request->file('file');
        $info  = $files->move(ROOT_PATH . 'public' . DS . 'uploads');
        if ($info) {
            $url    = '/public/uploads/' . str_replace('\\', '/', $info->getSaveName());
            $result = [
                'code' => 1,
                'url'  => $url,
            ];
        } else {
            $result = [
                'code' => 0,
                'msg'  => $files->getError(),
            ];
        }
        return $result;
    }

    public function icon()
    {
        return $this->fetch();
    }
}
