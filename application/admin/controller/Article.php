<?php

namespace app\admin\controller;

use app\common\controller\AdminBase;
use think\Db;

class Article extends AdminBase
{
    public function index()
    {
        $param = $this->request->param();
        $where = [];
        $query = [];
        if (isset($param['title'])) {
            $where['title'] = ['like', "%" . $param['title'] . "%"];
            $query['title'] = urlencode($param['title']);
        }
        if (isset($param['cid'])) {
            $where['cid'] = $param['cid'];
            $query['cid'] = urlencode($param['cid']);
        }
        $list = Db::view('article')
            ->view('article_category', 'category_name', 'article.cid=article_category.id', 'left')
            ->order('id desc')
            ->where($where)
            ->paginate(config('system.page_number'), false, ['query' => $query]);
        $this->assign('list', $list);
        $article_category = Db::name('article_category')->order('sort_order asc')->select();
        $this->assign('article_category', list_to_level($article_category));
        return $this->fetch();
    }

    public function add()
    {
        if ($this->request->isPost()) {
            $param    = $this->request->param();
            $validate = $this->validate($param, 'article');
            if ($validate !== true) {
                $this->error($validate);
            }
            $param['photo']    = isset($param['photo']) ? serialize($param['photo']) : '';
            $param['content']  = htmlspecialchars_decode($param['content']);
            $param['add_time'] = time();
            try {
                $result = Db::name('article')->insert($param);
            } catch (\Exception $e) {
                $this->error($e->getMessage());
            }
            if ($result) {
                insert_admin_log('添加了文章');
                $this->success('添加成功', url('admin/article/index'));
            } else {
                $this->error('添加失败');
            }
        }
        $article_category = Db::name('article_category')->order('sort_order asc')->select();
        $this->assign('article_category', list_to_level($article_category));
        $this->assign('action', url('admin/article/add'));
        return $this->fetch();
    }

    public function edit()
    {
        if ($this->request->isPost()) {
            $param    = $this->request->param();
            $validate = $this->validate($param, 'article');
            if ($validate !== true) {
                $this->error($validate);
            }
            $param['photo']     = isset($param['photo']) ? serialize($param['photo']) : '';
            $param['content']   = htmlspecialchars_decode($param['content']);
            $param['edit_time'] = time();
            try {
                $result = Db::name('article')->update($param);
            } catch (\Exception $e) {
                $this->error($e->getMessage());
            }
            if ($result) {
                insert_admin_log('修改了文章');
                $this->success('更新成功', url('admin/article/index'));
            } else {
                $this->error('更新失败');
            }
        }
        $data             = Db::name('article')->where('id', (int)input('id'))->find();
        $data['photo']    = unserialize($data['photo']);
        $article_category = Db::name('article_category')->order('sort_order asc')->select();
        $this->assign('article_category', list_to_level($article_category));
        $this->assign('data', $data);
        $this->assign('action', url('admin/article/edit'));
        return $this->fetch('add');
    }

    public function del()
    {
        $this->single_table_delete('article', '删除了文章');
    }

    public function set_status()
    {
        $this->single_table_set('article', '修改了文章状态');
    }

    public function set_sort_order()
    {
        $this->single_table_set('article', '修改了文章排序');
    }

    public function category()
    {
        $list = Db::name('article_category')->order('sort_order asc')->select();
        $this->assign('list', list_to_level($list));
        return $this->fetch();
    }

    public function add_category()
    {
        if ($this->request->isPost()) {
            $this->single_table_insert('article_category', '添加了文章分类', url('admin/article/category'));
        }
        $article_category = Db::name('article_category')->order('sort_order asc')->select();
        $this->assign('article_category', list_to_level($article_category));
        $this->assign('action', url('admin/article/add_category'));
        return $this->fetch();
    }

    public function edit_category()
    {
        if ($this->request->isPost()) {
            $this->single_table_update('article_category', '修改了文章分类', url('admin/article/category'));
        }
        $article_category = Db::name('article_category')->order('sort_order asc')->select();
        $this->assign('article_category', list_to_level($article_category));
        $this->assign('data', Db::name('article_category')->where('id', (int)input('id'))->find());
        $this->assign('action', url('admin/article/edit_category'));
        return $this->fetch('add_category');
    }

    public function del_category()
    {
        if (Db::name('article_category')->where('pid', (int)input('id'))->count()) {
            $this->error('该分类下有子类，请先删除');
        }
        if (Db::name('article')->where('cid', (int)input('id'))->count()) {
            $this->error('该分类下有文章，请先删除');
        }
        $this->single_table_delete('article_category', '删除了文章分类');
    }

    public function set_category_sort_order()
    {
        $this->single_table_set('article_category', '修改了文章分类排序');
    }
}
