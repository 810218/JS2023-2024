function Planet(x, y) {
    this.loc = new JSVector(x, y);
}

Planet.prototype.run = function () {
    this.escape();
    this.render();
}

Planet.prototype.render = function () {
    context.strokeStyle = "rgba(50, 148, 243,1)";
    context.fillStyle = "rgba(50, 148, 243,1)"
    context.beginPath();
    context.arc(this.loc.x, this.loc.y, 8, Math.PI * 2, 0, false);
    context.stroke();
    context.fill();
}

Planet.prototype.escape = function () {
    if (Math.sqrt(Math.pow((this.loc.x - ship1.loc.x), 2) + Math.pow((this.loc.y * ship1.loc.y), 2)) < 100) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        this.loc = new JSVector(x, y);;
    }
}