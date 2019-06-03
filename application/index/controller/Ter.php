<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/13
 * Time: 11:58
 */

namespace  Index\Controller;

use Think\Controller;
use Index\Controller\BaseController;

class TerController extends  BaseController
{
    //terpenes
    public  function index(){
        $this->display();
    }
}