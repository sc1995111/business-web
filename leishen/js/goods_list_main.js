console.log('加载成功');
require.config({
    paths:{
        'jquery':'jquery-1.11.3',
        'jquery-cookie':'jquery.cookie',
        'goods_list':'goods_list'
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
require(['goods_list'],function(goods_list){
   goods_list.nav_download();
   goods_list.topnav();
   goods_list.sidenav();

   
  
})