$.ajaxPrefilter(function (options) {
    options.url = 'http://big-event-api-t.itheima.net' + options.url

    if (options.url.indexOf('/my/') !== -1) {
        //统一为有权限的接口，设置headers请求头
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    //全局统一挂载complete回调函数
    options.complete=function(res){
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页面
            location.href = '/login.html'
          }
    }
})
