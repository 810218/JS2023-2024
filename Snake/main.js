
//+++++++++++++++++++++++++++++++++++++++++++
window.addEventListener("load", init);




window.onload = init;
let canvas, context;
let snake, planet;

function init() {
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    planet = new Planet(300, 300);
    snake = new Snake(200, 200, 10);
    animate();
}
// every animation cycle
function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    planet.run();
    snake.run();
    requestAnimationFrame(animate);
}

