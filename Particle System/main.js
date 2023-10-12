
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
    spliceParticleSystems();
    requestAnimationFrame(animate); // next cycle
}

function runParticleSystems() {
    for (let i = 0; i < particleSystems.length; i++) {
        particleSystems[i].run();
    }
}

function spliceParticleSystems() {
    for (let i = 0; i < particleSystems.length; i++) {
        if (particleSystems[i].lifespan < 0) {
            particleSystems[i].generate = false;
            //particleSystems.splice(i, 0);
            //i--;
        }
    }
    // for (let i = 0; i < particleSystems.length; i++) {
    //     if (particleSystems[i].particles.length === 0) {
    //         particleSystems.splice(i, 0);
    //         i--;
    //     }
    // }
}


window.addEventListener("click", attRep);
function attRep(e) {//you need to pass in a variable into whatever function you are calling in the mouse click listener
    particleSystems.push(new ParticleSystem(e.offsetX, e.offsetY));// and then use that variable to use screenX and screenY
}





