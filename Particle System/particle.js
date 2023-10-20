
function Particle(x, y, initialXVelocity, initialYVelocity, colorIndex) {
    this.loc = new JSVector(x, y);
    this.vel = new JSVector(initialXVelocity, initialYVelocity);
    this.acc = new JSVector(0, 0.2);
    this.shape = 0;
    this.color = colorIndex;
    this.opacity = 1;
}

Particle.prototype.run = function () {
    this.render();
    this.update();
    this.checkEdges();
    this.opacity -= 0.008;
}

Particle.prototype.render = function () {
    if (this.color === 0) {//red
        // context.strokeStyle = "rgba(255, 19, 0, " + this.opacity + ")";
        // context.fillStyle = "rgba(255, 19, 0, " + this.opacity + ")";
        // context.beginPath();
        // context.arc(this.loc.x, this.loc.y, 8, Math.PI * 2, 0, false);
        // context.stroke();
        // context.fill();
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
    else if (this.color === 1) {//orange
        context.strokeStyle = "rgba(255, 142, 0, " + this.opacity + ")";
        context.fillStyle = "rgba(255, 142, 0, " + this.opacity + ")";
        context.beginPath();
        context.arc(this.loc.x, this.loc.y, 8, Math.PI * 2, 0, false);
        context.stroke();
        context.fill();
    }
    else if (this.color === 2) {//yellow
        context.strokeStyle = "rgba(255, 219, 0, " + this.opacity + ")";
        context.fillStyle = "rgba(255, 219, 0, " + this.opacity + ")";
        context.beginPath();
        context.arc(this.loc.x, this.loc.y, 8, Math.PI * 2, 0, false);
        context.stroke();
        context.fill();
    }
    else if (this.color === 3) {//green
        context.strokeStyle = "rgba(0, 255, 44, " + this.opacity + ")";
        context.fillStyle = "rgba(0, 255, 44, " + this.opacity + ")";
        context.beginPath();
        context.arc(this.loc.x, this.loc.y, 8, Math.PI * 2, 0, false);
        context.stroke();
        context.fill();
    }
    else if (this.color === 4) {//blue
        context.strokeStyle = "rgba(50, 148, 243, " + this.opacity + ")";
        context.fillStyle = "rgba(50, 148, 243, " + this.opacity + ")";
        context.beginPath();
        context.arc(this.loc.x, this.loc.y, 8, Math.PI * 2, 0, false);
        context.stroke();
        context.fill();
    }
    else if (this.color === 5) {//purple
        context.strokeStyle = "rgba(115, 62, 255, " + this.opacity + ")";
        context.fillStyle = "rgba(115, 62, 255, " + this.opacity + ")";
        context.beginPath();
        context.arc(this.loc.x, this.loc.y, 8, Math.PI * 2, 0, false);
        context.stroke();
        context.fill();
    }
    else if (this.color === 6) {//pink
        context.strokeStyle = "rgba(248, 39, 255, " + this.opacity + ")";
        context.fillStyle = "rgba(248, 39, 255, " + this.opacity + ")";
        context.beginPath();
        context.arc(this.loc.x, this.loc.y, 8, Math.PI * 2, 0, false);
        context.stroke();
        context.fill();
    }
}


Particle.prototype.checkEdges = function () {
    if (this.loc.x > canvas.width) {
        this.loc.x = canvas.width - 1;
        this.vel.x = -1 * this.vel.x;
    }
    if (this.loc.x < 2) {
        this.loc.x = 1;
        this.vel.x = -1 * this.vel.x;
    }
    if (this.loc.y > canvas.height) {
        this.loc.y = canvas.height - 1;
        this.vel.y = -1 * this.vel.y;
    }
    if (this.loc.y < 2) {
        this.loc.y = 1;
        this.vel.y = -1 * this.vel.y;
    }
}



Particle.prototype.update = function () {
    this.loc.add(this.vel);
    this.vel.add(this.acc);
    // this.vel.limit(5);
}