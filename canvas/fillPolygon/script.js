var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const PIXELSIZE = 2;

const color_black = { r: 0, g: 0, b: 0, a: 1 };
const color_red = { r: 255, g: 0, b: 0, a: 1 };
const color_blue = { r: 0, g: 0, b: 255, a: 50 / 255 };

var points = [];
var pointsReady = [];
var pointsEmpty = [];
var count = 0;

const plot = function (x, y, color = color_black) {
  if (isFinite(x) && isFinite(y)) {
    setPixel(x, y, color);
  }
};

function setPixel(x, y, color = color_black) {
  ctx.fillStyle = "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
  ctx.fillRect(x, y, PIXELSIZE, PIXELSIZE);
}

canvas.addEventListener('mousedown', (evt) => {
  if (evt.button !== 0) return;
  if (filled) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    filled = false;
    points = [];
    // pointsReady = [];
    return;
  }
  let point = { x: evt.offsetX, y: evt.offsetY };
  points.push(point);
  setPixel(point.x, point.y, color_black);
  if (points.length > 1) {
    drawLine(point.x, point.y, points[points.length - 2].x, points[points.length - 2].y, color_black);
  }
});

var filled = false;
canvas.addEventListener('contextmenu', (evt) => {
  evt.preventDefault();
  if (filled) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    filled = false;
    points = [];
    return;
  }
  if (points.length < 3) {
    alert("Недостаточно точек.");
    return;
  }
  filled = true;
  drawLine(points[0].x, points[0].y, points[points.length - 1].x, points[points.length - 1].y, color_black);
  fill();
});

function fill(color = color_blue) {
  for (let i = 0; i < points.length; i++) {
    let x1, x2, y1, y2, x3, y3;
    if (i + 1 == points.length) {
      x1 = points[i - 1].x;
      y1 = points[i - 1].y;
      x2 = points[i].x;
      y2 = points[i].y;
      x3 = points[0].x;
      y3 = points[0].y;
    } else if (i == 0) {
      x1 = points[points.length - 1].x;
      y1 = points[points.length - 1].y;
      x2 = points[0].x;
      y2 = points[0].y;
      x3 = points[1].x;
      y3 = points[1].y;
    } else {
      x1 = points[i - 1].x;
      y1 = points[i - 1].y;
      x2 = points[i].x;
      y2 = points[i].y;
      x3 = points[i + 1].x;
      y3 = points[i + 1].y;
    }
    let deltaX1 = Math.abs(x2 - x1);
    let deltaY1 = Math.abs(y2 - y1);
    let deltaX2 = Math.abs(x2 - x3);
    let deltaY2 = Math.abs(y2 - y3);
    let signX1 = x1 > x2 ? 1 : -1;
    let signY1 = y1 > y2 ? 1 : -1;
    let signX2 = x2 < x3 ? 1 : -1;
    let signY2 = y2 < y3 ? 1 : -1;
    let error1 = deltaX1 - deltaY1;
    let error2 = deltaX2 - deltaY2;

    let tempX1 = x2, tempX2 = x2, tempY1 = y2, tempY2 = y2;
    let count = 0;
    while ((x1 != tempX1 || tempY1 != y1) && (x3 != tempX2 || y3 != tempY2) && (count < 400)) {
      count++;
      drawLine(tempX1, tempY1, tempX2, tempY2, color);
      let error1_2 = error1 * 2;
      let error2_2 = error2 * 2;

      if (error1_2 > -deltaY1) {
        error1 -= deltaY1;
        tempX1 += signX1;
      }
      if (error1_2 < deltaX1) {
        error1 += deltaX1;
        tempY1 += signY1;
      }
      if (error2_2 > -deltaY2) {
        error2 -= deltaY2;
        tempX2 += signX2;
      }
      if (error2_2 < deltaX2) {
        error2 += deltaX2;
        tempY2 += signY2;
      }
    }
    if (x1 == tempX1) {
      pointsEmpty.push({ x: tempX2, y: tempY2 });
    } else {
      pointsEmpty.push({ x: tempX1, y: tempY1 });
    }
  }
  for(let i = 0; i < pointsEmpty.length; i++){
    
  }
}

// function fill(color = color_blue) {
//   pointsReady.sort((p1, p2)=>{ return parseInt(p1.y) > parseInt(p2.y) ?  1 : -1});
//   for(let i = 0; i < pointsReady.length - 1; i++){
//      drawLine(pointsReady[i].x, pointsReady[i].y, pointsReady[i+1].x, pointsReady[i+1].y, color_blue, false);
//   }
//   // console.log(pointsReady);
// }

function drawLine(x1, y1, x2, y2, color = color_black, c = true) {
  let deltaX = Math.abs(x2 - x1);
  let deltaY = Math.abs(y2 - y1);
  let signX = x1 < x2 ? 1 : -1;
  let signY = y1 < y2 ? 1 : -1;
  let error = deltaX - deltaY;
  plot(x2, y2, color);
  while (x1 != x2 || y1 != y2) {
    plot(x1, y1, color);

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
