// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
// 开发环境服务器地址
var baseURL = 'http://ajax.frontend.itheima.net'
// 拦截所以ajax请求：get/post/ajax
// 处理参数
$.ajaxPrefilter(function (options) {
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = baseURL + options.url;
  alert(options.url)
})
