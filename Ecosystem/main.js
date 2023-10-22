
//+++++++++++++++++++++++++++++++++++++++++++
window.addEventListener("load", init);

//test edit for github

let canvas, context;
//+++++++++++++++++++++++++++++++++++++++++++
let food = [];
let creature;

function init() {
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    loadFood(5, food);
    creature = new Creature(200, 200, food);
    animate();

}
// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    context.clearRect(0, 0, canvas.width, canvas.height);
    run(food);
    creature.run();
    requestAnimationFrame(animate); // next cycle
}

function loadFood(numFood, array) {
    for (let i = 0; i < numFood; i++) {
        let x = Math.random() * (canvas.width - 20) + 10;
        let y = Math.random() * (canvas.height - 20) + 10;
        array.push(new Food(x, y));
    }
}

function run(array) {
    for (let i = 0; i < array.length; i++) {
        array[i].run();
    }
}