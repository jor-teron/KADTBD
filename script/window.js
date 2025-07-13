const carousel = document.getElementById('carousel');
let rotateY = 0;
let isScrolling = false;

document.querySelector('.carousel-container').addEventListener('wheel', (e) => {
  e.preventDefault();
  if (isScrolling) return;
  isScrolling = true;
  setTimeout(() => { isScrolling = false; }, 200);

  rotateY -= Math.sign(e.deltaY) * 20;
  rotateY = Math.round(rotateY / 20) * 20;
  carousel.style.transform = `rotateY(${rotateY}deg)`;
});

function showSide(side) {
  const rotations = {
    side1: 0,
    side2: -40,
    side3: -80,
    side4: -120,
    side5: -160,
    side6: -200,
    side7: -240,
    side8: -280,
    side9: -320
  };
  rotateY = rotations[side];
  carousel.style.transform = `rotateY(${rotateY}deg)`;
}
