
//+++++++++++++++++++++++++++++++++++++++++++
window.addEventListener("load", init);
let canvas, context;
//+++++++++++++++++++++++++++++++++++++++++++

let particleSystem;

function init() {
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    particleSystem = new ParticleSystem(400, 200);
    animate();
}

// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    context.clearRect(0, 0, canvas.width, canvas.height);
    particleSystem.run();
    requestAnimationFrame(animate); // next cycle
}






