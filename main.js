const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let spots = [];

const mouse = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;

  spots.push(new Particle());

  if (spots.length > 300) {
    spots.shift();
  }
});

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 2 + 3;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.1) {
      this.size -= 0.05;
    }
  }

  draw() {
    ctx.fillStyle = 'rgba(218,0,55,60%)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const handleParticle = () => {
  for (let i = 0; i < spots.length; i++) {
    spots[i].update();
    spots[i].draw();
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticle();
  requestAnimationFrame(animate);
};

animate();
