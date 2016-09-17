
var radius = 10;
var dragging = false;

var canvas = document.getElementById('drawing_app');
var context = canvas.getContext('2d');

canvas.width =  window.innerWidth;
canvas.height = window.innerHeight;

window.onresize = function(){
    context.getImageData(0,0,canvas.width,canvas.height);
    canvas.width =  window.innerWidth;
    canvas.height = window.innerHeight;
    context.putImageData(image, 0,0);
};

function clearCanvas(canvas){
    canvas.width = canvas.width;
}

context.lineWidth = radius * 2;
var putPoint = function(e){
    if(dragging){
        context.lineTo(e.clientX, e.clientY);
        context.stroke();
        context.beginPath();
        context.arc(e.clientX, e.clientY, radius, 0, Math.PI*2);
        context.fill();
        context.beginPath();
        context.moveTo(e.clientX, e.clientY);
    }
};

var engage = function(e){
    dragging = true;
    putPoint(e);
};

var disengage = function(e){
    dragging = false;
    context.beginPath();
};

canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mousemove',putPoint);
canvas.addEventListener('mouseup', disengage);