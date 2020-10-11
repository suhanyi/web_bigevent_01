$(function () {
  // 1.文章类别列表展示
  initArtCateList();
  // 封装函数
  function initArtCateList() {
    $.ajax({
      url: '/my/article/cates',
      success: function (res) {
        var str = template('tpl-table', res)
        $('tbody').html(str)
      }
    })
  }

  // 2.显示添加文章分类列表
  var layer = layui.layer;
  $('#btnAdd').on('click', function () {
    // 利用框架代码，显示提示添加文章类别区域
    indexAdd = layer.open({
      type: 1,
      title: '添加文章分类',
      area: ['500px', '250px'],
      content: $('#dialog-add').html()
    });
  })

  // 3.提交文章分类添加(事件委托)
  var indexAdd = null;
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        // 因为我们添加成功了，所以要重新渲染页面中的数据
        initArtCateList();
        layer.msg('恭喜你文章类别添加成功！');
        layer.close(indexAdd);
      }
    })
  })

  // 4.修改-展示表单
  var indexEdit = null;
  var form = layui.form;
  $('tbody').on('click', '.btn-edit', function () {
    indexEdit = layer.open({
      type: 1,
      title: '修改文章分类',
      area: ['500px', '250px'],
      content: $('#dialog-edit').html()
    });
    // 4.2获取id，发送ajax获取数据，渲染到页面
    var Id = $(this).attr('data-id');
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + Id,
      success: function (res) {
        form.val('form-edit', res.data)
      }
    })
  })

  // 4.1提交-修改
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        // 因为我们更新成功了，所以要重新渲染页面中的数据
        initArtCateList();
        layer.msg('恭喜你文章类别更新成功！');
        layer.close(indexEdit);

      }
    })
  })

  // 5.删除
  $('tbody').on('click', '.btn-delete', function () {
    // 5.1先获取id，进入到函数中this代指就改变了
    var Id = $(this).attr("data-id");
    // 5.2显示对话框
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + Id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('删除分类失败！')
          }
          layer.msg('删除分类成功！')
          layer.close(index)
          initArtCateList()
        }
      })
    })
  })
})