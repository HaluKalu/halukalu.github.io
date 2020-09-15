var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const PIXELSIZE = 1;

const INSIDE = 0;
const LEFT = 1;
const RIGHT = 2;
const BOTTOM = 4;
const TOP = 8;

var x = 0, y = 0, isDrawing = false;
var x_0 = 0, y_0 = 0

var points = [];

const color_black = { r: 0, g: 0, b: 0, a: 1 };
const color_red = { r: 255, g: 0, b: 0, a: 1 };
const color_blue = { r: 0, g: 0, b: 255, a: 1 };

const plot = function (x, y, color = color_black) {
  if (isFinite(x) && isFinite(y)) {
    setPixel(x, y, color);
  }
};

const computeCode = function (x_1, y_1) {
  let ans = INSIDE;

  if (x_1 < Math.min(x_0, x)) {
    ans += LEFT;
  } else if (x_1 > Math.max(x_0, x)) {
    ans += RIGHT;
  }
  if (y_1 < Math.min(y_0, y)) {
    ans += BOTTOM;
  } else if (y_1 > Math.max(y_0, y)) {
    ans += TOP;
  }
  return ans;
};

function setPixel(x, y, color = color_black) {
  ctx.fillStyle = "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
  ctx.fillRect(x, y, PIXELSIZE, PIXELSIZE);
}

canvas.addEventListener('mousedown', (evt) => {
  if (evt.button !== 0) return;
  let c = { r: 255, g: 0, b: 0, a: 1 };
  let point = { x: evt.offsetX, y: evt.offsetY };
  points.push(point);
  setPixel(point.x, point.y, color_red);
  if (points.length > 1) {
    drawLine(point.x, point.y, points[points.length - 2].x, points[points.length - 2].y, color_red);
  }
});

canvas.addEventListener('mousemove', (evt) => {
  if (isDrawing) {
    let c = { r: 0, g: 0, b: 0, a: 1 };
    color = c;
    // document.getElementById('output').innerHTML = `<span> X0: ${x_0} </span> <br> <span> X1: ${x} </span> <br><span> Y0: ${y_0} </span> <br><span> Y1: ${y} </span>`;
    ctx.clearRect(Math.min(x_0, x), Math.min(y_0, y), Math.abs(x_0 - x) + 10, Math.abs(y_0 - y) + 10);
    x = evt.offsetX;
    y = evt.offsetY;
    drawLine(x_0, y_0, x_0, y);
    drawLine(x_0, y_0, x, y_0);
    drawLine(x, y_0, x, y);
    drawLine(x_0, y, x, y);
    for (let i = 0; i < points.length - 1; i++)
      drawLine(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y, color_red);
  }
});

canvas.addEventListener('mouseup', (evt) => {
  if (evt.button !== 2) return;
  if (isDrawing) {
    isDrawing = false;
  }
  console.log(`Xmin = ${Math.min(x_0, x)}, Xmax = ${Math.max(x_0, x)}, Ymin = ${Math.min(y_0, y)}, Ymax = ${Math.max(y_0, y)}`);
  if (Math.abs(x_0 - x) > 10 || Math.abs(y_0 - y) > 10)
    checkFunction();
});

canvas.addEventListener('contextmenu', (evt) => {
  evt.preventDefault();
  // for(let i = 0; i < points.length; i++){
  //   console.log(points[i]);
  // }
  ctx.clearRect(Math.min(x_0, x), Math.min(y_0, y), Math.abs(x_0 - x) + PIXELSIZE, Math.abs(y_0 - y) + PIXELSIZE);
  for (let i = 0; i < points.length - 1; i++)
    drawLine(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y, color_red);
  x_0 = x = evt.offsetX;
  y_0 = y = evt.offsetY;
  isDrawing = true;
});

function drawLine(x1, y1, x2, y2, color) {
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

function checkFunction() {
  let xmin = Math.min(x_0, x);
  let ymin = Math.min(y_0, y);
  let xmax = Math.max(x_0, x);
  let ymax = Math.max(y_0, y);

  for (let i = 0; i < points.length - 1; i++) {
    let point1 = Object.assign({}, points[i]);
    let point2 = Object.assign({}, points[i + 1]);
    let point = {};

    let code1 = computeCode(point1.x, point1.y);
    let code2 = computeCode(point2.x, point2.y);

    let iter = 0;

    while (true) {
      iter++;
      if (iter === 10) break;
      if (!(code1 | code2)) {
        drawLine(Math.floor(point1.x), Math.floor(point1.y), Math.floor(point2.x), Math.floor(point2.y), color_blue);
        break;
      }
      if (code1 & code2) {
        break;
      }

      let code;
      if (code1 > code2) {
        code = code1;
        point = Object.assign({}, point1);
      } else {
        code = code2;
        point = Object.assign({}, point2);
      }

      if (code & TOP) {
        point.x += (point1.x - point2.x) * (ymax - point.y) / (point1.y - point2.y);
        point.y = ymax;
      } else if (code & BOTTOM) {
        point.x += (point1.x - point2.x) * (ymin - point.y) / (point1.y - point2.y);
        point.y = ymin;
      } else if (code & RIGHT) {
        point.y += (point1.y - point2.y) * (xmax - point.x) / (point1.x - point2.x);
        point.x = xmax;
      } else if (code & LEFT) {
        point.y += (point1.y - point2.y) * (xmin - point.x) / (point1.x - point2.x);
        point.x = xmin;
      }

      if(code === code1){
        point1 = Object.assign({}, point);
        code1 = computeCode(point1.x, point1.y);
      } else {
        point2 = Object.assign({}, point);
        code2 = computeCode(point2.x, point2.y);
      }

    }
  }
  console.log("END DRAWING;")
}