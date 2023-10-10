
function Particle(x, y, initialXVelocity, initialYVelocity, lifespan) {
    this.loc = new JSVector(x, y);
    this.vel = new JSVector(initialXVelocity, initialYVelocity);
    this.acc = new JSVector(0, 0.4);
    this.lifespan = lifespan;
}

Particle.prototype.run = function () {
    this.render();
    this.update();
}

Particle.prototype.render = function () {
    context.beginPath();
    context.arc(this.loc.x, this.loc.y, 10, 0, 2 * Math.PI);
    context.strokeStyle = "rgba(120,0,90,255)";
    context.fillStyle = "rgba(120,0,90,255)";
    context.fill();
    context.stroke();
}

Particle.prototype.update = function () {
    this.loc.add(this.vel);
    this.vel.add(this.acc);
    this.lifespan--;
}