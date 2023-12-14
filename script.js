const canvas = document.getElementById('trail');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseX = 0, mouseY = 0;

function updateMousePos(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

document.addEventListener('mousemove', updateMousePos);

class Particle {
    constructor() {
      this.x = mouseX;
      this.y = mouseY;

      this.vx = (Math.random() - 0.5) * 1;
      this.vy = (Math.random() - 0.5) * 1;
      
      this.size = Math.random() * 8 + 2;

      this.color = 'rgba(255, 255, 255, 0.8)';
      this.opacity = 1;
      this.outerOpacity = 0.6;
    }
  
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.size *= 0.96;
      this.opacity *= 0.96;
      this.outerOpacity *= 0.98;
    }
  
    draw() {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size + 10);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size + 10, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.8})`;
        ctx.fill();
      }
    
    get isDead() {
      return this.opacity < 0.01 || this.size < 0.5;
    }
  }
const particles = [];

function spawnParticle() {
  particles.push(new Particle());
}

setInterval(spawnParticle, 30);

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    if (particles[i].isDead) {
      particles.splice(i, 1);
    }
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const particle of particles) {
    particle.draw();
  }
}

function loop() {
  updateParticles();
  drawParticles();
  requestAnimationFrame(loop);
}

loop();
