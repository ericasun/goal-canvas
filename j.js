var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var eraser = document.getElementById('eraser');


autoSetCanvasSize(yyy);
listenToMouse(yyy);

var isEraser = false;

function autoSetCanvasSize(yyy){
    setCanvsSize(yyy);
    window.onresize = function(){
        setCanvsSize();
    }
}

function listenToUser(yyy){
    var using = false;
    var lastPoint = {"x":undefined,"y":undefined};

    if(document.body.ontouchstart !== undefined){
        yyy.ontouchstart = function(aaa){
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

        yy.ontouchend = function(){
            using = false;
            lastPoint =  {"x":undefined,"y":undefined};
        }

    } else{
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


//function drawCircle(x,y){
//    context.beginPath();
//    context.fillStyle = 'black';
//    context.arc(x,y,1,0,Math.PI * 2);
//    context.fill();
//}

function drawLine(x1,y1,x2,y2){
    context.beginPath();
    context.strokeStyle = "black";
    context.moveTo(x1,y1);
    context.lineWidth = 2;
    context.lineTo(x2,y2);
    context.stroke();
    context.closePath();
}

function setCanvsSize(yyy){
    yyy.height =  document.documentElement.clientHeight;
    yyy.width = document.documentElement.clientWidth;
}

//橡皮擦
eraser.onclick = function(){
    isEraser = true;
    actions.className = 'actions x';
}

//画笔
brush.onclick = function(){
    isEraser = false;
    actions.className = 'actions';
}

