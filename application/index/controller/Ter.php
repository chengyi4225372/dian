<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/13
 * Time: 11:58
 */

namespace app\index\controller;

use app\common\controller\IndexBase;
class Ter extends  IndexBase
{
    //terpenes
    public  function index(){
      return $this->fetch();
    }
}