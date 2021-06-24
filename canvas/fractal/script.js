// Множество жюлиа для отображения f(z)=z2+0,28+0,0113i
var maxIterations; //количество итераций
var width, height, context; //размеры канвы и контекст
var minX,maxX,minY,maxY,jsX,jsY; //коэффициенты
                          //0.01
function getMapCoeffs (x, t1, t2, s1, s2) {
 var f = (x - t1) / (t2 - t1);
 var g = f * (s2 - s1) + s1;
 return g;
}

function getColor (c) {
 var r, g, b, p = c / 32,
  l = ~~( p * 6 ), o = p * 6 - l,
  q = 1 - o;
  switch( l % 6 ) {
   case 0: r = 1; g = o; b = 0; break;
   case 1: r = q; g = 1; b = 0; break;
   case 2: r = 0; g = 1; b = o; break;
   case 3: r = 0; g = q; b = 1; break;
   case 4: r = o; g = 0; b = 1; break;
   case 5: r = 1; g = 0; b = q; break;
  }
  var c = "#" + ( "00" + ( ~~( r * 255 ) ).toString( 16 ) ).slice( -2 ) + 
                ( "00" + ( ~~( g * 255 ) ).toString( 16 ) ).slice( -2 ) + 
                ( "00" + ( ~~( b * 255 ) ).toString( 16 ) ).slice( -2 );
  return (c);
}

function drawFractal() {
 var a, as, za, b, bs, zb, count, clr;
 for (var j = 0; j < height; j++) {
  for (var i = 0; i < width; i++ ) {
   a = getMapCoeffs (i, 0, width, minX, maxX);
   b = getMapCoeffs (j, 0, height, minY, maxY);
   count = 0;
   while (++count < maxIterations) {
    za = a * a; zb = b * b;
    if (za + zb > 4) break;
    as = za - zb; bs = 2 * a * b;
    a = as + jsX; b = bs + jsY;
   }
   if (count < maxIterations) {
    context.fillStyle = getColor (count);
   }
   context.fillRect (i, j, 1, 1); //рисуем точку
  }
 }
}

function init() {
 maxIterations=750;
 canvasSize=600;
 minX=-1;
 maxX=1;
 minY=-1;
 maxY=1;

 jsX=0.28;
 jsY=0.0113;

 var canvas = document.getElementById('canvas');
 width = height = canvasSize;
 canvas.width = width; canvas.height = height;
 context = canvas.getContext("2d");
 context.fillStyle = "black"; context.fillRect (0, 0, width, height);
 document.body.appendChild( canvas );
 drawFractal();
}


init();