
// wait for the page to finish loading with init as the callback
window.addEventListener("load", init);

// global variables
let canvas, context;
let bubbles = [];
let mainMover;
let aR = "attraction";
function init() {
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    loadBubbles(80);
    mainMover = new Bubble(Math.random() * canvas.width, Math.random() * canvas.height,  30, "rgba(30,50,100,255)");
    animate();      // kick off the animation
}

// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    context.clearRect(0, 0, canvas.width, canvas.height);
    runBubbles();   // run bubbles
    mainMover.run();
    requestAnimationFrame(animate); // next cycle
}

function loadBubbles(n) {
    for (let i = 0; i < n; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let r = Math.random() * 15 + 5;
        bubbles[i] = new Bubble(x, y, r, "rgba(30,120,50,255)");
        bubbles[i].addForce(0.1, 0, true);
        console.log("Bubble made");
    }
}

// move the circle to a new location
function runBubbles() {
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].run();
    }
}

function attRep(){
    if(aR === "attraction"){
        aR = "repulsion";
    } else{
        aR = "attraction";
    }
}

window.addEventListener("click",attRep);
