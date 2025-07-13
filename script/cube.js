const cube = document.getElementById('cube');
const container = document.querySelector('.cube-container');
let isDragging = false;
let previousX = 0;
let previousY = 0;
let rotateX = 0;
let rotateY = 0;

// Mouse controls
container.addEventListener('mousedown', startDragging);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDragging);

// Touch controls
container.addEventListener('touchstart', startDragging);
document.addEventListener('touchmove', touchDrag);
document.addEventListener('touchend', stopDragging);

function startDragging(e) {
  isDragging = true;
  const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
  const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
  previousX = clientX;
  previousY = clientY;
}

function drag(e) {
  if (!isDragging) return;
  const clientX = e.clientX;
  const clientY = e.clientY;
  const deltaX = clientX - previousX;
  const deltaY = clientY - previousY;
  rotateY += deltaX * 0.5;
  rotateX -= deltaY * 0.5;
  cube.style.transform = `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  previousX = clientX;
  previousY = clientY;
}

function touchDrag(e) {
  if (!isDragging) return;
  e.preventDefault(); // Prevent scrolling on touch
  const clientX = e.touches[0].clientX;
  const clientY = e.touches[0].clientY;
  const deltaX = clientX - previousX;
  const deltaY = clientY - previousY;
  rotateY += deltaX * 0.5;
  rotateX -= deltaY * 0.5;
  cube.style.transform = `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  previousX = clientX;
  previousY = clientY;
}

function stopDragging() {
  isDragging = false;
}

function showFace(face) {
  const rotations = {
    front: { x: 0, y: 0 },
    back: { x: 0, y: 180 },
    left: { x: 0, y: 90 },
    right: { x: 0, y: -90 },
    top: { x: 90, y: 0 },
    bottom: { x: -90, y: 0 }
  };
  rotateX = rotations[face].x;
  rotateY = rotations[face].y;
  cube.style.transform = `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}
