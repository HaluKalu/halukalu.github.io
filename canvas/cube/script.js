/*
В трехмерном пространстве есть куб с шириной 1. Отобразить его рёбра на экранную плоскость.
Реализовать 3 операции с кубом:
1. Вращение относительно центра куба вокруг оси X ( по нажатию клавиши X), оси Y ( по нажатию клавиши Y), оси Z ( по нажатию клавиши Z).
2. Сдвиг центра куба вдоль оси X ( по нажатию клавиш Q), оси Y ( по нажатию клавиши W), оси Z ( по нажатию клавиши E).
3. Растяжение относительно центра куба вдоль оси X ( по нажатию клавиш A), оси Y ( по нажатию клавиши S), оси Z ( по нажатию клавиши D).
*/
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Cube {
  constructor(size) {
    this.sizeX = size;
    this.sizeY = size;
    this.sizeZ = size;
    this.angleX = 0;
    this.angleY = 0;
    this.angleZ = 0;
    this.posX = canvas.width / 2;
    this.posY = canvas.height / 2;
    this.posZ = 0;

    this.points = [
      Point3D(this.sizeX, -this.sizeY, -this.sizeZ), // (+--)0
      Point3D(this.sizeX, this.sizeY, -this.sizeZ), // (++-)1
      Point3D(this.sizeX, -this.sizeY, this.sizeZ), // (+-+)2
      Point3D(this.sizeX, this.sizeY, this.sizeZ), // (+++)3
      Point3D(-this.sizeX, this.sizeY, this.sizeZ), // (-++)4
      Point3D(-this.sizeX, -this.sizeY, this.sizeZ), // (--+)5
      Point3D(-this.sizeX, -this.sizeY, -this.sizeZ), // (---)6
      Point3D(-this.sizeX, this.sizeY, -this.sizeZ), // (-+-)7
    ]
    this.connected = [
      [2, 5], [2, 0], [2, 3],
      [1, 0], [1, 7], [1, 3],
      [6, 5], [6, 0], [6, 7],
      [4, 5], [4, 3], [4, 7]
    ]
  }
  rotateX(angle) {
    let t = [[1, 0, 0],
    [0, Math.cos(aToRad(angle)), -Math.sin(aToRad(angle))],
    [0, Math.sin(aToRad(angle)), Math.cos(aToRad(angle))]];
    this.points.map((point, i) => {
      let tmp = multiply(t, [[point.x], [point.y], [point.z]]);
      this.points[i] = Point3D(tmp[0][0], tmp[1][0], tmp[2][0])
    })
    window.requestAnimationFrame(() => {
      cube.draw()
    })
    if (this.angleX != angle)
      this.angleX = (angle + this.angleX) % 360;
    if (this.angleX < 0)
      this.angleX = 360 - this.angleX;
  }
  rotateY(angle) {
    let t = [[Math.cos(aToRad(angle)), 0, Math.sin(aToRad(angle))],
    [0, 1, 0],
    [-Math.sin(aToRad(angle)), 0, Math.cos(aToRad(angle))]];
    this.points.map((point, i) => {
      let tmp = multiply(t, [[point.x], [point.y], [point.z]]);
      this.points[i] = Point3D(tmp[0][0], tmp[1][0], tmp[2][0])
    })
    window.requestAnimationFrame(() => {
      cube.draw()
    })
    if (this.angleY != angle)
      this.angleY = (angle + this.angleY) % 360;
    if (this.angleY < 0)
      this.angleY = 360 - this.angleY;
  }
  rotateZ(angle) {
    let t = [[Math.cos(aToRad(angle)), -Math.sin(aToRad(angle)), 0],
    [Math.sin(aToRad(angle)), Math.cos(aToRad(angle)), 0],
    [0, 0, 1]];
    this.points.map((point, i) => {
      let tmp = multiply(t, [[point.x], [point.y], [point.z]]);
      this.points[i] = Point3D(tmp[0][0], tmp[1][0], tmp[2][0])
    })
    window.requestAnimationFrame(() => {
      cube.draw()
    })
    if (this.angleZ != angle)
      this.angleZ = (angle + this.angleZ) % 360;
    if (this.angleZ < 0)
      this.angleZ = 360 - this.angleZ;
  }
  scaleX(scale) {
    this.sizeX *= scale;
    this.updScale();
  }
  scaleY(scale) {
    this.sizeY *= scale;
    this.updScale();
  }
  scaleZ(scale) {
    this.sizeZ *= scale;
    this.updScale();
  }
  updScale() {
    console.log(this.angleX, this.angleY, this.angleZ);
    this.points = [
      Point3D(this.sizeX, -this.sizeY, -this.sizeZ), // (+--)0
      Point3D(this.sizeX, this.sizeY, -this.sizeZ), // (++-)1
      Point3D(this.sizeX, -this.sizeY, this.sizeZ), // (+-+)2
      Point3D(this.sizeX, this.sizeY, this.sizeZ), // (+++)3
      Point3D(-this.sizeX, this.sizeY, this.sizeZ), // (-++)4
      Point3D(-this.sizeX, -this.sizeY, this.sizeZ), // (--+)5
      Point3D(-this.sizeX, -this.sizeY, -this.sizeZ), // (---)6
      Point3D(-this.sizeX, this.sizeY, -this.sizeZ), // (-+-)7
    ]
    console.log(this.angleX)
    if (this.angleX > 0)
      this.rotateX(this.angleX);
    if (this.angleY > 0)
      this.rotateY(this.angleY);
    if (this.angleZ > 0)
      this.rotateZ(this.angleZ);
    window.requestAnimationFrame(() => cube.draw())
  }
  moveX(dist) {
    this.posX += dist
    window.requestAnimationFrame(() => cube.draw())
  }
  moveY(dist) {
    this.posY += dist
    window.requestAnimationFrame(() => cube.draw())
  }
  moveZ(dist) {
    this.scaleX(dist)
    this.scaleY(dist)
    this.scaleZ(dist)
  }
  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    console.log('[DEBUG] draw')
    this.connected.map(p => {
      ctx.beginPath();
      ctx.moveTo(this.points[p[0]].x + this.posX, this.points[p[0]].y + this.posY);
      ctx.lineWidth = 5;
      ctx.lineTo(this.points[p[1]].x + this.posX, this.points[p[1]].y + this.posY);
      ctx.stroke()
      // drawLine(this.points[p[0]].x + this.posX, this.points[p[0]].y + this.posY, this.points[p[1]].x + this.posX, this.points[p[1]].y + this.posY);
    })
  }
}
let cube = new Cube(50)

