<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/13
 * Time: 12:02
 */

namespace  Index\Controller;

use Think\Controller;
use Index\Controller\BaseController;

class AccController extends  BaseController
{
    //accessories
    public function index(){
        $this->display();
    }
}