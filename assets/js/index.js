$(function () {
  // 1.获取用户信息
  getUserInfo();

  // 2.退出功能
  var layer = layui.layer;
  // 点击按钮，实现退出功能
  $('#btnLogout').on('click', function () {
    // 提示用户是否确认退出
    layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
      //do something
      // 1. 清空本地存储中的 token
      localStorage.removeItem('token');
      // 2. 重新跳转到登录页面
      location.href = '/login.html';

      // 关闭 confirm 询问框
      layer.close(index);
    })
  })
});


// 获取用户基本信息
function getUserInfo() {
  $.ajax({
    // 发送ajax
    url: '/my/userinfo',
    // headers: {
    //   //重新登录，因为token过期事件12小时
    //   Authorization: localStorage.getItem('token') || ""
    // },
    success: function (res) {
      console.log(res);
      // 判断状态码
      if (res.status !== 0) {
        return layui.layer.msg(res.message)
      }
      // 请求成功，渲染用户信息
      renderAvatar(res.data);
    },

    // 无论成功或者失败，都是触发complete方法
    // complete: function (res) {
    //   console.log(res);
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
    //     // 删除本地token
    //     localStorage.removeItem('token');
    //     // 页面跳转
    //     location.href = '/login.html'
    //   }

    // }
  });
}

// 封装用户头像渲染函数　
function renderAvatar(user) {
  // 1.用户名(昵称优先，没有用usernam)
  var name = user.nickname || user.username;
  $('#welcome').html('欢迎　　' + name);
  // 2.用户头像
  if (user.user_pic !== null) {
    $('.layui-nav-img').show().attr('src', user.user_pic);
    $('.user-avatar').hide();
  } else {
    // 没有头像
    $('.layui-nav-img').hide();
    var text = name[0].toUpperCase();
    $('.user-avatar').show().html(text)

  }
}