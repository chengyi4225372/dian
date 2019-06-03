<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/13
 * Time: 16:33
 */
namespace  Index\Controller;

use Think\Controller;
use app\common\controller\IndexBase;
class Pages extends  IndexBase
{
     //about-us
    public  function index(){
      return $this->fetch();
    }

    public function terms(){
        return $this->fetch();
    }

    public function privacy(){
        return $this->fetch();
    }
}