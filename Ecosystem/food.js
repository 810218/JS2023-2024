function Food(x, y) {
    this.loc = new JSVector(x, y);
    this.base = Math.random() * 2.5;
    this.radius = this.base * this.base * this.base * this.base + 10;
}


Food.prototype.run = function () {
    this.render()
}

Food.prototype.render = function () {
    world.contextMain.beginPath();
    world.contextMain.arc(this.loc.x, this.loc.y, this.radius, 0, 2 * Math.PI);
    world.contextMain.strokeStyle = "rgba(120,0,90,255)";
    world.contextMain.fillStyle = "rgba(68,108,54,1)";
    world.contextMain.fill();
    // context.stroke();


    world.contextMini.beginPath();
    world.contextMini.arc(this.loc.x, this.loc.y, this.rad, 0, Math.PI * 2);
    world.contextMini.closePath();
    world.contextMini.strokeStyle = this.clr;
    world.contextMini.fillStyle = this.clr;
    world.contextMini.fill();
    world.contextMini.stroke();
}


