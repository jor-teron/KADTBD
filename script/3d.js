const prismContainer = document.querySelector('.prism-container');
const prism = document.getElementById('prism');
let rotateY = 0;

// Mouse wheel control for horizontal rotation
prismContainer.addEventListener('wheel', (e) => {
  e.preventDefault(); // Prevent page scrolling
  // Scroll up (negative deltaY) rotates counterclockwise, scroll down rotates clockwise
  rotateY += e.deltaY > 0 ? -30 : 30; // Adjust rotation by 5 degrees per wheel tick
  prism.style.transform = `rotateY(${rotateY}deg)`;
});

// Button controls to snap to specific faces
function showFace(face) {
  const rotations = {
    side1: 0,
    side2: -30,
    side3: -60,
    side4: -90,
    side5: -120,
    side6: -150,
    side7: -180,
    side8: -210,
    side9: -240,
    side10: -270,
    side11: -300,
    side12: -330
  };
  rotateY = rotations[face];
  prism.style.transform = `rotateY(${rotateY}deg)`;
}
