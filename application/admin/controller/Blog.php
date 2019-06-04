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
        return $this->fetch();
    }

    public function  add(){
        return $this->fetch('save');
    }


    public function  edit(){
        return $this->fetch('save');
    }

    public function del(){
        return 'success';
    }
}