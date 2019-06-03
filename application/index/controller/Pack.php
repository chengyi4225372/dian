<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/13
 * Time: 12:00
 */

namespace  Index\Controller;

use Think\Controller;
use Index\Controller\BaseController;

class PackController extends  BaseController
{
    //packaging
    public function index(){
        $this->display();
    }
}