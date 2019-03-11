<?php

namespace app\common\taglib;

use think\template\TagLib;

class Editor extends TagLib
{
    protected $tags = array(
        'ueditor'    => ['attr' => 'id', 'close' => 0],
        'umeditor'   => ['attr' => 'id', 'close' => 0],
        'kindeditor' => ['attr' => 'id', 'close' => 0],
    );

    public function tagUeditor($tag)
    {
        $parse = '<script src="__LIBS__/ueditor/ueditor.config.js"></script>';
        $parse .= '<script src="__LIBS__/ueditor/ueditor.all.min.js"></script>';
        $parse .= '<script src="__LIBS__/ueditor/lang/zh-cn/zh-cn.js"></script>';
        $parse .= '<script>UE.getEditor("' . $tag['id'] . '",{initialFrameHeight:400, scaleEnabled:true});</script>';
        return $parse;
    }

    public function tagUmeditor($tag)
    {
        $parse = '<link rel="stylesheet" href="__LIBS__/umeditor/themes/default/css/umeditor.css">';
        $parse .= '<script type="text/javascript" src="__LIBS__/umeditor/umeditor.config.js"></script>';
        $parse .= '<script type="text/javascript" src="__LIBS__/umeditor/umeditor.js"></script>';
        $parse .= '<script type="text/javascript" src="__LIBS__/umeditor/lang/zh-cn/zh-cn.js"></script>';
        $parse .= '<script type="text/javascript"> window.um = UM.getEditor("' . $tag['id'] . '", {initialFrameHeight:400, scaleEnabled:true, autoHeightEnabled:false});</script>';
        return $parse;
    }

    public function tagKindeditor($tag)
    {
        $parse = '<script src="__LIBS__/kindeditor/kindeditor-all-min.js"></script>';
        $parse .= '<script src="__LIBS__/kindeditor/lang/zh-CN.js"></script>';
        $parse .= '<script>KindEditor.ready(function(K) {window.editor = K.create("#' . $tag['id'] . '",{height : "400px", uploadJson : "__LIBS__/kindeditor/php/upload_json.php", fileManagerJson : "__LIBS__/kindeditor/php/file_manager_json.php", allowFileManager : true, afterBlur: function () { this.sync(); }});});</script>';
        return $parse;
    }
}
