<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/13
 * Time: 12:00
 */

namespace app\index\controller;

use Think\Controller;
use app\common\controller\IndexBase;

class Pack extends  IndexBase
{
    //packaging
    public function index(){
        return $this->fetch();
    }
}