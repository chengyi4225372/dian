<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/13
 * Time: 16:37
 */
namespace app\index\controller;

use app\common\controller\IndexBase;
class Blog extends  IndexBase
{
    public function index(){
      return $this->fetch();
    }

    public function detail(){
      return $this->fetch();
    }
}