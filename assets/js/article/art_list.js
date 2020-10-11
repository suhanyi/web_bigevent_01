$(function () {
  // 美化时间格式，为art-template定义时间过滤器
  template.defaults.imports.dateFormat = function (dtStr) {
    var dt = new Date(dtStr)
    var y = dt.getFullYear()
    var m = padZreo(dt.getMonth() + 1)
    var d = padZreo(dt.getDate())

    var hh = padZreo(dt.getHours())
    var mm = padZreo(dt.getMinutes())
    var ss = padZreo(dt.getSeconds())
    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ":" + ss
  }
  // 在个位数之前补零
  function padZreo(n) {
    return n > 9 ? n : '0' + n
  }






  // 1.定义查询提交参数
  var q = {
    pagenum: 1, // 页码值，默认请求第一页的数据
    pagesize: 2, // 每页显示几条数据，默认每页显示2条
    cate_id: '', // 文章分类的 Id
    state: '' // 文章的发布状态
  };

  // 2.初始化文章列表
  initTable();
  var layer = layui.layer
  function initTable() {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: q,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取文章列表失败')
        }
        var str = template('tpl-table', res);
        $('tbody').html(str)
        // 分页
        renderPage(res.total)
      }
    })
  }

  // 3. 初始化分类可选性下拉菜单的模板结构
  initCate(); //调用函数
  var form = layui.form;
  // 封装
  function initCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        var htmlStr = template('tpl-cate', res);
        $('[name=cate_id]').html(htmlStr)
        form.render()
      }
    })
  }

  //4. 筛选功能
  $('#form-search').on('submit', function (e) {
    e.preventDefault();
    // 获取
    var state = $('[name=state]').val()
    var cate_id = $('[name=cate_id]').val()
    // 赋值
    q.state = state;
    q.cate_id = cate_id;
    // 初始化文章列表
    initTable();
  })

  // 5.分页函数
  var laypage = layui.laypage;
  function renderPage(total) {
    // 执行一个laypage实例
    laypage.render({
      elem: 'pageBox', //注意，这里的pageBox 是 ID，不用加 # 号
      count: total, //数据总数，从服务端得到
      limit: q.pagesize, // 每页几条数据
      curr: q.pagenum,//第几页，当前页码

      // 分页模块设置，显示哪些子模块
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      limits: [2, 3, 5, 10], //每页显示多少条数据的选择器
      // 触发 jump 回调(分页初始化的时候，页码改变的时候)的方式有两种：
      // 1. 点击页码的时候，会触发 jump 回调
      // 2. 只要调用了 laypage.render() 方法，就会触发 jump 回调
      jump: function (obj, first) {
        // obj：所有参数所在的对象，first：是否是第一次初始化分页
        // 改变当前页
        q.pagenum = obj.curr;
        q.pagesize = obj.limit;
        // 判断,不是第一次初始化分页，才能重新调用初始化文章列表
        if (!first) {
          // 初始化文章列表
          initTable()
        }
      }
    });
  }


  // 6.删除
  var layer = layui.layer;
  $('tbody').on('click', '.btn-delete', function () {
    // 5.1先获取id，进入到函数中this代指就改变了
    var Id = $(this).attr("data-id");
    // 5.2显示对话框
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/delete/' + Id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('res.message')
          }
          layer.msg('恭喜文章删除成功！')
          // 页面汇总删除按钮个数等于1，页码大于1
          if ($('.btn-delete').length == 1 && q.pagenum > 1) q.pagenum--
          // 更新成功重新渲染页面中的数据
          initTable()

        }
      })
      layer.close(index)
    });
  })
})