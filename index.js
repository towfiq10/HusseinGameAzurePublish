

//1. create the Canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

document.body.appendChild(canvas);



const winSound = new Audio('./sound/game_win.mp3');
const bgSound = new Audio('./sound/bg.mp3');
const bugPullSound = new Audio('./sound/bugPull.mp3');
const carrotPullSound = new Audio('./sound/carrotPull.mp3');
const loseSound = new Audio('./sound/alert.mp3');
let isPlaying = true;
var rain = [];



// Now get the images and place them in Canvas Image objects
// (notice the new word, constructor functions)  
// bgReady is used to let us know when it's safe to draw the image, as trying to draw it before it's loaded will throw a DOM error.

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
}

bgImage.src = 'images/background.png'

var topReady = false;
var topImage = new Image();
topImage.onload = function () {
    topReady = true;
};
topImage.src = "images/vineTop.png";

var sideReady = false;
var sideImage = new Image();
sideImage.onload = function () {
    sideReady = true;
};
sideImage.src = "images/vineSide.png";

// bug image
var bugReady = false;
var bugImage = new Image();
bugImage.onload = function () {
    bugReady = true;

};
bugImage.src = "images/bug.png";


// elf image
var elfReady = false;
var elfImage = new Image();
elfImage.onload = function () {
    elfReady = true;

};
elfImage.src = "images/elfDn.png";


//obstacle image

var carrotReady = false;
var carrotImage = new Image();
carrotImage.onload = function () {
    carrotReady = true;

};
carrotImage.src = "images/carrot.png";


// Game objects
var bug = {

    x: 0,
    y: 0
};

var elf = {

    speed: 256,
    x: 0,
    y: 0
};


//obstacle
var carrot1 = {
    x: 0,
    y: 0
}
var carrot2 = {
    x: 0,
    y: 0
}
var carrot3 = {
    x: 0,
    y: 0
}
var carrot4 = {
    x: 0,
    y: 0
}
var carrot5 = {
    x: 0,
    y: 0
}

var bugsCaught = 0;

// Handle keyboard controls
var keysDown = {}; //object were we properties when keys go down
// and then delete them when the key goes up
// so the object tells us if any key is down when that keycode
// is down.  In our game loop, we will move the hero image if when
// we go thru render, a key is down

addEventListener("keydown", function (e) {

    console.log(e.keyCode + " down")
    keysDown[e.keyCode] = true;
}, false);


addEventListener("keyup", function (e) {

    console.log(e.keyCode + " up")
    delete keysDown[e.keyCode];
}, false);







// Update game objects
var update = function (modifier) {
    //  console.log("Reset:" + bugsCaught)


    if (38 in keysDown && elf.y > 32 + 350) { //  holding up key
        elfImage.src = "images/elfUp.png";
        elf.y -= elf.speed * modifier;
    }
    if (40 in keysDown && elf.y < canvas.height - (64 + 6)) { //  holding down key
        elfImage.src = "images/elfDn.png";
        elf.y += elf.speed * modifier;
    }
    if (37 in keysDown && elf.x > (32 + 4)) { // holding left key
        elfImage.src = "images/elfLeft.png";
        elf.x -= elf.speed * modifier;
    }
    if (39 in keysDown && elf.x < canvas.width - (64 + 6)) { // holding right key
        elfImage.src = "images/elfRight.png";
        elf.x += elf.speed * modifier;
    }


    // obstacle
    if (elf.x <= (carrot1.x + 20) && carrot1.x <= (elf.x + 20) && elf.y <= (carrot1.y + 20) && carrot1.y <= (elf.y + 20) ||
        elf.x <= (carrot2.x + 20) && carrot2.x <= (elf.x + 20) && elf.y <= (carrot2.y + 20) && carrot2.y <= (elf.y + 20) ||
        elf.x <= (carrot3.x + 20) && carrot3.x <= (elf.x + 20) && elf.y <= (carrot3.y + 20) && carrot3.y <= (elf.y + 20) ||
        elf.x <= (carrot4.x + 20) && carrot4.x <= (elf.x + 20) && elf.y <= (carrot4.y + 20) && carrot4.y <= (elf.y + 20) ||
        elf.x <= (carrot5.x + 20) && carrot5.x <= (elf.x + 20) && elf.y <= (carrot5.y + 20) && carrot5.y <= (elf.y + 20)


    ) {
        stopSound(bgSound)
        playSound(loseSound);
        alert("YOU LOST !!");
        location.href = "index.html";
        return;

    }



    // Are they touching?
    if (
        elf.x <= (bug.x + 25)
        && bug.x <= (elf.x + 25)
        && elf.y <= (bug.y + 25)
        && bug.y <= (elf.y + 25)
    ) {

        playSound(bugPullSound);
        ++bugsCaught;
        if (bugsCaught > 4) {
            bugsCaught = 0;
            stopSound(bgSound);
            playSound(winSound);
            alert("YOU WIN !");
            location.href = "index.html"

        } else {
            reset();
        }


        // keep track of our “score”
        // start a new cycle


    }

};


