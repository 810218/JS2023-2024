function Food(x, y) {
    this.loc = new JSVector(x, y);
    this.radius = Math.random() * 10 + 5;
}


Food.prototype.run = function () {
    this.render()
}

Food.prototype.render = function () {
    context.beginPath();
    context.arc(this.loc.x, this.loc.y, this.radius, 0, 2 * Math.PI);
    context.strokeStyle = "rgba(120,0,90,255)";
    context.fillStyle = "rgba(68,108,54,1)";
    context.fill();
    // context.stroke();
}