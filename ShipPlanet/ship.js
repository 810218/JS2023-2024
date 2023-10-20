function Ship(x, y) {
    this.loc = new JSVector(x, y);
    this.disp = 30;
    this.vel = new JSVector(3, 3);
    this.acc = new JSVector(0, 0);
}

Ship.prototype.run = function () {
    this.render();
    this.update();
}

Ship.prototype.render = function () {
    let clr = "rgba(16,100,255,0.83";
    context.beginPath();
    context.strokeStyle = clr;
    context.fillStyle = clr;
    context.moveTo(this.loc.x, this.loc.y - this.disp);
    context.lineTo(this.loc - this.disp, this.loc.y + this.disp);
    context.lineTo(this.loc.x, this.loc.y);
    context.lineTo(this.loc.x + this.disp, this.loc.x - this.disp);
    context.stroke();
    context.fill();
    //context.endPath();
}

Ship.prototype.update = function () {
    this.acc = JSVector.subGetNew(planet.loc, this.loc);
    this.acc.normalize();
    this.acc.multiply(0.05);
    this.vel = JSVector.addGetNew(this.vel, this.acc);
    this.vel.limit(3);
    this.loc = JSVector.addGetNew(this.loc, this.vel);
}
