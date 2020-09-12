var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var color = {r: 0, g: 0, b: 0, a: 1};
var points = [];
var last = 1;
var drawed = false;

function setPixel(x, y) {
    ctx.fillStyle = "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
    ctx.fillRect(x, y, 1, 1);
}

const plot = function(x, y) { //кисточка - ставит пиксель своего цвета
    if(isFinite(x) && isFinite(y)){
        setPixel(x,y);
    }
};
const changeColor = function(){
    color = {r: Math.floor(Math.random() * 255),
        g: Math.floor(Math.random() * 255),
        b: Math.floor(Math.random() * 255),
        a: 1};
}
const drawNextLine = function(){
    color = {r: 255, g: 0, b: 0, a: 1};
    if(drawed){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawed = false;
        points = [];
        last = 1;
        return;
    }
    if(points.length < 2){
        alert("Недостаточно точек для отрисовки.");
        return;
    }
    if(last === points.length){
        drawLine(points[last-1].x, points[last-1].y, points[0].x, points[0].y);
        drawed = true;
    } else {
        drawLine(points[last].x, points[last].y, points[last-1].x, points[last-1].y);
    }
    last += 1;
}
canvas.addEventListener('click', function (evt) {
    points.push({x: evt.clientX, y: evt.clientY});
    setPixel(evt.clientX, evt.clientY);
});

canvas.addEventListener('contextmenu', function(evt){
    evt.preventDefault();
    drawNextLine();
});

canvas.addEventListener('dblclick', function(evt){
    evt.preventDefault();
    drawNextLine();
});

function drawLine(x1, y1, x2, y2) {
    var deltaX = Math.abs(x2 - x1);
    var deltaY = Math.abs(y2 - y1);
    var signX = x1 < x2 ? 1 : -1;
    var signY = y1 < y2 ? 1 : -1;
    var error = deltaX - deltaY;
    plot(x2, y2);
    while (x1 != x2 || y1 != y2) {
        plot(x1, y1);
        var error2 = error * 2;
        if (error2 > -deltaY) {
            error -= deltaY;
            x1 += signX;
        }
        if (error2 < deltaX) {
            error += deltaX;
            y1 += signY;
        }
    }
}