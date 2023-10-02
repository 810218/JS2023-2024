function Orbiter(parent, radius, angle, angVel) { //class of orbiters to rotate around each Bubble
    this.parent = parent;
    this.parentLoc = new JSVector(this.parent.loc.x, this.parent.loc.y);
    this.radius = radius;
    this.angle = angle;
    this.angVel = angVel;
    this.displacement = new JSVector(this.radius * Math.cos(this.angle), this.radius * Math.sin(this.angle))
    this.xDisplacement = this.radius * Math.cos(this.angle);
    this.yDisplacement = this.radius * Math.sin(this.angle);
    //this.loc = new JSVector(this.parentLoc.x + this.xDisplacement, this.parentLoc.y + this.yDisplacement);
    this.loc = JSVector.addGetNew(this.displacement, this.parent);
    this.vel = new JSVector(0, 0);
    this.acc = new JSVector(0, 0);
    this.flockForce = new JSVector(0, 0);
}

Orbiter.prototype.run = function () {
    this.render();
    this.update();
}


Orbiter.prototype.render = function () {
    context.beginPath();
    context.arc(this.loc.x, this.loc.y, 10, 0, 2 * Math.PI);
    context.strokeStyle = "rgba(170, 112, 57)";
    context.fillStyle = "rgba(170, 112, 57)";
    context.fill();
    context.stroke();
}

Orbiter.prototype.update = function () {
    this.parentLoc = new JSVector(this.parent.loc.x, this.parent.loc.y);
    this.loc = new JSVector.addGetNew(this.displacement, this.parentLoc);
    let minDistance = 100000000000;
    let minIndex = -1;
    for (let i = 0; i < bubbles.length; i++) {
        let d = Math.sqrt(Math.pow(this.loc.x - bubbles[i].loc.x, 2) + Math.pow(this.loc.y - bubbles[i].loc.y, 2));
        if (d < minDistance && bubbles[i] !== this.parent) {
            minDistance = d;
            minIndex = i;
        }
        //return minIndex;
    }

    //++++++++++++++++++++++++++++++++++
    if (this.loc.x < canvas.width - 1 && this.loc.x > 1 && this.loc.y < canvas.height - 1 && this.loc.y > 1) {
        context.beginPath();
        context.moveTo(this.parent.loc.x, this.parent.loc.y);
        context.lineTo(bubbles[minIndex].loc.x, bubbles[minIndex].loc.y);
        context.stroke();
    }
    //++++++++++++++++++++++++++++++++++


    if (this.loc.x < canvas.width - 1 && this.loc.x > 1 && this.loc.y < canvas.height - 1 && this.loc.y > 1) {
        this.acc = new JSVector(bubbles[minIndex].loc.x - this.loc.x, bubbles[minIndex].loc.y - this.loc.y);
    }
    this.acc.normalize();
    this.acc.multiply(10);
    // this.vel.add(this.acc);
    this.displacement.add(this.acc);
    this.shieldFlocking();
    this.displacement.add(this.flockForce);
    this.displacement.setMagnitude(this.radius);
}

Orbiter.prototype.shieldFlocking = function () {
    for (let i = 0; i < this.parent.orbiters.length; i++) {
        let d = Math.sqrt(Math.pow(this.loc.x - this.parent.orbiters[i].loc.x, 2) + Math.pow(this.loc.y - this.parent.orbiters[i].loc.y, 2));
        if (this.parent.orbiters[i] !== this && d < 15) {
            this.flockForce = JSVector.subGetNew(this.parent.orbiters[i].loc, this.loc);
            this.flockForce.normalize();
            this.flockForce.multiply(5);
            this.flockForce.x *= -1;
            this.flockForce.y *= -1;
        }
    }
}
