function Creature(x, y, foodArray) {
    this.loc = new JSVector(x, y);
    this.vel = new JSVector(0, 0);
    this.acc = new JSVector(0, 0);
    this.food = foodArray;
    let foragingMode = "largest";
    let foragingIndex = -1;
    this.scale = 1;
}

Creature.prototype.run = function () {
    this.render();
    this.foragingPriority();
    this.eat();
    this.update();
    // this.checkEdges();
}

Creature.prototype.render = function () {
    let rotateAngle = this.vel.getDirection();
    world.contextMain.save();
    world.contextMain.translate(this.loc.x, this.loc.y);
    world.contextMain.rotate(rotateAngle);
    world.contextMain.beginPath();
    world.contextMain.moveTo(20, 0);
    world.contextMain.lineTo(-10, 10);
    world.contextMain.lineTo(0, 0);
    world.contextMain.lineTo(-10, -10);
    world.contextMain.closePath();
    world.contextMain.scale(this.scale, this.scale);
    world.contextMain.fillStyle = "rgba(170, 72, 57, 1)";
    world.contextMain.strokeStyle = "rgba(170, 114, 57, 1)";
    world.contextMain.fill();
    world.contextMain.stroke();
    world.contextMain.restore();

    world.contextMini.beginPath();
    world.contextMini.arc(this.loc.x, this.loc.y, 50, 0, 2 * Math.PI);
    world.contextMini.strokeStyle = "rgba(170, 114, 57, 1)";
    world.contextMini.fillStyle = "rgba(170, 114, 57, 0)";
    world.contextMini.fill();
    world.contextMini.stroke();
    world.contextMini.closePath();

}

Creature.prototype.update = function () {
    if (this.foragingMode === "largest") {
        if (this.foodRank() > -1) {
            this.acc = JSVector.subGetNew(this.food[this.foodRank()].loc, this.loc);
            this.acc.normalize();
            this.acc.multiply(0.1);
        } else {
            this.acc = new JSVector(0, 0)
        }
    } else if (this.foragingMode === "closest") {
        if (this.findClosest() > -1) {
            this.acc = JSVector.subGetNew(this.food[this.findClosest()].loc, this.loc);
            this.acc.normalize();
            this.acc.multiply(0.1);
        } else {
            this.acc = new JSVector(0, 0);
        }
    }
    this.vel.limit(1);
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    if (this.scale > 1) {
        this.scale = this.scale / 1.001;
    }
}

Creature.prototype.foodRank = function () {
    let maxSize = 0;
    maxIndex = -1;
    for (let i = 0; i < world.food.length; i++) {
        if (this.food[i].radius > maxSize) {
            maxSize = this.food[i].radius;
            maxIndex = i;
        }
    }
    return maxIndex;
}

Creature.prototype.eat = function () {
    for (let i = 0; i < this.food.length; i++) {
        if (this.loc.distance(this.food[i].loc) < this.food[i].radius) {
            this.scale += this.food[i].radius / 20;
            this.food.splice(i, 1);
            start = true;
        }
    }
}

Creature.prototype.checkEdges = function () {
    if (this.loc.x < 5) {
        this.vel.x *= -1;
    }
    if (this.loc.x > world.canvasMain.width - 5) {
        this.vel.x *= -1;
    }
    if (this.loc.y < 5) {
        this.vel.y *= -1;
    }
    if (this.loc.y > world.canvasMain.height - 5) {
        this.vel.y *= -1;
    }
}

Creature.prototype.foragingPriority = function () {
    this.foragingMode = "largest"
    for (let i = 0; i < this.food.length; i++) {
        if (this.loc.distance(this.food[i].loc) < 50) {
            this.foragingMode = "closest";
        }
    }
}

Creature.prototype.findClosest = function () {
    let distance = 10000000;
    let index = -1;
    for (let i = 0; i < this.food.length; i++) {
        if (this.loc.distance(this.food[i].loc) < distance) {
            distance = this.loc.distance(this.food[i].loc);
            index = i;
        }
    }
    return index;
}