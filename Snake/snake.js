function Snake(loc, segments) {
    this.loc = loc;
    this.acc = [];
    for (let i = 0; i < segments; i++) {
        this.acc[i] = new JSVector(0, 0);
    }
    this.vel = [];
    for (let i = 0; i < segments; i++) {
        this.vel[i] = new JSVector(Math.random() - 0.5, Math.random() - 0.5);
        this.vel[i].normalize();
    }
    this.segments = [];
    for (let i = 0; i < segments; i++) {
        this.segments[i] = new JSVector(this.loc.x + i * 1, this.loc.y + i * 1);
    }
    this.distance = 1;
    this.color = "rgba(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", 1)";
}

Snake.prototype.run = function () {
    this.update();
    this.checkEdges();
    this.render();
}

Snake.prototype.update = function () {

    this.segments[0].add(this.vel[0]);
    for (let i = 1; i < this.segments.length; i++) {
        if (this.segments[i].distance(this.segments[i - 1]) < this.regularDistance) {
            this.vel[i].multiply(0.5);
        }
        else if (this.segments[i].distance(this.segments[i - 1]) > this.regularDistance) {
            this.acc[i] = JSVector.subGetNew(this.segments[i - 1], this.segments[i]);
            this.acc[i].normalize();
            this.acc[i].multiply(0.05);
            this.vel[i] = JSVector.addGetNew(this.vel[i], this.acc[i]);
            this.vel[i].limit(this.vel[i - 1].getMagnitude());
        }
        this.segments[i] = JSVector.addGetNew(this.segments[i], this.vel[i]);
    }

}

Snake.prototype.checkEdges = function () {

    if (this.segments[0].x < 30) {
        this.vel[0].x *= -1;
    }
    if (this.segments[0].x > canvas.width - 30) {
        this.vel[0].x *= -1;
    }
    if (this.segments[0].y < 30) {
        this.vel[0].y *= -1;
    }
    if (this.segments[0].y > canvas.height - 30) {
        this.vel[0].y *= -1;
    }
}

Snake.prototype.render = function () {

    for (let i = 0; i < this.segments.length - 1; i++) {
        context.save();
        context.translate(this.segments[i].x, this.segments[i].y);
        context.rotate(this.vel[i].getDirection());
        context.beginPath();
        context.strokeStyle = this.color;
        context.fillStyle = this.color;
        context.arc(0, 0, 8, Math.PI * 2, 0, false);
        context.stroke();
        context.fill();
        context.closePath();
        context.restore();
    }

}