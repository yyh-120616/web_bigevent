$(function () {
    //点击去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击去登录
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    //从ui中获取form对象
    let form = layui.form
    let layer=layui.layer
    //通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义了叫做pwd校验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            //通过形参拿到确认密码框中的内容
            //还需要拿到密码框中的内容
            //然后进行一次等于的判断
            //判断失败return一个消息
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        //阻止默认表单的提交行为
        e.preventDefault()
        //2.发起Ajax的post请求
        $.post('/api/reguser', { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }, function(res) {
          if(res.status!==0) {
            return layer.msg(res.message);
          }
          layer.msg('注册成功，请登录');
          //模拟人的点击行为
          $('#link_login').click()
        })
    })

    $('#form_login').on('submit',function(e){
        //阻止表单默认提交
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功')


            localStorage.setItem('token',res.token)
            //跳到后台主页
            location.href='/index.html'
            }
        })
    })

})