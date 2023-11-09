
function Snake(x, y, length) {
    this.headLoc = new JSVector(x, y);
    this.loc = new JSVector(x, y);
    this.length = length;
    this.segmentVectors = [];
    this.loadSegmentVectors();
    this.headVel = new JSVector(0, 1);
    this.headAcc = new JSVector(-1, 0);
}

Snake.prototype.run = function () {
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
    this.headVel.add(this.headAcc);
    this.headVel.limit(1);
    for (let i = 0; i < this.length; i++) {
        this.segmentVectors[i].add(this.headVel);
    }
}