let params = {
  SCALE_X: false,
  SCALE_Y: false,
  SCALE_Z: false,
  MOVE_X: false,
  MOVE_Y: false,
  MOVE_Z: false,
  ROTATE_X: false,
  ROTATE_Y: false,
  ROTATE_Z: false
};

let POSITION_X = -1,
  POSITION_Y = -1;

let UPD = false;

const drop_other = (elem) => {
  for (let param in params) {
    if (param != elem)
      params[param] = false;
  }
  UPD = true;
}

document.addEventListener('keypress', (e) => {
  console.log('[DEBUG] Added event listeners.')
  switch (e.code) {
    case 'KeyX':
      params.ROTATE_X = !params.ROTATE_X
      drop_other('ROTATE_X')
      break;
    case 'KeyY':
      params.ROTATE_Y = !params.ROTATE_Y
      drop_other('ROTATE_Y')
      break;
    case 'KeyZ':
      params.ROTATE_Z = !params.ROTATE_Z
      drop_other('ROTATE_Z')
      break;
    case 'KeyA':
      params.SCALE_X = !params.SCALE_X
      drop_other('SCALE_X')
      break;
    case 'KeyS':
      params.SCALE_Y = !params.SCALE_Y
      drop_other('SCALE_Y')
      break;
    case 'KeyD':
      params.SCALE_Z = !params.SCALE_Z
      drop_other('SCALE_Z')
      break;
    case 'KeyQ':
      params.MOVE_X = !params.MOVE_X
      drop_other('MOVE_X')
      break;
    case 'KeyW':
      params.MOVE_Y = !params.MOVE_Y
      drop_other('MOVE_Y')
      break;
    case 'KeyE':
      params.MOVE_Z = !params.MOVE_Z
      drop_other('MOVE_Z')
      break;
    default:
      break;
  }
})
let cur_x = -1,
  cur_y = -1;
