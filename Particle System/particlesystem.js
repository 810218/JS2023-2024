
function ParticleSystem(x, y) {
    this.loc = new JSVector(x, y);
    this.particles = [];
    this.numParticles = 20;
    this.loadParticles();
    this.lifespan = 500;
    this.generate = true;
}

ParticleSystem.prototype.run = function () {
    let xVel = -5 + Math.random() * 10;
    let yVel = -1 * (Math.random() + 7);
    let colorIndex = Math.floor(Math.random() * 7);
    if (this.generate) {
        this.particles.push(new Particle(this.loc.x, this.loc.y, xVel, yVel, 1000, colorIndex));
    }
    this.spliceParticles();
    this.lifespan--;
    this.runParticles();
}

ParticleSystem.prototype.loadParticles = function () {
    for (let i = 0; i < this.numParticles; i++) {
        let xVel = Math.random(10);
        let yVel = -1 * (Math.random(10) + 10);
        this.particles.push(new Particle(this.loc.x, this.loc.y, xVel, yVel, 10));
    }
}

ParticleSystem.prototype.runParticles = function () {
    for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].run();
    }
}

ParticleSystem.prototype.spliceParticles = function () {
    for (let i = 0; i < this.particles.length; i++) {
        if (this.particles[i].lifespan < 0) {
            this.particles.splice(i, 1);
            i--;
        }
    }
}