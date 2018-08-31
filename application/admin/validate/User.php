<?php

namespace app\admin\validate;

use think\Validate;

class User extends Validate
{
    protected $rule = [
        'username' => 'require',
        'password' => 'min:6|max:16',
    ];

    protected $message = [
        'username.require' => '用户名不能为空',
        'password.min'     => '密码长度不能小于6位',
        'password.max'     => '密码长度不能大于16位',
    ];
}
