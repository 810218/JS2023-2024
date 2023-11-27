//  Vehicle constructor function +++++++++++++++++++++++++++++
function Vehicle(loc, vel) {
    this.loc = new JSVector(loc.x, loc.y);
    this.vel = new JSVector(vel.x, vel.y);
    this.acc = new JSVector(0, 0);
    this.desiredSep = 50;//  desired separation between vehicles
    this.scl = 3;
    this.clr = "rgba(180,0,220,.8)";
    this.maxSpeed = document.getElementById("slider2").value;  // Get slider VAlue%%%%%%%%%%%%%%%%
    this.maxForce = document.getElementById("slider1").value;  // Get slider VAlue%%%%%%%%%%%%%%%%%
    this.flockForce = new JSVector(0, 0);
}

//  placing methods in the prototype 
Vehicle.prototype.run = function (vehicles) {
    this.flock(vehicles);
    this.update();
    this.checkEdges()
    this.render();
}

Vehicle.prototype.flock = function (vehicles) {
    //  flock force is the accumulation of all forces
    this.lockForce = new JSVector(0, 0);
    // set up force vectors to be added to acc
    let sep = this.separate(vehicles);
    let ali = this.align(vehicles);
    let coh = this.cohesion(vehicles);
    //  set multiples via sliders 
    let sepMult = document.getElementById("slider3").value; // Get slider VAlue%%%%%%%%%%%%%%%%%%
    let aliMult = document.getElementById("slider4").value;;  // Get slider VAlue%%%%%%%%%%%%%%%%%%
    let cohMult = document.getElementById("slider5").value;;    // Get slider VAlue%%%%%%%%%%%%%%%%%%
    //  calculate three forces
    sep.multiply(5000 * sepMult);
    ali.multiply(aliMult);
    coh.multiply(500 * cohMult);
    //  add each of these to flockForce
    this.flockForce.add(sep);
    // this.flockForce.add(ali);
    // this.flockForce.add(coh);
    this.acc.add(this.flockForce);
}
//+++++++++++++++++++++++++++++++++  Flocking functions
Vehicle.prototype.separate = function (v) {
    let escapeVector = new JSVector(0, 0);
    let count = 0;
    for (let i = 0; i < v.length; i++) {
        let distance = this.loc.distance(v[i].loc);
        if (distance > 0 && distance < this.desiredSep) {
            oppVector = JSVector.subGetNew(this.loc, v[i].loc);
            oppVector.normalize();
            oppVector.divide(distance);
            escapeVector.add(oppVector);
            count++;
        }
    }
    if (count > 0) {
        escapeVector.divide(count);
    }
    return escapeVector;
}

Vehicle.prototype.align = function (v) {
    let sum = new JSVector(0, 0);
    let count = 0;
    for (let i = 0; i < v.length; i++) {
        let distance = this.loc.distance(v[i].loc);
        if (distance > 0) {
            sum.add(v[i].vel);
            count++;
        }
    }
    if (count > 0) {
        sum.divide(count);
        sum.normalize();
    }
    return sum;
}

Vehicle.prototype.cohesion = function (v) {
    let seekVector = new JSVector(0, 0);
    let count = 0;
    for (let i = 0; i < v.length; i++) {
        let distance = this.loc.distance(v[i].loc);
        if (distance > 0) {
            oppVector = JSVector.subGetNew(v[i].loc, this.loc);
            oppVector.normalize();
            oppVector.divide(distance);
            seekVector.add(oppVector);
            count++;
        }
    }
    if (count > 0) {
        seekVector.divide(count);
    }
    return seekVector;
}

Vehicle.prototype.seek = function (target) {
    // A vector pointing from the location to the target
    let desired = JSVector.subGetNew(target, this.loc);
    let steer = JSVector.subGetNew(desired, this.vel);
    return steer;
}
//+++++++++++++++++++++++++++++++++  Flocking functions

Vehicle.prototype.update = function () {
    this.vel.add(this.acc);
    this.vel.limit(1);
    this.loc.add(this.vel);
}

Vehicle.prototype.checkEdges = function () {
    if (this.loc.x > game.canvas.width) this.loc.x = 0;
    if (this.loc.x < 0) this.loc.x = game.canvas.width;
    if (this.loc.y > game.canvas.height) this.loc.y = 0;
    if (this.loc.y < 0) this.loc.y = game.canvas.height;
}

Vehicle.prototype.render = function () {
    let ctx = game.ctx;
    ctx.save();
    ctx.translate(this.loc.x, this.loc.y);
    ctx.rotate(this.vel.getDirection() + Math.PI / 2); //offset 90 degrees
    ctx.beginPath();
    ctx.strokeStyle = this.clr;
    ctx.fillStyle = this.clr;
    ctx.moveTo(0, -this.scl);
    ctx.lineTo(-this.scl, this.scl);
    ctx.lineTo(0, 0);
    ctx.lineTo(this.scl, this.scl);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
}
