var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');

//var eraser = document.getElementById('eraser');
//var pen = document.getElementById('pen');
//
//var red = document.getElementsByClassName('red');
//var green = document.getElementsByClassName('green');
//var blue = document.getElementsByClassName('blue');

autoSetCanvasSize(yyy);
listenToUser(yyy);

//标记
var isEraser = false;
var sign = 0;

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
        context.fillStyle = "red";
        context.strokeStyle = 'red';
    }

    //触屏设备
    if(document.body.ontouchstart !== undefined){

        yyy.ontouchstart = function(aaa){
            alert(ontouchstart);
            var x = aaa.touch[0].clientX;
            var y = aaa.touch[0].clientY;

            using = true;

            if(isEraser){
                context.clearRect(x-5,y-5,10,10);
            } else{
                lastpoint = {"x":x,"y":y};
            }
        }

        yyy.ontouchmove = function(aaa){
            alert(ontouchmove);
            var x = aaa.touch[0].clientX;
            var y = aaa.touch[0].clientY;

            if(using == false){return;}

            if(isEraser){
                context.clearRect(x-5,y-5,10,10);
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
                context.clearRect(x-5,y-5,10,10);
            } else{
                lastpoint = {"x":x,"y":y};
            }

            //drawCircle(x,y);
        }

        yyy.onmousemove = function(aaa){
            var x = aaa.clientX;
            var y = aaa.clientY;

            if(using == false){return;}

            if(isEraser){
                context.clearRect(x-5,y-5,10,10);
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
    yyy.height =  document.documentElement.clientHeight;
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

red.onclick = function(){
    context.fillStyle = 'red';
    context.strokeStyle = 'red';

    red.classList.add('active');
    green.classList.remove('active');
    blue.classList.remove('active');
}

//选择画笔颜色
green.onclick = function(){
    context.fillStyle = 'green';
    context.strokeStyle = 'green';

    green.classList.add('active');
    red.classList.remove('active');
    blue.classList.remove('active');
}

blue.onclick = function(){
    context.fillStyle = 'blue';
    context.strokeStyle = 'blue';

    blue.classList.add('active');
    red.classList.remove('active');
    green.classList.remove('active');

}

//选择画笔线条宽度
var lineWidth = undefined;

thin.onclick = function(){
    lineWidth = 5;
}

thick.onclick = function(){
    lineWidth = 10;
}

clear.onclick = function(aaa){
    var h =  document.documentElement.clientHeight;
    var w = document.documentElement.clientWidth;
    context.clearRect(0,0,w,h);
}

download.onclick = function(){
    console.log(1);
    var url = yyy.toDataURL("image/png");
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = '我的大作';
    a.target = '_blank';
    a.click();
}