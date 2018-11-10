<?php

$tpl = request()->isMobile() ? 'wap' : 'pc';

return [
    'template'         => [
        // 模板路径
        'view_path' => 'tpl/' . $tpl . '/',
    ],
    // 视图输出字符串内容替换
    'view_replace_str' => [
        '__TPL__' => '/tpl/' . $tpl,
    ],
];
