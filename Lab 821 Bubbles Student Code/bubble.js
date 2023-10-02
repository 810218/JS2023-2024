

//  Bubble constructor function +++++++++++++++++++++++++++++
function Bubble(x, y, diam, clr) {
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(Math.random() * (2 + 2 + 1) - 2, Math.random() * (2 + 2 + 1) - 2);
  this.diam = diam;
  this.mass = 2 * diam;
  this.clr = clr;
  this.otherColor = "rgba(120,0,90,255)";
  this.isOverlapping = false;
  this.acc = new JSVector(0, 0);
  this.forces = [];
  this.numForces = 0;
}

//  placing methods in the prototype (every ball shares functions)
Bubble.prototype.run = function () {
  this.checkEdges();
  this.checkOverlapping();
  this.update();
  this.render();
}

//  Check to see if buuble leaves canvas area and reposition in necessary
Bubble.prototype.checkEdges = function () {
  if (this.loc.x > canvas.width) {
    this.loc.x = canvas.width - 1;
    this.vel.x = -1 * this.vel.x;
  }
  if (this.loc.x < 0) {
    this.loc.x = 1;
    this.vel.x = -1 * this.vel.x;
  }
  if (this.loc.y > canvas.height) {
    this.loc.y = canvas.height - 1;
    this.vel.y = -1 * this.vel.y;
  }
  if (this.loc.y < 0) {
    this.loc.y = 1;
    this.vel.y = -1 * this.vel.y;
  }
}

  //  Sets "this.isOverlapping" to true if bubbles are overlapping
Bubble.prototype.checkOverlapping = function () {
  this.isOverlapping = false;
  let b = bubbles;
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
  if(boolean){
    this.forces[this.numForces][2] = 0;
  } else {
    this.forces[this.numForces][2] = 1;
  }
  this.numForces++;
}

//  update bubble every animation frame
Bubble.prototype.update = function () {
  this.vel.limit(200);
  this.loc.x += this.vel.x;
  this.loc.y += this.vel.y;



  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  let distToMainMover = Math.sqrt(Math.pow(this.loc.x - mainMover.loc.x, 2) + Math.pow(this.loc.y - mainMover.loc.y, 2));
  if (this != mainMover) {
    if (distToMainMover < (400 + 10*this.mass)) {
      if(aR === "attraction"){
        this.acc = JSVector.subGetNew(mainMover.loc, this.loc);
        this.acc.normalize();
        this.acc.multiply(0.07 * (this.mass*0.1));
        this.vel.add(this.acc);
      } else {
        this.acc = JSVector.subGetNew(mainMover.loc, this.loc);
        this.acc.normalize();
        this.acc.x *= -1;
        this.acc.y *= -1;
        this.acc.multiply(0.07 * (this.mass*0.1));
        this.vel.add(this.acc);
      }
    }
  }
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // for(let i = 0; i < bubbles.length; i++){
  //   let distToMover = Math.sqrt(Math.pow(this.loc.x - bubbles[i].loc.x, 2) + Math.pow(this.loc.y - bubbles[i].loc.y, 2));
  //   if (this != bubbles[i]) {
  //     if (distToMover < (400)) {
  //       if(aR === "attraction"){
  //         this.acc = JSVector.subGetNew(bubbles[i].loc, this.loc);
  //         this.acc.normalize();
  //         this.acc.multiply(0.9);
  //         this.vel.add(this.acc);
  //       } else {
  //         this.acc = JSVector.subGetNew(bubbles[i].loc, this.loc);
  //         this.acc.normalize();
  //         this.acc.x *= -1;
  //         this.acc.y *= -1;
  //         this.acc.multiply(0.9);
  //         this.vel.add(this.acc);
  //       }
  //     }
  //   }
  // }





//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  for(let i = 0; i < this.forces.length; i++){
    if(this.forces[i][2] === 0){
      this.vel.x += this.forces[i][0];
      this.vel.y += this.forces[i][1];
    }
  }
}
