<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/6/4
 * Time: 11:29
 */

namespace app\admin\controller;

use app\common\controller\AdminBase;

class Blog extends AdminBase
{
    protected function _initialize()
    {
        parent::_initialize();
    }

    public function index(){
        $list = model('blog')->field('id,title,img,create_time')->select();
        $this->assign('list',$list);
        return $this->fetch();
    }

    public function  add(){
        if ($this->request->isPost()) {
            if ($this->insert('blog', $this->request->param()) === true) {
                $this->success('添加成功', url('admin/blog/index'));
            } else {
                $this->error($this->errorMsg);
            }
        }
        return $this->fetch('save');
    }


    public function  edit(){
        if ($this->request->isPost()) {
            $param = $this->request->param();
            if (is_array($param['id'])) {
                $data = [];
                foreach ($param['id'] as $v) {
                    $data[] = ['id' => $v, $param['name'] => $param['value']];
                }
                $result = $this->saveAll('blog', $data, input('_verify', true));
            } else {
                $result = $this->update('blog', $param, input('_verify', true));
            }
            if ($result === true) {
                insert_admin_log('修改了文章');
                $this->success('修改成功', url('admin/blog/index'));
            } else {
                $this->error($this->errorMsg);
            }
        }
        return $this->fetch('save',['data'=>model('blog')->get(input('id'))]);
    }

    public function del(){
        if ($this->request->isPost()) {
            if ($this->delete('blog', $this->request->param()) === true) {
                insert_admin_log('删除了文章');
                $this->success('删除成功');
            } else {
                $this->error($this->errorMsg);
            }
        }
    }
}