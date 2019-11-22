define([
    'jquery',
    'jquery-cookie'
], function($) {
    $('#top .last').mouseenter(function(){
        $('.car_msg').css('display','block')
     })
     $('#top .last').mouseleave(function(){
         $('.car_msg').css('display','none')
      })
      function nav_download(){
        $.ajax({
            type:'get',
            url:'../json/nav.json',
            success:function(obj){
                // 获取topnav
                // alert(obj.topnav.length);
               for(i = 0;i < obj.topnav.length;i++){
                   var sub  = `<a class="topnav-title" href="#" id="${i}"><span>${obj.topnav[i].title}</span></a>`;
                   $(sub).appendTo($('#navbox #nav'))
                   if(obj.topnav[i].child){
                       var childArr = obj.topnav[i].child;
                    var Node = `
                    <div class="nav_list" id="topnav_list${i}"></div>
                    `
                    $(Node).appendTo($(`#navbox #nav #${i}`));
                    for(j = 0; j < childArr.length;j++ ){
                        var node = `
                        <div class="_good">
                            <div><img src="${childArr[j].img}" alt=""></div>
                            <div class="title">${childArr[j].title}</div>
                            <div class="price">${childArr[j].price}</div>
                        </div>
                        `
                      $(node).appendTo($(`#topnav_list${i}`));
                    }
                   }
               }

            //    获取sidenav
            var sidenavArr = obj.sidenav;
            for(i = 0;i< sidenavArr.length;i++){
                var sideNode = `
                <li id='${i}'><a href="#">
                <span class="first">${sidenavArr[i].title}</span><span class="second">${sidenavArr[i].pic}</span>
                </a></li>
                `
                $(sideNode).appendTo($('#listbox #list ul'));
                if(sidenavArr[i].child){
                    // alert('hello');
                    var spaceNode = `<div id="_list"></div>`
                    $( spaceNode).appendTo(`#listbox #list ul #${i}`);
                    var sidenavArrChild = sidenavArr[i].child
                    for(j = 0;j < sidenavArrChild.length;j++){
                        var subNode=`
                        <a href="#"><span class="span1">${sidenavArrChild[j].title}</span><span class="span2">${sidenavArrChild[j].pic}</span></a>
                        `
                        $(subNode).appendTo(`#listbox #list ul #${i} #_list`)
                        var spaceDiv = `<div id="div${j}">
                                                </div>`
                        $(spaceDiv).appendTo(`#listbox #list ul #${i} #_list`)
                        var sidenavArrDouchild = sidenavArrChild[j].child;
                        // console.log(sidenavArrDouchild)
                        for(k =0;k < sidenavArrDouchild.length;k++){
                            var lastNode = `<a href=""><img src="${sidenavArrDouchild[k].img}" alt=""><span>${sidenavArrDouchild[k].title}</span></a>`
                            $(lastNode).appendTo(`#listbox #list ul #${i} #_list #div${j}`)
                        }
                        
                    }
                }
            }


            },
            error:function(msg){
                alert(msg);
            }
        })
    }
    $('#nav').find('.first-title').mouseenter(function(){
        $('#listbox').css('display','block')
    })
    $('#nav').find('.first-title').mouseleave(function(){
        $('#listbox').css('display','none')
    })
    function topnav(){
        $("#nav").on("mouseenter", "a", function(){
            $(this).css("color",'skyblue')
            $('#navbox').find(`#topnav_list${this.id}`).show()
            
        })
        $("#nav").on("mouseleave", "a", function(){
            $(this).css("color",'white')
            $('#navbox').find(`#topnav_list${this.id}`).hide()
        })
    }
    function sidenav(){
        $("#listbox #list ul").on("mouseenter", "li", function(){
            $(this).css({
                "backgroundColor":'#00eef3',
                "opacity":1
            }).find('span').css('color','black')
            $(this).find("#_list").show()
            
        })
        $("#listbox #list ul").on("mouseleave", "li", function(){
            $(this).css("backgroundColor",'#141414').find('span').css('color','white')
            $(this).find("#_list").hide()
        })
    }

    // 获取商品信息总览  goods.json
    // function goods_download(){
        $.ajax({
            type:'get',
            url:"../json/goods.json",
            success:function(arr){
                // 取出cookie中数据
                var cookieStr = $.cookie('goods');
                if(cookieStr){
                    var cookieArr = JSON.parse(cookieStr);
                    // alert(cookieArr);
                    // 找出购物车中的商品数据
                    var newArr = [];
                    var info_total_price = 0;
                    var car_num = 0;
                    for(i = 0;i < arr.length;i++){
                        for(j = 0;j < cookieArr.length;j++){
                            if(arr[i].id == cookieArr[j].id){
                                var total=cookieArr[j].num * (arr[i].price)
                                $(`
                        <div class="good_info" id="${arr[i].id}">
                            <img src="${arr[i].img}" alt="">
                            <span class="name">${arr[i].name}</span>
                            <span class="price">￥${arr[i].price}</span>
                            <span class="minus change-num">-</span><span class="num">${cookieArr[j].num}</span><span class="add change-num">+</span>
                            <span class="total_price">￥${total}</span>
                            <button>删除</button>
                        </div>
                        `).appendTo(".shopping_car_right")
                                car_num = car_num + cookieArr[j].num;
                                info_total_price = info_total_price + total;

                            }
                        }

                        $('.car_num').html(`(${car_num})`);
                        $('.shopping_car .info_total .info_total_price').html(info_total_price);
                    } 
                }
                // 删除商品操作
                $('.shopping_car_right').on('click','button',function(){
                    var id = $(this).closest('div').remove().attr('id');
                
                    //删除页面上的节点
                    //将cookie中的数据删除
                    var cookieArr = JSON.parse($.cookie('goods'));
                    for(i = 0;i < cookieArr.length;i++){
                        if(cookieArr[i].id == id){
                            cookieArr.splice(i,1);
                            break;
                        }
                    }
                    var now_price= 0;
                    var now_num = 0;
                    for(i = 0;i < cookieArr.length;i++){
                        now_num = now_num + cookieArr[i].num;
                        for(j = 0;j< arr.length;j++){
                            if(arr[j].id == cookieArr[i].id){
                                now_price = now_price + cookieArr[i].num * arr[j].price;
                            }
                        }
                    }
                    $('.shopping_car .info_total .info_total_price').html(now_price);
                    $('.car_num').html(`(${now_num})`);
                
                    // 存储数据到cookie的时候。判断数组是否为空
                    if(cookieArr.length){
                        $.cookie('goods',JSON.stringify(cookieArr),{
                            expires:7
                        })
                    }else{
                        $.cookie('goods',null);
                    }

                })
                // 实现商品的加减
                $('.shopping_car_right').on('click','.change-num',function(){
                    //商品的id
                    var id = $(this).closest('div').attr('id');
                    
                    //取出对应cookie中的数据
                    var cookieArr = JSON.parse($.cookie('goods'));
                    for(i = 0;i< cookieArr.length;i++){
                        if(id == cookieArr[i].id){
                            var goodObj = cookieArr[i];
                            break;
                        }
                    }
                    if(this.innerHTML == '+'){
                        goodObj.num++;
                        cookieArr[i].num = goodObj.num;
                    }else{
                        if(goodObj.num == 1){
                            alert('商品数量为1，不可再减少');
                        }else{
                            goodObj.num--;
                            cookieArr[i].num = goodObj.num;
                        }
                    }
                    
                    
                    $(this).closest('div').find(".num").html(goodObj.num)

                    
                
                    //重新显示新的数据
                    for(i=0;i < arr.length;i++){
                        if(arr[i].id == id){
                            
                            $(this).closest('div').find(".total_price").html('￥'+goodObj.num * arr[i].price)
                        }
                    }
                    var now_price= 0;
                    var now_num = 0;
                    for(i = 0;i < cookieArr.length;i++){
                        now_num = now_num + cookieArr[i].num;
                        for(j = 0;j< arr.length;j++){
                            if(arr[j].id == cookieArr[i].id){
                                now_price = now_price + cookieArr[i].num * arr[j].price;
                            }
                        }
                    }
                    $('.shopping_car .info_total .info_total_price').html(now_price);
                    $('.car_num').html(`(${now_num})`);

                    $.cookie('goods',JSON.stringify(cookieArr),{
                        expires:7
                    });
                    var cookieStr = $.cookie('goods');
                    var cookieArr = JSON.parse(cookieStr);
                    console.log(cookieArr);
                

                })
            
                // 清空购物车
            
                $('#removeBtn').click(function(){
                    $(".shopping_car_right").find(".good_info").remove()
                    $.cookie('goods',null);
                    $('.shopping_car .info_total .info_total_price').html(0);
                    $('.car_num').html('(0)');
                })
                


            },
                error:function(msg){
                    alert(msg);
                }
            })


    // }
    



    
    return{
        nav_download:nav_download,
        topnav:topnav,
        sidenav:sidenav
    }
});