<?php

use \app\common\service\Config;

if (!function_exists('ob_config')) {
    /**
     * 配置相关数据助手函数
     */
    function ob_config()
    {
        return Config::getInstance();
    }
}
