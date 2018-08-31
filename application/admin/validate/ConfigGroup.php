<?php

namespace app\admin\validate;

use think\Validate;

class ConfigGroup extends Validate
{
    protected $rule = [
        'name'  => 'require',
        'value' => 'require',
    ];

    protected $message = [
        'name.require'  => '名称不能为空',
        'value.require' => '值不能为空',
    ];
}
