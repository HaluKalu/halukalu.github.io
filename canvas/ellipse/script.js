var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var x = 0, y = 0, isDrawing = false;
var x_0 = 0, y_0 = 0

var color = { r: 0, g: 0, b: 0, a: 1 };

const plot = function (x, y) { 
    if (isFinite(x) && isFinite(y)) {
        setPixel(x, y);
    }
};

function setPixel(x, y) {
    ctx.fillStyle = "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
    ctx.fillRect(x, y, 1, 1);
}

canvas.addEventListener('mousedown', (evt) => {
    if(evt.button !== 0) return;
    x_0 = x = evt.offsetX;
    y_0 = y = evt.offsetY;
    isDrawing = true;
});

canvas.addEventListener('mousemove', (evt) => {
    if (isDrawing) {
        ctx.clearRect(Math.min(x_0, x), Math.min(y_0, y), Math.abs(x_0 - x) + 10, Math.abs(y_0 - y) + 10);
        x = evt.offsetX;
        y = evt.offsetY;
        drawLine(x_0, y_0, x_0, y);
        drawLine(x_0, y_0, x, y_0);
        drawLine(x, y_0, x, y);
        drawLine(x_0, y, x, y);
    }
});

canvas.addEventListener('mouseup', (evt) => {
    if (isDrawing) {
        isDrawing = false;
        console.log(x_0, y_0, x, y);
        drawEllipsoid(x_0, y_0, x, y);
        // drawCircle(x_0, y_0, x, y);
    }
})


function drawLine(x1, y1, x2, y2) {
    let deltaX = Math.abs(x2 - x1);
    let deltaY = Math.abs(y2 - y1);
    let signX = x1 < x2 ? 1 : -1;
    let signY = y1 < y2 ? 1 : -1;
    let error = deltaX - deltaY;
    plot(x2, y2);
    while (x1 != x2 || y1 != y2) {
        plot(x1, y1);
        let error2 = error * 2;
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


function drawCurveForCircle(xc, yc, x, y) {
    setPixel(xc + x, yc + y);
    setPixel(xc + x, yc - y);
    setPixel(xc - x, yc + y);
    setPixel(xc - x, yc - y);
    setPixel(xc + y, yc + x);
    setPixel(xc + y, yc - x);
    setPixel(xc - y, yc + x);
    setPixel(xc - y, yc - x);
}
function drawCircle(x0, y0, x1, y1) {
    let xc = (x0 + x1) / 2;
    let yc = (y0 + y1) / 2;
    let r = Math.min(Math.abs(x0 - x1), Math.abs(y0 - y1)) / 2;
    let x = 0, y = r;
    let d = 4 - 2 * r;
    drawCurveForCircle(xc, yc, x, y);
    while (y >= x) {
        x += 1;
        if (d > 0) {
            y -= 1;
            d = d + 4 * (x - y) + 10;
        } else {
            d = d + 4 * x + 6;
        }
        drawCurveForCircle(xc, yc, x, y);
    }
}

function drawEllipsoid(x0, y0, x1, y1) {
    let x = (x0 + x1) / 2;
    let y = (y0 + y1) / 2;
    let a = Math.floor(Math.abs(x0-x1)/2);
    let b = Math.floor(Math.abs(y0-y1)/2);
    let a2 = a * a;
    let b2 = b * b;
    let row = b;
    let col = 0;
    let two_a_2 = a2 << 1;
    let two_b_2 = b2 << 1;
    let four_a_2 = a2 << 2;
    let four_b_2 = b2 << 2;
    let d = two_a_2 * ((row - 1) * (row)) + a2 + two_b_2 * (1 - a2);
    while (a2 * row > b2 * col) {
        setPixel(x + col, y + row);
        setPixel(x + col, y - row);
        setPixel(x - col, y + row);
        setPixel(x - col, y - row);
        if (d >= 0) {
            row -= 1;
            d -= four_a_2 * row;
        }
        d += two_b_2 * (3 + col * 2);
        col += 1;
    }
    d = two_b_2 * (col + 1) * col + two_a_2 * (row * (row - 2) + 1) + (1 - two_a_2) * b2;
    while (row + 1 !== 0) {
        setPixel(x + col, y + row);
        setPixel(x + col, y - row);
        setPixel(x - col, y + row);
        setPixel(x - col, y - row);
        if (d <= 0) {
            col += 1;
            d += four_b_2*col;
        }
        row -= 1;
        d += two_a_2*(3-(row<<1));
    }
}
