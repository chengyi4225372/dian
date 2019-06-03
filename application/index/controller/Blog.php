<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/13
 * Time: 16:37
 */
namespace  Index\Controller;

use Think\Controller;
use Index\Controller\BaseController;
class BlogController extends  BaseController
{
    public function index(){
        $this->display();
    }

    public function detail(){
        $this->display();
    }
}