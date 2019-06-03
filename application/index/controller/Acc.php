<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/13
 * Time: 12:02
 */

namespace app\index\controller;

use Think\Controller;
use app\common\controller\IndexBase;

class Acc extends  IndexBase
{
    //accessories
    public function index(){
       return  $this->fetch('index');
    }
}