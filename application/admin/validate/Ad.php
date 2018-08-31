<?php

namespace app\admin\validate;

use think\Validate;

class Ad extends Validate
{
    protected $rule = [
        'cid'   => 'require',
        'image' => 'require',
        'name'  => 'require',
    ];

    protected $message = [
        'cid.require'   => '请选择所属分类',
        'image.require' => '请上传广告图片',
        'name.require'  => '名称不能为空',
    ];
}
