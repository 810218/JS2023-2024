

// global variables
window.addEventListener("load", init); //initializes window object

let canvas, context;
let bubbles = []; //global array of bubble objects
function init() {
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    loadBubbles(10); //initializing a # of bubbles
    animate(); // kick off the animation
}

// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    context.clearRect(0, 0, canvas.width, canvas.height);
    runBubbles();   // run bubbles
    requestAnimationFrame(animate); // next cycle
}

function loadBubbles(n) { //creates and fills with values each new bubble in bubbles[]
    for (let i = 0; i < n; i++) {
        let x = Math.random() * canvas.width; //random initial x-value
        let y = Math.random() * canvas.height;//random initial y-valye
        let r = Math.random() * 30 + 20;//random radius
        let oRad = Math.random() * 45 + 35;
        let numOrbiters = Math.floor(Math.random() * 20 + 10);
        let angularVelocity = Math.random() * 0.07 + 0.01;
        bubbles[i] = new Bubble(x, y, r, "rgba(47, 63, 115)", bubbles, numOrbiters, r + 5, angularVelocity);
        bubbles[i].addForce(0, 0.5, false);//adds a constant force to each bubble
    }
}

// move the circle to a new location
function runBubbles() { //runs each bubble
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].run();
    }
}

// function bounceBubbles(array) {
//     for (let i = 0; i < array.length; i++) {
//         for (let j = 0; j < array.length; j++) {
//             if (array[i] !== array[j]) {
//                 let d = Math.sqrt(Math.pow(array[i].loc.x - array[j].loc.x, 2) + Math.pow(array[i].loc.y - array[j].loc.y, 2));
//                 if (d < array[i].diam + array[j].diam) {
//                     // this.vel.x *= -1;
//                     // this.vel.y *= -1;
//                     array[i].loc.x -= 10;
//                     array[i].vel = JSVector.addGetNew(array[i].vel, array[j].vel);
//                     array[j].vel = JSVector.addGetNew(array[j].vel, array[i].vel);
//                     return;
//                 }
//             }
//         }
//     }
// }

//test