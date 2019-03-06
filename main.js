var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');

autoSetCanvasSize(yyy);
listenToUser(yyy);
setColors();


//标记
var isEraser = false;
var sign = 0;

//默认画笔颜色
var paintColor = 'black';

//选择画笔线条宽度
var lineWidth = undefined;

//位置
var loc = 5

toolBar.onclick = function(){
    console.log("toolBar");
}

tabs.onclick = function(){
    console.log("tabs");
}

homepage.onclick = function(detail){

    //设置画笔颜色
    if(detail.target.style.background){
        paintColor = detail.target.style.background;
        context.fillStyle = paintColor;
        context.strokeStyle = paintColor;

        if(colorOne.className.indexOf("active") > -1){colorOneDiv.style.background = paintColor;}
        if(colorTwo.className.indexOf("active") > -1){colorTwoDiv.style.background = paintColor;}
    }

    if(detail.target.className.indexOf("colorOne") > -1){
        colorOne.classList.add('active');
        colorTwo.classList.remove('active');
    }
    if(detail.target.className.indexOf("colorTwo") > -1){
        colorTwo.classList.add('active');
        colorOne.classList.remove('active');
    }
}

search.onclick = function(){
    console.log("search");
}

function setColors(){
    var keys = {
        '0':{0:'',1:'',2:'',3:'',4:'',5:'',6:'',7:'',8:'',9:'',length:10},
        '1':{0:'',1:'',2:'',3:'',4:'',5:'',6:'',7:'',8:'',9:'',length:10},
        '2':{0:'',1:'',2:'',3:'',4:'',5:'',6:'',7:'',8:'',9:'',length:10},
        length:3
    };

    var hash = {
        '0':{0:'black',1:'grey',2:'brown',3:'red',4:'rgb(255,127,39)',5:'rgb(255,242,0)',6:'rgb(34,177,76)',
            7:'rgb(0,162,232)',8:'rgb(63,72,204)',9:'rgb(163,73,164)',length:10},
        '1':{0:'white',1:'rgb(195,195,195)',2:'rgb(185,122,87)',3:'rgb(255,174,201)',4:'rgb(255,201,14)',
            5:'rgb(239,228,176)',6:'rgb(181,230,29)', 7:'rgb(153,217,234)', 8:'rgb(112,146,190)',
            9:'rgb(200,191,231)',length:10},
        '2':{0:'',1:'',2:'',3:'',4:'',5:'',6:'',7:'',8:'',9:'',length:10},
        length:3
    };

    for(var index1=0; index1<keys.length; index1++){
        var low = keys[index1].length;
        var div = document.createElement('div');

        for(var index2=0;index2< low;index2++){
            var span = document.createElement('span');
            span.style.background = hash[index1][index2];

            var index = index1.toString() + index2.toString();
            div.appendChild(span);
        }
        colors.appendChild(div);
    }
}

function autoSetCanvasSize(yyy){
    setCanvsSize(yyy);
    window.onresize = function(){
        setCanvsSize(yyy);
    }
}

function listenToUser(yyy){

    var using = false;
    var lastPoint = {"x":undefined,"y":undefined};

    //默认画笔颜色为红色
    if(!sign){
        context.fillStyle = paintColor;
        context.strokeStyle = paintColor;
    }

    //触屏设备
    if(document.body.ontouchstart !== undefined){

        yyy.ontouchstart = function(aaa){

            var x = aaa.touches[0].clientX;
            var y = aaa.touches[0].clientY;

            using = true;

            if(isEraser){
                context.clearRect(x-loc,y-loc,10,10);
            } else{
                lastpoint = {"x":x,"y":y};
            }
        }

        yyy.ontouchmove = function(aaa){

            var x = aaa.touches[0].clientX;
            var y = aaa.touches[0].clientY;

            if(using == false){return;}

            if(isEraser){
                context.clearRect(x-loc, y-loc, 10, 10);
            } else{
                var newPoint = {"x":x,"y":y}

                //drawCircle(x,y);
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
                lastPoint = newPoint;
            }
        }

        yyy.ontouchend = function(){
            using = false;
            lastPoint =  {"x":undefined,"y":undefined};
        }

    } else{
        //非触屏设备
        yyy.onmousedown = function(aaa){
            var x = aaa.clientX;
            var y = aaa.clientY;

            using = true;

            if(isEraser){
                context.clearRect(x-loc,y-loc, 10, 10);
            } else{
                lastpoint = {"x":x,"y":y};
            }

            //drawCircle(x,y);
        }

        yyy.onmousemove = function(aaa){
            var x = aaa.clientX - 10;
            var y = aaa.clientY - 10;

            if(using == false){return;}

            if(isEraser){
                context.clearRect(x-loc,y-loc,10,10);
            } else{
                var newPoint = {"x":x,"y":y}

                //drawCircle(x,y);
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
                lastPoint = newPoint;
            }
        }

        yyy.onmouseup = function(){
            using = false;
            lastPoint =  {"x":undefined,"y":undefined};
        }
    }


}

function drawLine(x1,y1,x2,y2){
    context.beginPath();
    context.moveTo(x1,y1);
    context.lineWidth = lineWidth;
    context.lineTo(x2,y2);
    context.stroke();
    context.closePath();
}

function setCanvsSize(yyy){
    yyy.height =  document.documentElement.clientHeight - 100;
    yyy.width = document.documentElement.clientWidth;
}

//画笔
pen.onclick = function(){
    isEraser = false;
    pen.classList.add('active');
    eraser.classList.remove('active');
}


//橡皮擦
eraser.onclick = function(){
    isEraser = true;
    eraser.classList.add('active');
    pen.classList.remove('active');
}

//red.onclick = function(){
//    context.fillStyle = 'red';
//    context.strokeStyle = 'red';
//
//    red.classList.add('active');
//    green.classList.remove('active');
//    blue.classList.remove('active');
//}
//
////选择画笔颜色
//green.onclick = function(){
//    context.fillStyle = 'green';
//    context.strokeStyle = 'green';
//
//    green.classList.add('active');
//    red.classList.remove('active');
//    blue.classList.remove('active');
//}
//
//blue.onclick = function(){
//    context.fillStyle = 'blue';
//    context.strokeStyle = 'blue';
//
//    blue.classList.add('active');
//    red.classList.remove('active');
//    green.classList.remove('active');
//
//}



//thin.onclick = function(){
//    lineWidth = 5;
//}
//
//thick.onclick = function(){
//    lineWidth = 10;
//}

clear.onclick = function(aaa){
    var h =  document.documentElement.clientHeight;
    var w = document.documentElement.clientWidth;
    context.clearRect(0,0,w,h);
}

save.onclick = function(){
    console.log(1);
    var url = yyy.toDataURL("image/png");
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = '我的大作';
    a.target = '_blank';
    a.click();
}

