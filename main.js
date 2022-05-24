const canvas = document.getElementById('canvas');
const ascentCircle = document.querySelector('.ascent-circle');
const ascentCircleLine = document.querySelector('.ascent-circle-lines');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let spots = [];

const mouse = {
  x: undefined,
  y: undefined,
};

let leftOrRight;
let upOrDown;

let initialLeft = ascentCircle.offsetLeft;
let initialTop = ascentCircle.offsetTop;

let initialLeft1 = ascentCircleLine.offsetLeft;
let initialTop1 = ascentCircleLine.offsetTop;

canvas.addEventListener('mousemove', (e) => {
  leftOrRight = e.x > mouse.x ? 'right' : e.x < mouse.x ? 'left' : 'none';
  upOrDown = e.y > mouse.y ? 'down' : e.y < mouse.y ? 'up' : 'none';

  mouse.x = e.x;
  mouse.y = e.y;

  if (leftOrRight === 'left') {
    if (initialLeft - 10 !== ascentCircle.offsetLeft - 1) {
      ascentCircle.style.left = `${ascentCircle.offsetLeft - 1}px`;
    }

    if (initialLeft1 - 10 !== ascentCircleLine.offsetLeft - 1) {
      ascentCircleLine.style.left = `${ascentCircleLine.offsetLeft - 1}px`;
    }
  } else if (leftOrRight === 'right') {
    if (initialLeft + 10 !== ascentCircle.offsetLeft - 1) {
      ascentCircle.style.left = `${ascentCircle.offsetLeft + 1}px`;
    }

    if (initialLeft1 + 10 !== ascentCircleLine.offsetLeft - 1) {
      ascentCircleLine.style.left = `${ascentCircleLine.offsetLeft + 1}px`;
    }
  }

  if (upOrDown === 'up') {
    if (initialTop - 10 !== ascentCircle.offsetTop - 1) {
      ascentCircle.style.top = `${ascentCircle.offsetTop - 1}px`;
    }

    if (initialTop1 - 10 !== ascentCircleLine.offsetTop - 1) {
      ascentCircleLine.style.top = `${ascentCircleLine.offsetTop - 1}px`;
    }
  } else if (upOrDown === 'down') {
    if (initialTop + 10 !== ascentCircle.offsetTop - 1) {
      ascentCircle.style.top = `${ascentCircle.offsetTop + 1}px`;
    }

    if (initialTop1 + 10 !== ascentCircleLine.offsetTop - 1) {
      ascentCircleLine.style.top = `${ascentCircleLine.offsetTop + 1}px`;
    }
  }

  spots.push(new Particle());
});

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 2 + 3;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.odds = Math.floor(Math.random() * 2) + 1;
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
    ctx.strokeStyle = 'rgba(218,0,55,60%)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

    if (this.odds === 1) {
      ctx.stroke();
    } else {
      ctx.fill();
    }
  }
}

const handleParticle = () => {
  for (let i = 0; i < spots.length; i++) {
    spots[i].update();
    spots[i].draw();

    if (spots[i].size <= 0.1) {
      spots.splice(i, 1);
    }
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticle();
  requestAnimationFrame(animate);
};

animate();
