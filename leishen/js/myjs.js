
// 选择排序之升序
function changeAscSort(arr){
    for(i = 0;i < arr.length - 1;i++){
        for(j = i + 1;j < arr.length;j++){
            if(arr[i] > arr[j]){
                var emp = arr[i];
                arr[i] = arr[j];
                arr[j] = emp;s
            }
        }
    }
}

// 选择排序之降序
function changeDescSort(arr){
    for(i = 0;i < arr.length - 1;i++){
        for(j = i + 1;j < arr.length;j++){
            if(arr[i] < arr[j]){
                var emp = arr[i];
                arr[i] = arr[j];
                arr[j] = emp;s
            }
        }
    }
}


// 冒泡排序之升序
function bubbleAscSort(arr){
    for(i = 0;i < arr.length - 1;i++){
        for(j = 0;j < arr.length - 1 - i;j++){
            if(arr[j] > arr[j + 1]){
                var emp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = emp;
            }
        }
    }
}


// 冒泡排序之降序
function bubbleDescSort(arr){
    for(i = 0;i < arr.length - 1;i++){
        for(j = 0;j < arr.length - 1 - i;j++){
            if(arr[j] < arr[j + 1]){
                var emp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = emp;
            }
        }
    }
}

// 随机颜色选择
function randomColor(){
    return "rgba(" + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 256)  + "," + parseInt(Math.random() * 256) + "," + 1 + ")";
}

// 获取当前有效样式浏览器兼容的写法
function getStyle(node,cssStr){
    return node.currentStyle ? node.currentStyle[cssStr] : getComputedStyle(node)[cssStr];
}


// 获取数字字母的随机组合   n  表示你要获取几位的验证码
function testCode(n){
    var arr = [];//这个数组用来存储我们的验证码
    for(i = 0;i < n;i++){
        var num = parseInt(Math.random() * 123);
        if(num >= 65 && num <=90 || num >=97 && num <= 122){
            arr.push(String.fromCharCode(num));
        }else if(num >= 0 && num <= 9){
            arr.push(num);
        }else{
            i--;
        }
    }
    return arr.join("");   
}

// 判断字符是不是字母不区分大小写
function isABC(charStr){
    if(charStr >= "a" && charStr <= "z" || charStr >= "A" && charStr <= "Z"){
        return true;
    }else{
        return false;
    }
}

// 判断用户名是否  由 数字 、字母、下划线  组成。。
function isDEF(charStr){
    if(charStr >= "a" && charStr <= "z" || charStr >= "A" && charStr <= "Z" || charStr >= 0 && charStr <= 9 || charStr == "_"){
        return true;
    }else{
        return false;
    }
}

// 判断是几位数
function countOfNum(num){
    while(num){
        arr.unshift(num % 10);
        num = parseInt(num / 10);
        i++;
    }
}

function elementsByClassName(node, classStr){
    //1、获取node这个节点下所有的子节点
    var nodes = node.getElementsByTagName("*");
    var arr = []; //存放符合条件的节点
    for(var i = 0; i < nodes.length; i++){
        if(nodes[i].className === classStr){
            arr.push(nodes[i]);
        }
    }
    return arr;
}


// 查重
function noRepeat(arr){
    for(var i = 0; i < arr.length - 1; i++){
        for(var j = i + 1; j < arr.length; j++){
            if(arr[i] === arr[j]){
                //将后面这个数删除
                arr.splice(j, 1);
                j--;
            }
        }
    }
}


// 限制拖拽出界
function limitDrag(node){
    node.onmousedown = function(ev){
        var e = ev || window.event;
        var offsetX = e.clientX - node.offsetLeft;
        var offsetY = e.clientY - node.offsetTop;

        document.onmousemove = function(ev){
            var e = ev || window.event;
            var l = e.clientX - offsetX;
            if(l <= 0){
                l = 0;
            }
            var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
            
            if(l >= windowWidth - node.offsetWidth){
                l = windowWidth - node.offsetWidth;
            }

            var t = e.clientY - offsetY;
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            if(t <= 0){
                t = 0;
            }
            if(t >= windowHeight - node.offsetHeight){
                t = windowHeight - node.offsetHeight;
            }

            node.style.left = l + 'px';
            node.style.top = t + 'px';
        }
    }

    document.onmouseup = function(){
        document.onmousemove = null;
    }
}


// 拖拽
function drag(node){
    node.onmousedown = function(ev){
        var e = ev || window.event;
        var offsetX = e.clientX - node.offsetLeft;
        var offsetY = e.clientY - node.offsetTop;

        document.onmousemove = function(ev){
            var e = ev || window.event;
            node.style.left = e.clientX - offsetX + 'px';
            node.style.top = e.clientY - offsetY + 'px';
        }
    }

    document.onmouseup = function(){
        document.onmousemove = null;
    }
}


// 获取有样式的验证码
function draw(testCode) {
    var canvas_width=document.getElementById('canvas').clientWidth;
    var canvas_height=document.getElementById('canvas').clientHeight;
    var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
    var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
    canvas.width = 22 * testCode.length;
    canvas.height = canvas_height;
    

    //有n位验证，可以绘制n位字符
    for (var i = 0; i < testCode.length; i++) {
       
        var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
        var txt = testCode[i];//得到随机的一个内容
        // show_num[i] = txt;
        var x = 10 + i * 20;//文字在canvas上的x坐标
        var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
        context.font = "bold 23px 微软雅黑";

        context.translate(x, y);
        context.rotate(deg);

        context.fillStyle = randomColor();
        context.fillText(txt, 0, 0);

        context.rotate(-deg);
        context.translate(-x, -y);
    }
    for (var i = 0; i <= 5; i++) { //验证码上显示线条
        context.strokeStyle = randomColor();
        context.beginPath();
        context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.stroke();
    }
    for (var i = 0; i <= 30; i++) { //验证码上显示小点
        context.strokeStyle = randomColor();
        context.beginPath();
        var x = Math.random() * canvas_width;
        var y = Math.random() * canvas_height;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
    }
}


// 过滤空白节点
function removeSpaceNode(parentNode){
    var nodes = parentNode.childNodes;
    for(var i = 0; i < nodes.length; i++){
        //当前遍历到的节点是文本节点，且文本是纯空白字符组成的
        if(nodes[i].nodeType == 3 && /^\s+$/.test(nodes[i].nodeValue)){
            parentNode.removeChild(nodes[i]);
        }
    }
}

//阻止事件冒泡的跨浏览器兼容
function stopBubble(ev){
    if(ev.stopPropagation){
        ev.stopPropagation();
    }else{
        ev.cancelBubble = true;
    }
}

// 阻止超链接默认行为的函数
function preDef(e){
    if(e.preventDefault){ 
        e.preventDefault();
    }else{
        window.event.returnValue = false;
    }
}