define([
    'jquery',
    'jquery-cookie',
    'myjs'
    
], function($,myjs) {

    function register(){
    var str = testCode(6);
    draw(str);

    // 用户名
    $('.user_name').blur(function(){
        $.ajax({
            type:'POST',
            url:'../json/username.php',
            data:{
                username:$('input').eq(0).val()
            },
            success:function(result){
                var obj = JSON.parse(result);
                if(obj.code){
                    console.log(obj.code);
                    $('.user_name_p').html(obj.message) 
                    $('.user_name_p').css('color','red')
                }else{
                    var oValue = $('.user_name').val();
                    if(oValue.length > 18 || oValue.length < 6){
                        $('.user_name_p').html("！长度应为6~18个字符") 
                        $('.user_name_p').css('color','red')
                    }else if(!/[a-zA-Z]/.test(oValue[0])){
                        // 判断首字符是不是字母
                        $('.user_name_p').html("!首字符应该为字母") 
                        $('.user_name_p').css('color','red')
                    }else if(/\W/.test(oValue)){
                        $('.user_name_p').html('!邮件地址需由字母、数字或下划线组成') 
                        $('.user_name_p').css('color','red')
                    }else{
                        $('.user_name_p').html('✅恭喜，该用户名可注册') 
                        $('.user_name_p').css('color','#00bcbf')
                    }
                }
            },
            error:function(msg){
                alert(msg);
            }
        })
        
    })
    // 邮箱地址
    $('.e-mail').blur(function(){
        var oValue = $('.e-mail').val();
        if(!/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(oValue)){
            $('.e-mail_p').html('！请输入正确的邮箱地址')
            $('.e-mail_p').css('color','red')
        }else{
            $('.e-mail_p').html('✅邮箱输入正确')
            $('.e-mail_p').css('color','#00bcbf')
        }
    })
    // 密码
    $('.password').blur(function(){
        var oValue = $('.password').val();
        if(oValue.length > 16 || oValue.length < 6){
            $('.password_p').html("！长度应为6~16个字符") 
            $('.password_p').css('color','red')
        }else{
            $('.password_p').html('✅密码设置成功')
            $('.password_p').css('color','#00bcbf')
        }
    })
    // 确认密码
    $('.repassword').blur(function(){
        var oValue = $('.repassword').val();
        if(oValue != $('.password').val()){
            $('.repassword_p').html("！密码与上次密码不同，请再次确认") 
            $('.repassword_p').css('color','red')
        }else{
            $('.repassword_p').html('✅密码设置成功')
            $('.repassword_p').css('color','#00bcbf')
        }
    })
    // 手机号
    $('.tel_num').blur(function(){
        var oValue = $('.tel_num').val();
        if(!/^[1,3]\d{10}$/.test(oValue)){
            $('.tel_num_p').html('！您输入的手机号不正确')
            $('.tel_num_p').css('color','red')
        }else{
            $('.tel_num_p').html('✅成功')
            $('.tel_num_p').css('color','#00bcbf')
        }
    })
    // 验证码
    $('.code').blur(function(){
        var oValue = $('.code').val();
        
        if(oValue.toLowerCase() != str.toLowerCase()){
            $('.code_p').html('验证码有误')
            $('.code_p').css('color','red')
        }else{
            $('.code_p').html('正确')
            $('.code_p').css('color','#00bcbf')
        }
    })

    // 给用户名输入框添加keyup事件
    $('input').eq(0).keyup(function(){
        $.ajax({
            type:'POST',
            url:'../json/username.php',
            data:{
                username:$('input').eq(0).val()
            },
            success:function(result){
                var obj = JSON.parse(result);
                if(obj.code){
                    console.log(obj.code);
                    $('.user_name_p').html(obj.message) 
                    $('.user_name_p').css('color','red')
                }else{
                    $('.user_name_p').html('') 
                    $('.user_name_p').css('color','#00bcbf')
                }
            },
            error:function(msg){
                alert(msg);
            }
        })
    })

    // 提交
    $('.sub').click(function(){
       
        if(!$('.agree').is(':checked')){
            alert('请先同意相关协议');
        }else{
            $.ajax({
                type:'POST',
                url:'../json/register.php',
                data:{
                    username:$('input').eq(0).val(),
                    mail:$('input').eq(1).val(),
                    password:$('input').eq(2).val(),
                    repassword:$('input').eq(3).val(),
                    phoneNum:$('input').eq(4).val()
                    
                },
                success:function(result){
                    var obj = JSON.parse(result);
                    if(obj.code){
                        console.log(obj.code)
                    }else{
                        console.log('注册成功')
                    }
                    alert(obj.message);
                },
                error:function(msg){
                    alert(msg);
                }
            })
        }
    
})

}

return{
    register:register
}
});

