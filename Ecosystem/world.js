function World() {
    this.canvasMain = document.getElementById('cnv1');
    this.contextMain = this.canvasMain.getContext('2d');
    this.canvasMini = document.getElementById('cnv2');
    this.contextMini = this.canvasMini.getContext('2d');

    this.canvasMainLoc = new JSVector(0, 0);
    this.dims = {
        top: -1500,
        left: -2000,
        bottom: 1500,
        right: 2000,
        width: 4000,
        height: 3000
    }

    this.numFood = 20;
    this.food = [];
    this.loadFood(this.numFood, this.food);
    this.creature = new Creature(200, 200, this.food);

    this.scaleX = this.canvasMini.width / this.dims.width;
    this.scaleY = this.canvasMini.height / this.dims.height;

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
                    world.canvasMainLoc.x += 20;
                break;
            case "KeyD":
                if (world.canvasMainLoc.x + world.canvasMain.width - 100 < world.dims.right)
                    world.canvasMainLoc.x -= 20;
                break;
        }
    }, false);

}


World.prototype.run = function () {
    //clear the canvas
    this.contextMain.clearRect(0, 0, this.canvasMain.width, this.canvasMain.height);
    this.contextMini.clearRect(0, 0, this.canvasMini.width, this.canvasMini.height);


    this.contextMain.save();
    this.contextMini.save();
    this.contextMain.translate(-this.canvasMainLoc.x, -this.canvasMainLoc.y);
    this.contextMini.translate(this.canvasMini.width / 2, this.canvasMini.height / 2);

    this.contextMain.beginPath(); //draws axis main
    this.contextMain.moveTo(this.dims.left, 0);
    this.contextMain.lineTo(this.dims.right, 0);
    this.contextMain.closePath();
    this.contextMain.lineWidth = 20;
    this.contextMain.stroke();
    this.contextMain.beginPath();
    this.contextMain.moveTo(0, this.dims.top);
    this.contextMain.lineTo(0, this.dims.bottom);
    this.contextMain.closePath();
    this.contextMain.lineWidth = 20;
    this.contextMain.stroke();

    this.contextMain.beginPath(); //draws border main
    this.contextMain.moveTo(this.dims.left, this.dims.top);
    this.contextMain.lineTo(this.dims.left, this.dims.bottom);
    this.contextMain.lineTo(this.dims.right, this.dims.bottom);
    this.contextMain.lineTo(this.dims.right, this.dims.top);
    this.contextMain.closePath();
    this.contextMain.lineWidth = 20;
    this.contextMain.stroke();

    // this.contextMini.clearRect(0, 0, this.canvasMini.width, this.canvasMini.height);
    this.contextMini.scale(this.scaleX, this.scaleY);

    this.runArray(this.food);
    this.creature.run();
    this.loadFoodAgain(this.numFood);

    this.contextMain.restore();

    this.contextMini.beginPath(); //draws axis mini
    this.contextMini.moveTo(this.dims.left, 0);
    this.contextMini.lineTo(this.dims.right, 0);
    this.contextMini.closePath();
    this.contextMini.lineWidth = 20;
    this.contextMini.stroke();
    this.contextMini.beginPath();
    this.contextMini.moveTo(0, this.dims.top);
    this.contextMini.lineTo(0, this.dims.bottom);
    this.contextMini.closePath();
    this.contextMini.lineWidth = 20;
    this.contextMini.stroke();

    this.contextMini.beginPath(); //draws border mini
    this.contextMini.moveTo(this.canvasMainLoc.x, this.canvasMainLoc.y);
    this.contextMini.lineTo(this.canvasMainLoc.x, this.canvasMainLoc.y + this.canvasMainLoc.height);
    this.contextMini.lineTo(this.canvasMainLoc.x + this.canvasMainLoc.width, this.canvasMainLoc.y + this.canvasMainLoc.height);
    this.contextMini.lineTo(this.canvasMainLoc.x + this.canvasMainLoc.width, this.canvasMainLoc.y);
    this.contextMini.closePath();
    this.contextMini.lineWidth = 20;
    this.contextMini.stroke();

    this.contextMini.restore();
    //+++    Draw the main and mini Canvas with bounds and axes
    // this.contextMain.save();
    // this.contextMain.translate(this.canvasMainLoc.x, this.canvasMainLoc.y);

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
            let x = Math.random() * (this.contextMain.width - 20) + 10;
            let y = Math.random() * (this.contextMain.height - 20) + 10;
            food.push(new Food(x, y));
        }
    }
}