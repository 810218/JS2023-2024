
//+++++++++++++++++++++++++++++++++++++++++++
window.addEventListener("load", init);


let world;

window.onload = init;

function init() {
    world = new World();
    animate();
}
// every animation cycle
function animate() {
    world.run();
    requestAnimationFrame(animate);
}

