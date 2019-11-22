console.log('加载成功');
require.config({
    paths:{
        'jquery':'jquery-1.11.3',
        'jquery-cookie':'jquery.cookie',
        'good1':'good1'
    },
    shim: {
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"],
        //声明当前模块不遵从AMD
        "parabola": {
			exports: "_"
		}
    }
})
//加载首页的代码
require(['good1'],function(good1){
   good1.nav_download();
   good1.topnav();
   good1.sidenav();
   good1.good_des_download()
  
})