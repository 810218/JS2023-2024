
//test comment for iOS
//  Bubble constructor function +++++++++++++++++++++++++++++
function Bubble(x, y, diam, clr, array, numOrbiters, orbitalRadius, orbitalVelocity) {
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(Math.random() * (10) - 5, Math.random() * (10) - 5);
  this.diam = diam;
  this.clr = clr;
  this.otherColor = "rgba(120,0,90,255)";
  this.isOverlapping = false;
  this.acc = new JSVector(0, 0);
  this.forces = [];
  this.numForces = 0;
  this.array = array;
  this.numOrbiters = numOrbiters;
  this.orbiters = [];
  this.orbitalRadius = orbitalRadius;
  this.orbitalVelocity = orbitalVelocity;
  this.loadOrbiters();

}

//  placing methods in the prototype (every ball shares functions)
Bubble.prototype.run = function () {
  this.checkEdges();
  this.checkOverlapping(this.array);
  this.update();
  this.render();
  this.runOrbiters();
}

//  Check to see if buuble leaves canvas area and reposition in necessary
Bubble.prototype.checkEdges = function () {
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

//  Sets "this.isOverlapping" to true if bubbles are overlapping
Bubble.prototype.checkOverlapping = function (array) {
  this.isOverlapping = false;
  let b = array;
  for (let i = 0; i < b.length; i++) {
    if (this !== b[i]) {
      let d = Math.sqrt(Math.pow(this.loc.x - b[i].loc.x, 2) + Math.pow(this.loc.y - b[i].loc.y, 2));
      if (d < this.diam + b[i].diam) {
        this.isOverlapping = true;
        return;
      }
    }
  }
}


// renders a bubble to the canvas
Bubble.prototype.render = function () {
  if (this.isOverlapping) {
    context.beginPath();
    context.arc(this.loc.x, this.loc.y, this.diam, 0, 2 * Math.PI);
    context.strokeStyle = this.otherColor;
    context.fillStyle = this.otherColor;
    context.fill();
    context.stroke();
  }

  if (!this.isOverlapping) {
    context.beginPath();
    context.arc(this.loc.x, this.loc.y, this.diam, 0, 2 * Math.PI);
    context.strokeStyle = this.clr;
    context.fillStyle = this.clr;
    context.fill();
    context.stroke();
  } else {
    context.beginPath();
    context.arc(this.loc.x, this.loc.y, this.diam, 0, 2 * Math.PI);
    context.strokeStyle = this.otherColor;
    context.fillStyle = this.otherColor;
    context.fill();
    context.stroke();
  }
}


Bubble.prototype.addForce = function (xForce, yForce, boolean) {
  this.forces[this.numForces] = [];
  this.forces[this.numForces][0] = xForce;
  this.forces[this.numForces][1] = yForce;
  if (boolean) {
    this.forces[this.numForces][2] = 0;
  } else {
    this.forces[this.numForces][2] = 1;
  }
  this.numForces++;
}

//  update bubble every animation frame
Bubble.prototype.update = function () {
  this.vel.limit(20);
  this.loc.x += this.vel.x;
  this.loc.y += this.vel.y;
  for (let i = 0; i < this.forces.length; i++) {
    if (this.forces[i][2] === 0) {
      this.vel.x += this.forces[i][0];
      this.vel.y += this.forces[i][1];
    }
  }
}

Bubble.prototype.loadOrbiters = function () {
  for (let i = 0; i < this.numOrbiters; i++) {
    this.orbiters[i] = new Orbiter(this, this.orbitalRadius, i * (2 * Math.PI / this.numOrbiters), this.orbitalVelocity);
  }
}


Bubble.prototype.runOrbiters = function () {
  for (let i = 0; i < this.orbiters.length; i++) {
    this.orbiters[i].run();
  }
}

