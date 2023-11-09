function Planet(x, y) {
    this.loc = new JSVector(x, y);
    let dx = Math.random() * (3 + 3 + 1) - 3;
    let dy = Math.random() * (3 + 3 + 1) - 3;
    this.vel = new JSVector(dx, dy);
    this.acc = new JSVector(0, 0);
}

Planet.prototype.run = function () {
    this.render();
    this.update();
    this.escape();
    this.checkEdges();
}

Planet.prototype.render = function () {
    context.strokeStyle = "rgba(50, 148, 243,1)";
    context.fillStyle = "rgba(50, 148, 243,1)"
    context.beginPath();
    context.arc(this.loc.x, this.loc.y, 8, Math.PI * 2, 0, false);
    context.stroke();
    context.fill();
}

Planet.prototype.update = function () {
    this.acc = JSVector.subGetNew(this.loc, snake.segmentVectors[0]);
    this.acc.normalize();
    this.acc.multiply(0.05);
    this.vel.limit(0.5);
    this.vel.add(this.acc);
    this.loc.add(this.vel);
}


Planet.prototype.escape = function () {
    if (this.loc.distance(snake.segmentVectors[0]) < 50) {
        console.log("tes");
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        this.loc.x = x;
        this.loc.y = y;
    }
}

Planet.prototype.checkEdges = function () {
    if (this.loc.x < 0) {
        this.loc.x = 5;
    } else if (this.loc.x > canvas.width) {
        this.loc.x = canvas.width - 5;
    }
    if (this.loc.y < 0) {
        this.loc.y = 5;
    } else if (this.loc.y > canvas.height) {
        this.loc.y = canvas.height - 5;
    }
}