// Draw everything in the main render function
var render = function () {
    if (bgReady) {
        // console.log('bg ready');
        ctx.drawImage(bgImage, 0, 0);
    }
    if (topReady) {
        ctx.drawImage(topImage, 0, 0);
        ctx.drawImage(topImage, 0, 800 - 32);
    }



    if (sideReady) {
        ctx.drawImage(sideImage, 0, 0);
        ctx.drawImage(sideImage, 800 - 32, 0);
    }


    if (bugReady) {
        ctx.drawImage(bugImage, bug.x, bug.y);
    }

    if (elfReady) {
        console.log("그리기" + elf.x + "," + elf.y)

        ctx.drawImage(elfImage, elf.x, elf.y);
    }

    if (carrotReady) {
        console.log("그리기" + elf.x + "," + elf.y)

        ctx.drawImage(carrotImage, carrot1.x, carrot1.y);
        ctx.drawImage(carrotImage, carrot2.x, carrot2.y);
        ctx.drawImage(carrotImage, carrot3.x, carrot3.y);
        ctx.drawImage(carrotImage, carrot4.x, carrot4.y);
        ctx.drawImage(carrotImage, carrot5.x, carrot5.y);
    }



    // Score
    ctx.fillStyle = "black";
    ctx.font = "30px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    ctx.fillText("Bug caught: " + bugsCaught, 32, 32);


}





// The main game loop
var main = function () {

    var now = Date.now();
    var delta = now - then;
    // console.log("delta :" + delta / 1000)
    update(delta / 1000);
    init();
    then = now;
    render();
    //  Request to do this again ASAP
    requestAnimationFrame(main);


};




// Reset the game when the player catches a bug
var reset = function () {


    elf.x = canvas.width / 2;
    elf.y = canvas.height / 2;


    carrot1.x = 32 + (Math.random() * (canvas.width - 96));
    carrot1.y = 420 + 32 + (Math.random() * (canvas.height - 420 - 96));

    carrot2.x = 32 + (Math.random() * (canvas.width - 96));
    carrot2.y = 420 + 32 + (Math.random() * (canvas.height - 420 - 96));

    carrot3.x = 32 + (Math.random() * (canvas.width - 96));
    carrot3.y = 420 + 32 + (Math.random() * (canvas.height - 420 - 96));

    carrot4.x = 32 + (Math.random() * (canvas.width - 96));
    carrot4.y = 420 + 32 + (Math.random() * (canvas.height - 420 - 96));

    carrot5.x = 32 + (Math.random() * (canvas.width - 96));
    carrot5.y = 420 + 32 + (Math.random() * (canvas.height - 420 - 96));

    let notgood = true;
    while (notgood) {

        bug.x = 32 + (Math.random() * (canvas.width - 96));
        bug.y = 420 + 32 + (Math.random() * (canvas.height - 420 - 96));
        if (bug.x <= (carrot1.x + 64) && carrot1.x <= (bug.x + 32) && bug.y <= (carrot1.y + 64) && carrot1.y <= (bug.y + 32) ||
            bug.x <= (carrot2.x + 64) && carrot2.x <= (bug.x + 32) && bug.y <= (carrot2.y + 64) && carrot2.y <= (bug.y + 32) ||
            bug.x <= (carrot3.x + 64) && carrot3.x <= (bug.x + 32) && bug.y <= (carrot3.y + 64) && carrot3.y <= (bug.y + 32) ||
            bug.x <= (carrot4.x + 64) && carrot4.x <= (bug.x + 32) && bug.y <= (carrot4.y + 64) && carrot4.y <= (bug.y + 32) ||
            bug.x <= (carrot5.x + 64) && carrot5.x <= (bug.x + 32) && bug.y <= (carrot5.y + 64) && carrot5.y <= (bug.y + 32)
        ) {
            notgood = true;
        } else {
            notgood = false;
        }
    }

    // console.log("elf carrot touching?" + isTouching(bug))




    then = Date.now();
    if (bugsCaught == 0) {
        playSound(bgSound);

    }
};





// this is the code that actually runs, everything else was definitional.

// Let's play this game!




function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}


//main function
// this was called line 146
function mainRain() {
    for (var k = 0; k <= 300; k++) {
        rain[k] = new rainDrop();
    }
    init();
}

//init function
function init() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.drawImage(bgImage, 0, 0);   

    for (var d = 0; d < rain.length; d++) {
        rain[d].updateRain();
        rain[d].drawRain();
    }
    //requestAnimationFrame(init); // this code was moved to line 225
}

//rain constructor 
function rainDrop() {
    this.x = Math.random() * canvas.width;
    this.y = (Math.random() * 80) - 80;
    this.height = (Math.random() * 5) + 5;
    this.speed = (Math.random() * 9) + 3;
    this.rainwidth = (Math.random() * 3.1) + .5;

    this.updateRain = function () {
        this.y += this.speed;
        if (this.y + this.height >= canvas.height) {
            this.y = (Math.random() * 80) - 80;
        }
    }

    this.drawRain = function () {
        ctx.beginPath();
        ctx.globalAlpha = 0.8;
        ctx.strokeStyle = "blue";
        ctx.lineWidth = this.rainwidth;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.stroke();
    }

}



mainRain();
var then = Date.now();
reset();
main();