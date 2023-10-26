function World() {
    //Main canvas showing part of world 
    this.canvasMain = document.getElementById('cnv1');
    this.contextMain = this.canvasMain.getContext('2d');
    //Mini canvas showing the whole world 
    this.canvasMini = document.getElementById('cnv2');
    this.contextMini = this.canvasMini.getContext('2d');
    //move Canvas relative to the world 
    this.canvasMainLoc = new JSVector(0, 0);
    //object holding limits of the whole world 
    this.dims = {
        top: -1500,
        left: -2000,
        bottom: 1500,
        right: 2000,
        width: 4000,
        height: 3000
    }
    //create bubbles 
    // this.bubbles = [];
    // this.loadBubbles(100, this.contextMain, this.contextMini, this.dims.width, this.dims.height);
    //make world fit in Mini canvas 
    this.scaleX = 0.5;
    this.scaleY = 0.5;
    //make Main canvas move in world with wasd keys 
    window.addEventListener("keypress", function (event) {
        switch (event.code) {
            case "KeyW":
                if (world.canvasMainLoc.y + 100 > world.dims.top)
                    world.canvasMainLoc.y -= 20;
                break;
            case "KeyS":
                if (world.canvasMainLoc.y + world.canvasMain.height - 100 < world.dims.bottom)
                    world.canvasMainLoc.y += 20;
                break;
            case "KeyA":
                if (world.canvasMainLoc.x + 100 > world.dims.left)
                    world.canvasMainLoc.y -= 20;
                break;
            case "KeyD":
                if (world.canvasMainLoc.x + world.canvasMain.width - 100 < world.dims.right)
                    world.canvasMainLoc.y += 20;
                break;
        }
    }, false);
    this.numFood = 20;
    this.food = [];
    this.loadFood(this.numFood, this.food);
    this.creature = new Creature(200, 200, this.food);
}


World.prototype.run = function () {
    //clear the canvas
    this.contextMain.clearRect(0, 0, this.canvasMain.width, this.canvasMain.height);



    this.contextMain.save();
    this.contextMain.translate(this.canvasMainLoc.x, this.canvasMainLoc.y);
    this.contextMini.clearRect(0, 0, this.canvasMini.width, this.canvasMini.height);
    this.contextMini.save();
    this.contextMain.scale(this.scaleX, this.scaleY);
    this.contextMain.translate(this.contextMain.width, this.contextMain.height);
    this.contextMini.restore();
    this.contextMain.restore();
    //+++    Draw the main and mini Canvas with bounds and axes
    this.contextMain.save();
    this.contextMain.translate(this.canvasMainLoc.x, this.canvasMainLoc.y);

    this.runArray(this.food);
    this.creature.run();
    this.loadFoodAgain(this.numFood);

}

World.prototype.loadFood = function (numFood, array) {
    for (let i = 0; i < this.numFood; i++) {
        let x = Math.random() * (this.canvasMain.width - 20) + 10;
        let y = Math.random() * (this.canvasMain.height - 20) + 10;
        array.push(new Food(x, y));
    }
}

World.prototype.runArray = function (array) {
    for (let i = 0; i < array.length; i++) {
        array[i].run();
    }
}

World.prototype.loadFoodAgain = function (numFood) {
    if (this.food.length === 0 && start) {
        for (let i = 0; i < numFood; i++) {
            let x = Math.random() * (this.canvasMain.width - 20) + 10;
            let y = Math.random() * (this.canvasMain.height - 20) + 10;
            food.push(new Food(x, y));
        }
    }
}