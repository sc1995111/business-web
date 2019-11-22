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

    // 获取商品的信息
    function good_des_download(){
        $.ajax({
            type:'get',
            url:'../json/good.json',
            success:function(arr){
                var picArr = arr[0].good_pic;
                for(i =0;i < picArr.length;i++){
                    var picNode = `<div id="${i}"><img src="${picArr[i]}" alt=""></div>`
                    $(picNode).appendTo($(".small-pic"));
                }
                for(i =0;i < picArr.length;i++){
                    $(`
                    <div class="pic-box" id = "${i}">
                    <img  src="${picArr[i]}" alt="">
                    <div class="mark"></div>
                    </div>`).appendTo($(".big-pic"));
                    $(`<div class="bigger-pic"><img src="${picArr[i]}" alt=""></div>`).appendTo($(".big-pic"));
                }
                var good_info = arr[1];
                $(`<div class="good-name">${good_info.good_name}</div>`).appendTo($(".basic-right"))
                $(`<p>${good_info.good_des}</p>`).appendTo($(".basic-right"))
                $(`<div class="price">官方价格：<span class="unit">${good_info.good_price}</span></div>`).appendTo($(".basic-right"))
                $(`<div class="by-mob"><a href="">去手机购买↓</a></div>`).appendTo($(".basic-right"))
                $(`<div class="good-numb"><span>商品库存</span><em>：${good_info.good_num}</em></div>`).appendTo($(".basic-right"))
                $(`<div class="integral">此商品赠送：可获500雷魂</div>`).appendTo($(".basic-right"))
                $(`<div class="gift"><div class="dt">赠品:</div><a href="">${good_info.gift}</a></div>`).appendTo($(".basic-right"))
                
                // 搭配套餐部分
                $(`<div class="combo">
                    <div class="dt">搭配套餐：</div>
                    <div class="dd">

                    </div>
                    </div>`).appendTo($(".basic-right"))

                var comboArr = good_info.combo;
                $(`<div class="show"><input type="checkbox"><span></span>${comboArr[0]}<span class="spread"><img src="${good_info.img}" alt=""></span></div>
                `).appendTo($(".basic-right .combo .dd"))
                $(`<div class="hide"></div>`).appendTo($(".basic-right .combo .dd"))
                for(i =1;i < comboArr.length;i++){
                    $(`<p class="pBox">
                    <input type="checkbox"><span>${comboArr[i]}</span>
                </p>`).appendTo($(".basic-right .combo .dd .hide"))
                }
                $(`<p class="roll pBox">收起</p>`).appendTo($(".basic-right .combo .dd .hide"))

                
                // 增值服务部分
                $(`<div class="service">
                <div class="dt">增值服务：</div>
                <div class="dd">
                </div>
                </div>`).appendTo($(".basic-right"))
                var serviceArr = good_info.service;
                $(`<div class="show"><input type="checkbox"><span></span>${serviceArr[0]}<span class="spread"><img src="${good_info.img}" alt=""></span></div>
                `).appendTo($(".basic-right .service .dd"))
                $(`<div class="hide"></div>`).appendTo($(".basic-right .service .dd"))
                for(i =1;i < serviceArr.length;i++){
                    $(`<p class="pBox">
                    <input type="checkbox"><span>${serviceArr[i]}</span>
                </p>`).appendTo($(".basic-right .service .dd .hide"))
                }
                $(`<p class="roll pBox">收起</p>`).appendTo($(".basic-right .service .dd .hide"))

                // 增值服务部分以下的部分
                $(`<div class="Num"><span>数量：</span>
                <span class="minus">-</span><span class="num">1</span><span class="add">+</span>
                </div>
                <div class="pay-style">花呗分期：</div>
                <div class="select">
                </div>
                <div class="btn">
                <button class="buy-it"><a href="shopping_car.html" target="view_window">加入购物车</a></button><button class="if-like">喜欢</button>
                </div>`).appendTo($(".basic-right"))
                // 花呗部分的具体分期操作
                var huabaiArr = good_info.huabai;
                for(i = 0;i < huabaiArr.length;i++){
                    $(`<div class="box">
                    <div>${huabaiArr[i].style}</div>
                    <div>${huabaiArr[i].des}</div>
                    </div>`).appendTo($(".basic-right .select"))
                }
                // 部分后续操作
                $(".basic-right").find(".combo .spread").click(function(){

                    $(".basic-right").find(".combo .hide").css("display","block");
                })
                $(".basic-right").find(".combo .roll").click(function(){

                    $(".basic-right").find(".combo .hide").css("display","none");
                })
                $(".basic-right").find(".service .spread").click(function(){

                    $(".basic-right").find(".service .hide").css("display","block");
                })
                $(".basic-right").find(".service .roll").click(function(){

                    $(".basic-right").find(".service .hide").css("display","none");
                })

                var i = $(".basic-right").find(".Num .num").text();
                var price 
                $(".basic-right").find(".Num .add").click(function(){
                    i++;
                    $(".basic-right").find(".Num .num").text(i);
                    price = i * good_info.good_price;
                    $(".basic-right").find(".price .unit").text(price);
                })
                $(".basic-right").find(".Num .minus").click(function(){
                    if(i == 1){
                        alert("您至少得购买1件商品！")

                    }else{
                        i--;
                    $(".basic-right").find(".Num .num").text(i);
                    }
                    price = i * good_info.good_price;
                    $(".basic-right").find(".price .unit").text(price);

                })
                $(".small-pic").on('click','div',function(){
                    $(".big-pic").find('.pic-box').hide().eq(this.id).show()
                    $(".small-pic").find('div').css('borderColor','gray')
                    $(this).css('borderColor','skyblue')
                })
                $(".big-pic").on('mouseenter','.pic-box',function(){
                    $(".big-pic").find('.bigger-pic').hide().eq(this.id).show()
                    $(".big-pic").find('.mark').hide().eq(this.id).show()
                })
                $(".big-pic").on('mouseleave','.pic-box',function(){
                    $(".big-pic").find('.bigger-pic,.mark').hide()
                })
                $(".big-pic").on('mousemove','.pic-box',function(ev){
                    var l = ev.pageX - $(this).offset().left - 50;
                    if(l <= 0){
                        l = 0;
                    }
                    if(l >= 380){
                        l = 380;
                    }

                    var t = ev.pageY - $(this).offset().top - 50;
                    if(t <= 0){
                        t = 0;
                    }
                    if(t >= 350){
                        t = 350;
                    }
                    $(".big-pic").find(".mark").css({
                        left: l,
                        top: t
                    })

                    //让big下面的图片，反方向，对应倍数移动
                    $(".big-pic").find(".bigger-pic img").css({
                        left: -4 * l,
                        top: -4 * t
                    })
                })

                
                // 添加购物车操作
                var good_id = arr[2].id;
                $('.basic-right .btn').on('click','.buy-it',function(){
                    var id = good_id;
                
                    // 这儿的id  是所购买商品信息的id  在ajax下载是获取
                    /* 
                        本地存储cookie（存储的必须是字符串） 4kb

                        商品的id  和  商品的数量
                        本地存储商品的结果 [{id:id,num:1},{id:id,num:2}]

                        cookie存储：键：goods  值  ：数据结构转成json格式字符串。
                     */
                    // 判断购物车中是否已经添加商品  也就是cookie中是否有数据

                    var first = $.cookie('goods') == null ? true :false;
                    var num = $(".basic-right").find(".Num .num").html();
                    if(first){
                        // 之前的购物车中没有数据
                    
                        var arr = [{id:id,num:$(".basic-right").find(".Num .num").html()}];
                        $.cookie('goods',JSON.stringify(arr),{
                            expires:7
                        })
                    }else{
                        // 判断之前是否添加过
                        var cookieStr = $.cookie('goods');
                        var cookieArr = JSON.parse(cookieStr);
                        var same= false;//假设没有添加过
                        //遍历之前添加过的商品
                        for(i = 0;i < cookieArr.length;i++){
                            if(cookieArr[i].id == id){
                                cookieArr[i].num=Number(cookieArr[i].num) + Number(num);
                                // alert(cookieArr[i].num);
                                same = true;
                                break;
                            }
                        }

                        // 遍历之后没有添加过此类商品
                        if(!same){
                            var obj = {id:id,num:$(".basic-right").find(".Num .num").text()};
                            cookieArr.push(obj);
                        }
                        $.cookie('goods',JSON.stringify(cookieArr),{
                            expires:7
                        })
                        var cookieStr = $.cookie('goods');
                        var cookieArr = JSON.parse(cookieStr);
                        console.log(cookieArr)

                    }       
                })

                

            },
            error:function(msg){
                alert(msg);
            }
        })
    }
    


    



    return{
        nav_download:nav_download,
        topnav:topnav,
        sidenav:sidenav,
        good_des_download:good_des_download
    }
});