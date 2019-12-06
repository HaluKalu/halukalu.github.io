var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;		
    console.log(window.innerHeight);
});

function createMountainRange(mountainAmount, height,  color) {
    for (var i = 0; i < mountainAmount; i++) {
        var mountainWidth = canvas.width / mountainAmount;

        // Draw triangle
        c.beginPath();
        c.moveTo(i * mountainWidth, canvas.height);
        c.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height);

        // Triangle peak
        c.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height);
        c.lineTo(i * mountainWidth - 325, canvas.height);
        c.fillStyle = color;
        c.fill();
        c.closePath();
    }
}

function MiniStar() {
    this.x = Math.random() * canvas.width;
    this.y = Math.floor(Math.random() * (canvas.height - canvas.height * 0.17));
    this.velocity = Math.floor(Math.random() * (5 - 1)) + 1;
    this.radius = Math.random() * 4;

    this.draw = function() {
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

        c.shadowColor = 'rgb(220,221,219)';
        c.shadowBlur = (Math.random() * 30) + 10;
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;

        c.fillStyle = "white";
        c.fill();

        c.closePath();	
        c.restore();
    }
    this.update = function(){
        this.x += this.velocity;
    }
    this.reCreate = function() {
        this.x = 0;
        this.y = Math.floor(Math.random() * (canvas.height - canvas.height * 0.17));
        this.velocity = Math.floor(Math.random() * (5 - 1)) + 1;
        this.radius = Math.random() * 4;
    }
}


/*
* ------------------------------------------
* *-----------------------------
*  Implementation
* *-----------------------------
* ------------------------------------------
*/

var timer = 0;
var stars = [];
var explosions = [];
var groundHeight = canvas.height * 0.15;
var randomSpawnRate = Math.floor((Math.random() * 25) + 60)
var backgroundGradient = c.createLinearGradient(0,0,0, canvas.height);
backgroundGradient.addColorStop(0,"rgb(60, 60, 95)");
backgroundGradient.addColorStop(1,"rgb(36, 36, 56)");

var miniStars = [];
for (var i = 0; i < 150; i++) {
    miniStars.push(new MiniStar());
    miniStars[i].draw();
}




function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = backgroundGradient;
    c.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < miniStars.length; i++) {
        miniStars[i].update();
        miniStars[i].draw();
        if(miniStars[i].x > canvas.width){
            miniStars[i].reCreate();
        }
    }
    createMountainRange(1, canvas.height - 50, "#334046");
    createMountainRange(2, canvas.height - 100,  "#2B3843");
    createMountainRange(3, canvas.height - 300 , "#26333E");

    c.fillStyle = "#182028";
    c.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);

        
    
    // for (var i = 0; i < stars.length; i++) {
    //     stars[i].update();
    //     // console.log(stars[0].isAlive());

    //     if (stars[i].radius <= 0) {
    //         stars.splice(i, 1);
    //     }
    // }

    // for (var i = 0; i < explosions.length; i++) {
    //     if (explosions[i].length <= 0) {
    //         explosions.splice(i, 1);
    //     }
    // }

    timer ++;
    // console.log(timer);
    if (timer % randomSpawnRate == 0) {
        // stars.push(new Star());  
        randomSpawnRate = Math.floor((Math.random() * 10) + 75)
    }

}

animate();
