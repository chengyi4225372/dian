<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/13
 * Time: 16:33
 */
namespace  Index\Controller;

use Think\Controller;
use Index\Controller\BaseController;
class PagesController extends  BaseController
{
     //about-us
    public  function index(){
        $this->display();
    }

    public function terms(){
        $this->display();
    }

    public function privacy(){
        $this->display();
    }
}