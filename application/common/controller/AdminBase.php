<?php

namespace app\common\controller;

use think\Db;

class AdminBase extends Base
{
    protected function _initialize()
    {
        parent::_initialize();
        if (!is_admin_login()) {
            $this->redirect('admin/common/login');
        }
        if (!$this->check_auth()) {
            $this->error('没有权限，请联系管理员');
        }
        if ($this->request->isGet()) {
            $this->assign('navbar', list_to_tree($this->get_navbar()));
            $this->assign('breadcrumb', array_reverse(explode(',', $this->get_breadcrumb())));
            $this->assign('empty', '<tr><td colspan="20">~~暂无数据</td></tr>');
        }
    }

    // 权限认证
    public function check_auth()
    {
        if (session('admin_auth.username') != 'admin') {
            $auth = new \core\Auth();
            if (!$auth->check($this->request->module() . '/'
                . to_under_score($this->request->controller()) . '/'
                . $this->request->action(), session('admin_auth.admin_id'))) {
                return false;
            }
        }
        return true;
    }

    // 获取导航栏
    public function get_navbar()
    {
        if (session('admin_auth.username') != 'admin') {
            $access = Db::view('auth_group_access')
                ->view('auth_group', 'rules', 'auth_group_access.group_id=auth_group.id', 'left')
                ->where('auth_group_access.uid', session('admin_auth.admin_id'))
                ->find();
            $navbar = Db::name('auth_rule')->where([
                'id'     => ['in', $access['rules']],
                'type'   => 'nav',
                'status' => 1,
            ])->order('sort_order asc')->select();
        } else {
            $navbar = Db::name('auth_rule')->where([
                'type'   => 'nav',
                'status' => 1,
            ])->order('sort_order asc')->select();
        }
        return $navbar;
    }

    // 获取面包屑
    public function get_breadcrumb($id = '')
    {
        if (empty($id)) {
            $url       = $this->request->module() . '/' . to_under_score($this->request->controller()) . '/' . $this->request->action();
            $auth_rule = Db::name('auth_rule')->where('url', $url)->order('pid desc')->find();
        } else {
            $auth_rule = Db::name('auth_rule')->where('id', $id)->order('pid desc')->find();
        }
        if ($auth_rule) {
            $breadcrumb = $auth_rule['name'];
            if ($auth_rule['pid'] != 0) {
                $breadcrumb .= ',' . $this->get_breadcrumb($auth_rule['pid']);
            }
            return $breadcrumb;
        }
    }

    /**
     * 用于单表插入操作
     * @param $table_name 表名
     * @param $admin_log  日志
     * @param $url        跳转url
     */
    public function single_table_insert($table_name, $admin_log, $url = null)
    {
        $param    = $this->request->param();
        $validate = $this->validate($param, $table_name);
        if ($validate !== true) {
            $this->error($validate);
        }
        try {
            $result = Db::name($table_name)->insert($param);
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
        if ($result) {
            insert_admin_log($admin_log);
            $this->success('添加成功', $url);
        } else {
            $this->error('添加失败');
        }
    }

    /**
     * 用于单表更新操作
     * @param $table_name 表名
     * @param $admin_log  日志
     * @param $url        跳转url
     */
    public function single_table_update($table_name, $admin_log, $url = null)
    {
        $param    = $this->request->param();
        $validate = $this->validate($param, $table_name);
        if ($validate !== true) {
            $this->error($validate);
        }
        try {
            $result = Db::name($table_name)->update($param);
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
        if ($result) {
            insert_admin_log($admin_log);
            $this->success('更新成功', $url);
        } else {
            $this->error('更新失败');
        }
    }

    /**
     * 用于单表删除操作
     * @param $table_name 表名
     * @param $admin_log  日志
     */
    public function single_table_delete($table_name, $admin_log)
    {
        try {
            $result = Db::name($table_name)->delete((int)input('id'));
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
        if ($result) {
            insert_admin_log($admin_log);
            $this->success('删除成功');
        } else {
            $this->error('删除失败');
        }
    }

    /**
     * 用于设置字段操作
     * @param $table_name 表名
     * @param $admin_log  日志
     */
    public function single_table_set($table_name, $admin_log)
    {
        $param = $this->request->param();
        try {
            $result = Db::name($table_name)
                ->where('id', $param['id'])
                ->update([$param['name'] => $param['value'] == 'true' ? 1 : ($param['value'] == 'false' ? 0 : $param['value'])]);
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
        if ($result) {
            insert_admin_log($admin_log);
            $this->success('设置成功');
        } else {
            $this->error('设置失败');
        }
    }

    /**
     * 用于批量更新操作
     * @param $table_name 表名
     * @param $admin_log  日志
     */
    public function batch_table_update($table_name, $admin_log)
    {
        $param = $this->request->param();
        empty($param['ids']) && $this->error('请选择数据');
        try {
            $result = Db::name($table_name)
                ->where('id', 'in', $param['ids'])
                ->update([$param['name'] => $param['value']]);
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
        if ($result) {
            insert_admin_log($admin_log);
            $this->success('更新成功');
        } else {
            $this->error('更新失败');
        }
    }

    /**
     * 用于批量删除操作
     * @param $table_name 表名
     * @param $admin_log  日志
     */
    public function batch_table_delete($table_name, $admin_log)
    {
        $param = $this->request->param();
        empty($param['ids']) && $this->error('请选择数据');
        try {
            $result = Db::name($table_name)
                ->where('id', 'in', $param['ids'])
                ->delete();
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
        if ($result) {
            insert_admin_log($admin_log);
            $this->success('删除成功');
        } else {
            $this->error('删除失败');
        }
    }
}