document.addEventListener('mousemove', (e) => {
  cur_x = e.clientX;
  cur_y = e.clientY;
  if (params.ROTATE_X) {
    if (UPD) {
      POSITION_X = cur_x;
      POSITION_Y = cur_y;
      UPD = false;
    }
    let change = (cur_x - POSITION_X) / 5;
    cube.rotateX(change)
    POSITION_X = cur_x;
    POSITION_Y = cur_y;
  }
  else if (params.ROTATE_Y) {
    if (UPD) {
      POSITION_X = cur_x;
      POSITION_Y = cur_y;
      UPD = false;
    }
    let change = (cur_x - POSITION_X) / 5;
    cube.rotateY(change)
    POSITION_X = cur_x;
    POSITION_Y = cur_y;
  }
  else if (params.ROTATE_Z) {
    if (UPD) {
      POSITION_X = cur_x;
      POSITION_Y = cur_y;
      UPD = false;
    }
    let change = (cur_x - POSITION_X) / 5;
    cube.rotateZ(change)
    POSITION_X = cur_x;
    POSITION_Y = cur_y;
  } else if (params.SCALE_X) {
    if (UPD) {
      POSITION_X = cur_x;
      POSITION_Y = cur_y;
      UPD = false;
    }
    let change = 1 + (cur_x - POSITION_X) / 50;
    console.log(change)
    cube.scaleX(change);
    POSITION_X = cur_x;
    POSITION_Y = cur_y;
  } else if (params.SCALE_Y) {
    if (UPD) {
      POSITION_X = cur_x;
      POSITION_Y = cur_y;
      UPD = false;
    }
    let change = 1 + (cur_x - POSITION_X) / 50;
    console.log(change)
    cube.scaleY(change);
    POSITION_X = cur_x;
    POSITION_Y = cur_y;
  } else if (params.SCALE_Z) {
    if (UPD) {
      POSITION_X = cur_x;
      POSITION_Y = cur_y;
      UPD = false;
    }
    let change = 1 + (cur_x - POSITION_X) / 50;
    console.log(change)
    cube.scaleZ(change);
    POSITION_X = cur_x;
    POSITION_Y = cur_y;
  } else if (params.MOVE_X) {
    if (UPD) {
      POSITION_X = cur_x;
      POSITION_Y = cur_y;
      UPD = false;
    }
    let change = (cur_x - POSITION_X) / 2;
    console.log(change)
    cube.moveX(change);
    POSITION_X = cur_x;
    POSITION_Y = cur_y;
  } else if (params.MOVE_Y) {
    if (UPD) {
      POSITION_X = cur_x;
      POSITION_Y = cur_y;
      UPD = false;
    }
    let change = (cur_x - POSITION_X) / 2;
    console.log(change)
    cube.moveY(change);
    POSITION_X = cur_x;
    POSITION_Y = cur_y;
  } else if (params.MOVE_Z) {
    if (UPD) {
      POSITION_X = cur_x;
      POSITION_Y = cur_y;
      UPD = false;
    }
    let change = 1 + (cur_x - POSITION_X) / 10;
    console.log(change)
    cube.moveZ(change);
    POSITION_X = cur_x;
    POSITION_Y = cur_y;
  } else {
    POSITION_X = -1;
    POSITION_Y = -1;
  }

})

window.requestAnimationFrame(() => cube.draw())
