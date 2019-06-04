<?php

namespace app\common\controller;

class AdminBase extends Base
{
    protected $noLogin = []; // 不用权限认证和登录的方法
    protected $noAuth = []; // 不用权限认证要登录的方法

    protected function _initialize()
    {
        parent::_initialize();
        !$this->checkLogin() && $this->redirect('admin/index/login');
        !$this->checkAuth() && $this->error('没有权限，请联系管理员');
        if ($this->request->isGet()) {
            $this->assign('navbar', list_to_tree($this->getNavbar()));
            $this->assign('breadcrumb', array_reverse(explode(',', $this->getBreadcrumb())));
            $this->assign('empty', '<tr><td colspan="20">~~暂无数据</td></tr>');
        }
    }

    // 检查登录
    public function checkLogin()
    {
        if (!is_admin_login() &&
            !in_array($this->request->action(), $this->noLogin)) {
            return false;
        }
        return true;
    }

    // 权限认证
    public function checkAuth()
    {
        if (session('admin_auth.username') != config('administrator') &&
            !in_array($this->request->action(), $this->noLogin) &&
            !in_array($this->request->action(), $this->noAuth) &&
            !(new \core\Auth())->check($this->request->module() . '/'
                . to_under_score($this->request->controller()) . '/'
                . $this->request->action(), session('admin_auth.admin_id'))) {
            return false;
        }
        return true;
    }

    // 获取导航栏
    public function getNavbar()
    {
        $where = ['type' => 'nav', 'status' => 1];
        if (session('admin_auth.username') != config('administrator')) {
            $access      = model('authGroupAccess')->with('authGroup')
                ->where('uid', session('admin_auth.admin_id'))->find();
            $where['id'] = ['in', $access['rules']];
        }
        return collection(model('authRule')->where($where)
            ->order('sort_order asc')->select())->toArray();
    }

    // 获取面包屑
    public function getBreadcrumb($id = null)
    {
        if ($authRule = model('authRule')->where(empty($id) ? ['url' => $this->request->module() . '/'
            . to_under_score($this->request->controller()) . '/'
            . $this->request->action()] : ['id' => $id])->order('pid desc')->find()) {
            $breadcrumb = $authRule['name'];
            if ($authRule['pid'] != 0) {
                $breadcrumb .= ',' . $this->getBreadcrumb($authRule['pid']);
            }
            return $breadcrumb;
        }
    }


    //上传设置
    public function uploads_img(){
        // 获取表单上传文件 例如上传了001.jpg
        $file = request()->file('image');
        dump($file);
        exit();

        // 移动到框架应用根目录/public/uploads/ 目录下
        if($file){
            $info = $file->move(ROOT_PATH . 'public' . DS . 'uploads');
            if($info){
                // 成功上传后 获取上传信息
                // 输出 jpg
                echo $info->getExtension();
            }else{
                // 上传失败获取错误信息
                echo $file->getError();
            }
        }
    }
}
