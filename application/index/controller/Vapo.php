<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/13
 * Time: 11:22
 */
namespace  Index\Controller;

use Think\Controller;
use Index\Controller\BaseController;

class VapoController extends  BaseController
{
    //voporizer
    public  function index(){
        $this->display();
    }


    public function detail(){
        $this->display();
    }

}