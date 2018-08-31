<?php

namespace app\index\controller;

use app\common\controller\IndexBase;

class Index extends IndexBase
{
    public function index()
    {
        return '<h1>Hello, Welcome to OpenBMS</h1>';
    }
}
