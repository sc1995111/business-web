<?php
header("Content-type:text/html;charset=utf-8");
// 设置一个统一的返回格式

$responseData = array('code' => 0,'message' => '');

// 取出post提交过来的数据
$username = $_POST['username'];
// 链接数据库
$link = mysql_connect('localhost','root','123456');
    if(!$link){
        $responseData['code'] = 1;
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
        $responseData['code'] = 2;
        $responseData['message']  = '用户名已注册';
        echo json_encode($responseData);
        exit;
    }
    if(!$row){
        $responseData['code'] = 0;
        $responseData['message']  = '';
        echo json_encode($responseData);
        exit;
    }
    // 关闭数据库
    mysql_close($link);
?>