var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
var pixelColors = [];
var points = [];
const defColor = {r: 255, g: 0, b: 0, a: 255};

canvas.addEventListener('click', function(evt) { 
    pixelColors.push(defColor);
    points.push({x: evt.clientX, y: evt.clientY});
    ctx.fillStyle = "rgba("+defColor.r+","+defColor.g+","+defColor.b+","+(defColor.a/255)+")";
    ctx.fillRect( evt.clientX, evt.clientY, 10, 10 );
});

canvas.addEventListener('contextmenu', (evt)=>{
    evt.preventDefault();
    pixelColors = pixelColors.map((v)=>{
        return {r: Math.floor(Math.random() * 255),
                g: Math.floor(Math.random() * 255),
                b: Math.floor(Math.random() * 255),
                a: 255}
    });
    points.map((el, i)=>{
        ctx.fillStyle = "rgba("+pixelColors[i].r+","+pixelColors[i].g+","+pixelColors[i].b+","+(pixelColors[i].a/255)+")";
        ctx.fillRect( el.x, el.y, 10, 10 );
    });
});