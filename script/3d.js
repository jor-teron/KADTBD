const prismContainer = document.querySelector('.prism-container');
const prism = document.getElementById('prism');
let rotateY = 0;

// Mouse wheel control for horizontal rotation
prismContainer.addEventListener('wheel', (e) => {
  e.preventDefault(); // Prevent page scrolling
  // Scroll up (negative deltaY) rotates counterclockwise, scroll down rotates clockwise
  rotateY += e.deltaY > 0 ? -5 : 5; // Adjust rotation by 5 degrees per wheel tick
  prism.style.transform = `rotateY(${rotateY}deg)`;
});

// Button controls to snap to specific faces
function showFace(face) {
  const rotations = {
    side1: 0,
    side2: -45,
    side3: -90,
    side4: -135,
    side5: -180,
    side6: -225,
    side7: -270,
    side8: -315
  };
  rotateY = rotations[face];
  prism.style.transform = `rotateY(${rotateY}deg)`;
}
