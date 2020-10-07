$(function () {
  // 1.显示隐藏注册登录区域
  // 点击“去注册账号”的链接,隐藏登录区域，显示注册区域
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击“去登录”的链接 显示登录区域，隐藏注册区域
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 2.自定义验证规则
  // 从layui中导出form对象
  var form = layui.form;
  // 通过form.verify()函数自定义校验规则
  form.verify({
    // 密码规则
    pwd: [
      /^[\S]{6,12}$/,
      '密码必须6到12位，且不能出现空格'
    ],
    // 校验两次密码是否一致的规则
    repwd: function (value) {
      // 选择器必须带空格，选择的是后代中的input，name属性值，为password的哪一个标签
      var pwd = $('.reg-box input[name=password]').val()
      // 两次密码进行比较
      if (value !== pwd) {
        return "两次密码输入不一致"
      }
    }
  });

  // 3.注册功能
  // 导出layer对象
  var layer = layui.layer;
  $('#form_reg').on('submit', function (e) {
    // 阻止表单提交
    e.preventDefault()
    // 发送ajax
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data: {
        username: $('.reg-box [name=username]').val(),
        password: $('.reg-box [name=password]').val()
      },
      success: function (res) {
        // 返回状态判断
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        // 提交后处理成功代码
        layer.msg(res.message);
        // 模拟手动切换到登录表单
        $('#link_login').click();
      }
    })
  })

  // 5.登录功能
  $('#form_login').submit(function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        // 校验返回状态
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        // 提示信息，保存token，跳转页面
        layer.msg(res.message);
        // 保存token，未来的接口要使用token
        localStorage.setItem('token', res.token);
        // 跳转页面
        location.href = '/index.html'
      }

    })
  })
})
  // // 从 layui 中获取 form 对象
  // var form = layui.form
  // var layer = layui.layer
  // // 通过 form.verify() 函数自定义校验规则
  // form.verify({
  //   // 自定义了一个叫做 pwd 校验规则
  //   pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
  //   // 校验两次密码是否一致的规则
  //   repwd: function(value) {
  //     // 通过形参拿到的是确认密码框中的内容
  //     // 还需要拿到密码框中的内容
  //     // 然后进行一次等于的判断
  //     // 如果判断失败,则return一个提示消息即可
  //     var pwd = $('.reg-box [name=password]').val()
  //     if (pwd !== value) {
  //       return '两次密码不一致！'
  //     }
  //   }
  // })

  // // 监听注册表单的提交事件
  // $('#form_reg').on('submit', function(e) {
  //   // 1. 阻止默认的提交行为
  //   e.preventDefault()
  //   // 2. 发起Ajax的POST请求
  //   var data = {
  //     username: $('#form_reg [name=username]').val(),
  //     password: $('#form_reg [name=password]').val()
  //   }
  //   $.post('/api/reguser', data, function(res) {
  //     if (res.status !== 0) {
  //       return layer.msg(res.message)
  //     }
  //     layer.msg('注册成功，请登录！')
  //     // 模拟人的点击行为
  //     $('#link_login').click()
  //   })
  // })

  // // 监听登录表单的提交事件
  // $('#form_login').submit(function(e) {
  //   // 阻止默认提交行为
  //   e.preventDefault()
  //   $.ajax({
  //     url: '/api/login',
  //     method: 'POST',
  //     // 快速获取表单中的数据
  //     data: $(this).serialize(),
  //     success: function(res) {
  //       if (res.status !== 0) {
  //         return layer.msg('登录失败！')
  //       }
  //       layer.msg('登录成功！')
  //       // 将登录成功得到的 token 字符串，保存到 localStorage 中
  //       localStorage.setItem('token', res.token)
  //       // 跳转到后台主页
  //       location.href = '/index.html'
  //     }
  //   })
  // })

