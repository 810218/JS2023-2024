
window.addEventListener("load", init);

let canvas, context;
let snakes = [];

function init() {
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    loadSnakes(3);
    animate();
}

// every animation cycle
function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snakes.length; i++) {
        snakes[i].run();
    }
    requestAnimationFrame(animate);
}

function loadSnakes(n) {
    for (let i = 0; i < n; i++) {
        snakes[i] = new Snake(new JSVector(200, 200), 10);
    }
}