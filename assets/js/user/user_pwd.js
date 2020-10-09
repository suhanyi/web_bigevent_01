$(function () {
  // 1.密码验证规则
  var form = layui.form;
  form.verify({
    // 1.1密码
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    // 1.2新旧密码不一样
    samePwd: function (value) {
      // value是新密码，旧密码需要获取
      var v1 = $('[name=oldPwd]').val();
      if (value == v1) {
        return "原密码和新密码不能相同！"
      }
    },
    // 1.3两次新密码必须相同
    rePwd: function (value) {
      // value是新密码，旧密码需要获取
      var v2 = $('[name=newPwd]').val();
      if (value !== v2) {
        return "两次新密码输入不一致！"
      }
    },
  });

  // 2.表单提交
  $('.layui-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        }
        layui.layer.msg('密码修改成功');
        $('.layui-form')[0].reset();
      }
    })
  })


})