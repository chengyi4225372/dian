<?php

namespace app\admin\controller;

use app\common\controller\AdminBase;
use think\Db;

class Ad extends AdminBase
{
    public function index()
    {
        $param = $this->request->param();
        $query = [];
        $where = [];
        if (isset($param['name'])) {
            $where['name'] = ['like', "%" . $param['name'] . "%"];
            $query['name'] = urlencode($param['name']);
        }
        if (isset($param['cid'])) {
            $where['cid'] = $param['cid'];
            $query['cid'] = urlencode($param['cid']);
        }
        $list = Db::view('ad')
            ->view('ad_category', 'category_name', 'ad.cid=ad_category.id', 'left')
            ->order('sort_order asc')
            ->where($where)
            ->paginate(config('system.page_number'), false, ['query' => $query]);
        $this->assign('list', $list);
        $this->assign('ad_category', Db::name('ad_category')->select());
        return $this->fetch();
    }

    public function add()
    {
        if ($this->request->isPost()) {
            $this->single_table_insert('ad', '添加了广告图', url('admin/ad/index'));
        }
        $this->assign('ad_category', Db::name('ad_category')->select());
        $this->assign('action', url('admin/ad/add'));
        return $this->fetch();
    }

    public function edit()
    {
        if ($this->request->isPost()) {
            $this->single_table_update('ad', '修改了广告图', url('admin/ad/index'));
        }
        $this->assign('data', Db::name('ad')->where('id', (int)input('id'))->find());
        $this->assign('ad_category', Db::name('ad_category')->select());
        $this->assign('action', url('admin/ad/edit'));
        return $this->fetch('add');
    }

    public function del()
    {
        $this->single_table_delete('ad', '删除了广告图');
    }

    public function set_status()
    {
        $this->single_table_set('ad', '修改了广告图状态');
    }

    public function set_sort_order()
    {
        $this->single_table_set('ad', '修改了广告图排序');
    }

    public function category()
    {
        $this->assign('list', Db::name('ad_category')->paginate(config('system.page_number')));
        return $this->fetch();
    }

    public function add_category()
    {
        if ($this->request->isPost()) {
            $this->single_table_insert('ad_category', '添加了广告图分类', url('admin/ad/category'));
        }
        $this->assign('action', url('admin/ad/add_category'));
        return $this->fetch();
    }

    public function edit_category()
    {
        if ($this->request->isPost()) {
            $this->single_table_update('ad_category', '修改了广告图分类', url('admin/ad/category'));
        }
        $this->assign('data', Db::name('ad_category')->where('id', (int)input('id'))->find());
        $this->assign('action', url('admin/ad/edit_category'));
        return $this->fetch('add_category');
    }

    public function del_category()
    {
        if (Db::name('ad')->where('cid', (int)input('id'))->count()) {
            $this->error('该分类下有广告，请先删除');
        }
        $this->single_table_delete('ad_category', '删除了广告图分类');
    }
}
