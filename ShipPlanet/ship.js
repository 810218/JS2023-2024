function Ship(x, y) {
    this.loc = new JSVector(x, y);
    this.disp = 30;
}

Ship.prototype.run = function () {
    this.render();
}

Ship.prototype.render = function () {
    let clr = "rgba(16,100,255,0.83";
    context.rotate(2);

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