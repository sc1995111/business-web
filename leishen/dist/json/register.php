<?php
    header("Content-type:text/html;charset=utf-8");
    // 设置一个统一的返回格式
    
    $responseData = array('code' => 0,'message' => '');
    
    // 取出post提交过来的数据
    $username = $_POST['username'];
    $mail  =$_POST['mail'];
    $password = $_POST['password'];
    $repassword = $_POST['repassword'];
    $phoneNum = $_POST['phoneNum'];

    // 进行简单的验证
    if(!$username){
        $responseData['code'] = 1;
        $responseData['message']  = '用户名不能为空';
        echo json_encode($responseData);
        exit;
    }
    if(!$mail){
        $responseData['code'] = 2;
        $responseData['message']  = '请填写邮箱';
        echo json_encode($responseData);
        exit;
    }
    if(!$password){
        $responseData['code'] = 3;
        $responseData['message']  = '密码不能为空';
        echo json_encode($responseData);
        exit;
    }
    if(!$repassword){
        $responseData['code'] = 4;
        $responseData['message']  = '两次输入的密码不一致';
        echo json_encode($responseData);
        exit;
    }
    if(!$phoneNum){
        $responseData['code'] = 5;
        $responseData['message']  = '请输入手机号码';
        echo json_encode($responseData);
        exit;
    }
    $link = mysql_connect('localhost','root','123456');
    if(!$link){
        $responseData['code'] = 6;
        $responseData['message']  = '服务器忙';
        echo json_encode($responseData);
        exit;
    }
    mysql_set_charset("utf8");
    mysql_select_db('leishen');
    $sql = "SELECT * FROM users WHERE username = '{$username}'";
    $res = mysql_query($sql);
    $row = mysql_fetch_assoc($res);
    if($row){
        $responseData['code'] = 7;
        $responseData['message']  = '用户名已注册';
        echo json_encode($responseData);
        exit;
    }
    // 密码要进行加密
    $str = md5(md5(md5($password).'qianfeng').'qingdao');
    // 注册

    $sql = "INSERT INTO users(username,mail,password,phoneNum) VALUES('{$username}','{$mail}','{$str}',{$phoneNum})";
    $res = mysql_query($sql);
    if(!$res){
        $responseData['code'] = 8;
        $responseData['message']  = '服务器忙';
        echo json_encode($responseData);
        exit;
    }else{
        $responseData["message"] = "注册成功";
        echo json_encode($responseData);
    }

    mysql_close($link);
?>
