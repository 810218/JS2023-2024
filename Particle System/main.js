
//+++++++++++++++++++++++++++++++++++++++++++
window.addEventListener("load", init);

let canvas, context;
//+++++++++++++++++++++++++++++++++++++++++++

let particleSystems = [];

function init() {
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    animate();
}

// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    context.clearRect(0, 0, canvas.width, canvas.height);
    runParticleSystems();
    requestAnimationFrame(animate); // next cycle
}

function runParticleSystems() {
    for (let i = 0; i < particleSystems.length; i++) {
        particleSystems[i].run();
    }
}


window.addEventListener("click", attRep);
function attRep(e) {//you need to pass in a variable into whatever function you are calling in the mouse click listener
    particleSystems.push(new ParticleSystem(e.screenX - 300, e.screenY - 50));// and then use that variable to use screenX and screenY
}





