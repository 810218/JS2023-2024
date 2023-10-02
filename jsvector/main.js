
// wait for the page to finish loading with init as the callback
window.addEventListener("load", init);

// global variables
let canvas, context;
let vector;

function init() {
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    animate();      // kick off the animation
    vector = new JSVector(3,4);
    console.log(vector);
}
    
// every animation cycle
function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
}


