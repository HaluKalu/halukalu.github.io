let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const res = 50;

let animation = true;

canvas.width  = window.innerWidth - window.innerWidth % res;
canvas.height = window.innerHeight - window.innerHeight % res;
const defColor = {r: 255, g: 0, b: 0, a: 255};

const height = canvas.height;
const width = canvas.width;

let grid = [];

function initGrid(withZeros = false) {
    let grid = [];
    for(let i = 0; i < height / res; i++) {
        let tmp = [];
        for(let j = 0; j < width / res; j++) {
            if(withZeros) {
                tmp.push(0);
                continue;
            }
            const pred = 10;
            let t = Math.floor(Math.random() * pred) % pred;
            if (t > 0) t = 1;
            else t = 0;
            tmp.push(t);
        }
        grid.push(tmp);
    }
    return grid;
}   

function drawGrid(){
    ctx.clearRect(0, 0, width, height);
    for(let i = 0; i < height / res; i++) {
        for(let j = 0; j < width / res; j++) {
            
            ctx.fillStyle = "black";
            ctx.rect( j*res, i*res, res, res );
            if(grid[i][j] == 0){
                ctx.fillRect(j*res, i*res, res, res );
            }
            ctx.stroke();
        }
    }
    if(!animation) {
        console.log(animation);
        console.log(grid);
        return;
    }
    generateNext();
    window.requestAnimationFrame(drawGrid)
}

function generateNext() {
    let newGrid = initGrid(true);
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[0].length; j++) {
            newGrid[i][j] = checkField(i, j);
        }
    }
    animation = JSON.stringify(grid) !== JSON.stringify(newGrid);
    grid = newGrid;
}

function checkField(x, y) {
    let neighbCount = 0;
    let state = grid[x][y];
    for(let i = -1; i <= 1; i++) {
        for(let j = -1; j <= 1; j++) {
            if( i == 0 && j == 0) continue;
            if( x + i >= 0 && x + i < grid.length ) {
                if(y + j >= 0 && y + j < grid[0].length) {
                    neighbCount += grid[x + i][y + j] ? 0 : 1;
                }
            }
        }
    }
    if(state === 1 && neighbCount == 3) state = 0;
    else if(state === 0 && (neighbCount < 2 || neighbCount > 3)) state = 1;

    return state;
}


function start() {
    grid = initGrid();
    drawGrid();
}

start();