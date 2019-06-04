<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/6/4
 * Time: 17:39
 */

namespace app\admin\validate;

use think\Validate;

class Blog extends Validate
{
    protected $rule = [
        'title' => 'require',
    ];

    protected $message = [
        'title.require' => '标题不能为空',
    ];
}
