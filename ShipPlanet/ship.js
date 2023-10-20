function Ship(x, y) {
    this.loc = new JSVector(x, y);
    this.disp = 30;
    let dx = Math.random() * (5 + 5 + 1) - 5;
    let dy = Math.random() * (5 + 5 + 1) - 5;
    this.vel = new JSVector(dx, dy);
    this.acc = new JSVector(0, 0);
}

Ship.prototype.run = function () {
    this.render();
    this.update();
}

Ship.prototype.render = function () {
    let rotateAngle = this.vel.getDirection();
    context.save();
    context.translate(this.loc.x, this.loc.y);
    context.rotate(rotateAngle);
    context.beginPath();
    context.moveTo(20, 0);
    context.lineTo(-10, 10);
    context.lineTo(-1, 0);
    context.lineTo(-10, -10);
    context.closePath();
    context.fillStyle = "rgba(170, 72, 57, 1)";
    context.strokeStyle = "rgba(170, 114, 57, 1)";
    context.fill();
    context.stroke();
    context.restore();
}

Ship.prototype.update = function () {
    this.acc = JSVector.subGetNew(planet.loc, this.loc);
    this.acc.normalize();
    this.acc.multiply(0.2);
    this.vel.limit(1);
    this.vel.add(this.acc);
    this.loc.add(this.vel);
}








