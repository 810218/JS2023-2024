function Creature(x, y, foodArray) {
    this.loc = new JSVector(x, y);
    this.vel = new JSVector(0, 0);
    this.acc = new JSVector(0, 0);
    this.food = foodArray;
    let foragingMode = "largest";
    let foragingIndex = -1;
}

Creature.prototype.run = function () {
    this.foragingPriority();
    this.render();
    this.eat();
    this.update();
    this.checkEdges();
}

Creature.prototype.render = function () {
    let rotateAngle = this.vel.getDirection();
    context.save();
    context.translate(this.loc.x, this.loc.y);
    context.rotate(rotateAngle);
    context.beginPath();
    context.moveTo(20, 0);
    context.lineTo(-10, 10);
    context.lineTo(0, 0);
    context.lineTo(-10, -10);
    context.closePath();
    context.fillStyle = "rgba(170, 72, 57, 1)";
    context.strokeStyle = "rgba(170, 114, 57, 1)";
    context.fill();
    context.stroke();
    context.restore();
}

Creature.prototype.update = function () {
    if (this.foragingMode === "largest") {
        if (this.foodRank() > -1) {
            this.acc = JSVector.subGetNew(this.food[this.foodRank()].loc, this.loc);
            this.acc.normalize();
            this.acc.multiply(10);
        } else {
            this.acc = new JSVector(0, 0)
        }
    } else if (this.foragingMode === "closest") {
        if (this.findClosest() > -1) {
            this.acc = JSVector.subGetNew(this.food[this.findClosest()].loc, this.loc);
            this.acc.normalize();
            this.acc.multiply(10);
        } else {
            this.acc = new JSVector(0, 0);
        }
    }
    this.vel.limit(0.1);
    this.vel.add(this.acc);
    this.loc.add(this.vel);
}

Creature.prototype.foodRank = function () {
    let maxSize = 0;
    maxIndex = -1;
    for (let i = 0; i < food.length; i++) {
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
            console.log("test");
            this.food.splice(i, 1);
        }
    }
}

Creature.prototype.checkEdges = function () {
    if (this.loc.x < 5) {
        this.vel.x *= -1;
    }
    if (this.loc.x > canvas.width - 5) {
        this.vel.x *= -1;
    }
    if (this.loc.y < 5) {
        this.vel.y *= -1;
    }
    if (this.loc.y > canvas.height - 5) {
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