const color_black = { r: 0, g: 0, b: 0, a: 1 };
const color_red = { r: 255, g: 0, b: 0, a: 1 };
const color_blue = { r: 0, g: 0, b: 255, a: 50 / 255 };
const DOTSIZE = 5, LINESIZE = 5;

const plot = (x, y, color = color_black, size=DOTSIZE) => {
  if (isFinite(x) && isFinite(y)) {
    setPixel(Math.round(x), Math.round(y), color, size);
  }
};

const setPixel = (x, y, color, size) => {
  ctx.fillStyle = "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
  ctx.fillRect(x, y, size, size);
}

const Point3D = (x, y, z) => { return { x: x, y: y, z: z }; }

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const aToRad = (a) => a * Math.PI / 180;

const multiply = (a, b) => {
  var aNumRows = a.length, aNumCols = a[0].length,
    bNumCols = b[0].length,
    m = new Array(aNumRows);  // initialize array of rows
  for (var r = 0; r < aNumRows; ++r) {
    m[r] = new Array(bNumCols); // initialize the current row
    for (var c = 0; c < bNumCols; ++c) {
      m[r][c] = 0;             // initialize the current cell
      for (var i = 0; i < aNumCols; ++i) {
        m[r][c] += a[r][i] * b[i][c];
      }
    }
  }
  return m;
}

const drawLine = (x1, y1, x2, y2) => {
  let deltaX = Math.abs(x2 - x1);
  let deltaY = Math.abs(y2 - y1);
  let signX = x1 < x2 ? 1 : -1;
  let signY = y1 < y2 ? 1 : -1;
  let error = deltaX - deltaY;
  plot(x2, y2, color_black, LINESIZE);
  while (x1 != x2 || y1 != y2) {
    plot(x1, y1, color_black, LINESIZE);
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
