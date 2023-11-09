
//+++++++++++++++++++++++++++++++++++++++++++
window.addEventListener("load", init);




window.onload = init;
let canvas, context;
let snake;

function init() {
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    snake = new Snake(200, 200, 10);
    animate();
}
// every animation cycle
function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.run();
    requestAnimationFrame(animate);
}

