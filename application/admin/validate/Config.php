<?php

namespace app\admin\validate;

use think\Validate;

class Config extends Validate
{
    protected $rule = [
        'group_id' => 'require',
        'title'    => 'require',
        'name'     => 'require',
        'type'     => 'require',
    ];

    protected $message = [
        'group_id.require' => '请选择配置分类',
        'title.require'    => '配置标题不能为空',
        'name.require'     => '配置标识不能为空',
        'type.require'     => '请选择配置类型',
    ];
}
