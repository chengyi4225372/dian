<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/13
 * Time: 12:03
 */
namespace app\index\controller;

use Think\Controller;
use app\common\controller\IndexBase;

class Contact  extends  IndexBase
{
    //contact
    public function index(){
        return $this->fetch();
    }


    public function contact_form(){
          $form_type = I('post.form_type');
          $data['names'] = I('post.name');
          $data['email'] = I('post.email');
          $data['tel'] = I('post.phone');
          $data['content'] = I('post.body');
          if($form_type !='contact'){
              $this->error("数据提交不合法！");
          }else{
              $model =D("Admin/contact");
              $res = $model->add($data);
              if($res){
                 $this->success('提交成功！');
              }else{
                  $this->error('提交失败！');
              }
          }
    }

}