console.log('加载成功');
require.config({
    paths:{
        'jquery':'jquery-1.11.3',
        'jquery-cookie':'jquery.cookie',
        'shopping_car':'shopping_car'
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
require(['shopping_car'],function(shopping_car){
   shopping_car.nav_download();
   shopping_car.topnav();
   shopping_car.sidenav();
//    shopping_car.goods_download();
   
  
})