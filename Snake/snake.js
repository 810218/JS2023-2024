
function Snake(x, y, length) {
    this.headLoc = new JSVector(x, y);
    this.loc = new JSVector(x, y);
    this.length = length;
    this.segmentVectors = [];
    this.segmentVelVectors = [];
    this.loadSegmentVectors();
    let velX = Math.random() * 10 - 5;
    let velY = Math.random() * 10 - 5;
    this.headVel = new JSVector(velX, velY);
    this.headAcc = new JSVector(0, 0);
    this.updateSegmentVectors();
}

Snake.prototype.run = function () {
    this.updateSegmentVectors();
    this.update();
    this.render();
}


Snake.prototype.render = function () {
    // for (let i = 0; i < this.length; i++) {
    //     context.moveTo(this.loc.x, this.loc.y);

    // }
    for (let i = 0; i < this.length; i++) {
        context.beginPath();
        context.arc(this.segmentVectors[i].x, this.segmentVectors[i].y, 10, 0, 2 * Math.PI);
        context.strokeStyle = "rgba(170, 112, 57)";
        context.fillStyle = "rgba(170, 112, 57)";
        context.fill();
        context.stroke();
    }
}

Snake.prototype.loadSegmentVectors = function () {
    this.segmentVectors[0] = new JSVector(this.headLoc.x, this.headLoc.y);
    for (let i = 0; i < this.length; i++) {
        this.segmentVectors[i] = new JSVector(this.headLoc.x, this.headLoc.y + (i * 10));
    }
}

Snake.prototype.update = function () {
    this.acc = JSVector.subGetNew(planet.loc, this.loc);
    this.acc.normalize();
    this.acc.multiply(0.4);
    // this.headVel.add(this.headAcc);
    this.headVel.limit(1);
    this.headVel.add(this.acc);
    this.segmentVectors[0].add(this.headVel);
    for (let i = 1; i < this.length; i++) {
        this.segmentVectors[i].add(this.segmentVelVectors[i]);
    }
}

Snake.prototype.updateSegmentVectors = function () {
    for (let i = 0; i < this.length; i++) {
        this.segmentVelVectors[i] = JSVector.subGetNew(this.segmentVectors[0], this.segmentVectors[i]);
        this.segmentVelVectors[i].normalize();
    }
}