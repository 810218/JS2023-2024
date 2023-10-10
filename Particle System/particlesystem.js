
function ParticleSystem(x, y) {
    this.loc = new JSVector(x, y);
    this.particles = [];
    this.numParticles = 20;
    this.loadParticles();
}

ParticleSystem.prototype.run = function () {
    this.runParticles();
}

ParticleSystem.prototype.loadParticles = function () {
    for (let i = 0; i < this.numParticles; i++) {
        let xVel = Math.random(5);
        let yVel = -1 * (Math.random(10) + 10);
        this.particles.push(new Particle(this.loc.x, this.loc.y, xVel, yVel, 10));
    }
}

ParticleSystem.prototype.runParticles = function () {
    for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].run();
    }
}