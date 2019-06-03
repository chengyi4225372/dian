<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/13
 * Time: 11:22
 */
namespace app\index\controller;

use app\common\controller\IndexBase;

class Vapo extends IndexBase{
    //voporizer
    public  function index(){
         return $this->fetch();
    }


    public function detail(){
       return  $this->fetch();
    }

}