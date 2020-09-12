var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let color = {r: 0, g: 0, b: 0, a: 1}

function setPixel(x, y) {
    ctx.fillStyle = "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
    ctx.fillRect(x, y, 1, 1);
}

var plot = function(x, y) { //кисточка - ставит пиксель своего цвета
    if(isFinite(x) && isFinite(y)){
        setPixel(x,y);
    }
};
var changeColor = function(){
    color = {r: Math.floor(Math.random() * 255),
        g: Math.floor(Math.random() * 255),
        b: Math.floor(Math.random() * 255),
        a: 1};
}
var points = [];
last = -1;
canvas.addEventListener('click', function (evt) {
    points.push({x: evt.clientX, y: evt.clientY});
    last += 1;
    setPixel(evt.clientX, evt.clientY);
    if(points.length > 1){
        drawLine(points[last].x, points[last].y, points[last-1].x, points[last-1].y );
    }
    changeColor();
});
canvas.addEventListener('contextmenu', function(evt){
    evt.preventDefault();
    changeColor();
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
        //
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