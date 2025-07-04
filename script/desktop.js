// Updates the digital clock display
function updateDigitalClock(time) {
  const clockElement = document.querySelector('.clock');
  const options = { hour: 'numeric', minute: '2-digit', hour12: true };
  clockElement.textContent = time.toLocaleTimeString('en-US', options);
}

// Updates the analog clock hands
function updateAnalogClock(time) {
  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourHand = document.querySelector('.hour-hand');
  const minuteHand = document.querySelector('.minute-hand');
  const secondHand = document.querySelector('.second-hand');

  const hourDeg = (hours * 30) + (minutes * 0.5); // 30° per hour, 0.5° per minute
  const minuteDeg = minutes * 6; // 6° per minute
  const secondDeg = seconds * 6; // 6° per second

  hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
  secondHand.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
}

// Updates both clocks with the provided time
function updateClocks(time) {
  updateDigitalClock(time);
  updateAnalogClock(time);
}

// Toggles the main Start menu full-screen window with iframe
function toggleStartWindow(e) {
  e.preventDefault();
  const startWindow = document.querySelector('.start-window');
  const startWindow3D = document.querySelector('.start-window-3d');
  const isActive = startWindow.classList.contains('active');
  startWindow.classList.toggle('active');
  if (startWindow3D && startWindow3D.classList.contains('active')) {
    startWindow3D.classList.remove('active');
  }
  if (!isActive) {
    closeSubTileWindows();
  }
}

// Toggles the 3D Start menu full-screen window with iframe
function toggleStartWindow3D(e) {
  e.preventDefault();
  const startWindow = document.querySelector('.start-window');
  const startWindow3D = document.querySelector('.start-window-3d');
  const isActive = startWindow3D.classList.contains('active');
  startWindow3D.classList.toggle('active');
  if (startWindow.classList.contains('active')) {
    startWindow.classList.remove('active');
  }
  if (!isActive) {
    closeSubTileWindows();
  }
}

// Closes all sub-tile full-screen windows
function closeSubTileWindows() {
  const windows = document.querySelectorAll('.full-screen-window');
  windows.forEach(window => window.classList.remove('active'));
}

// Event listeners for Start links, close buttons, and tile links
document.querySelector('.start').addEventListener('click', toggleStartWindow);
if (document.querySelector('.start-3d')) {
  document.querySelector('.start-3d').addEventListener('click', toggleStartWindow3D);
}
document.querySelectorAll('.close-window').forEach(button => {
  button.addEventListener('click', () => {
    button.closest('.full-screen-window').classList.remove('active');
  });
});
document.querySelectorAll('.tile-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetWindow = document.getElementById(targetId);
      if (targetWindow) {
        targetWindow.classList.add('active');
        const startWindow = document.querySelector('.start-window');
        const startWindow3D = document.querySelector('.start-window-3d');
        if (startWindow.classList.contains('active')) {
          startWindow.classList.remove('active');
        }
        if (startWindow3D && startWindow3D.classList.contains('active')) {
          startWindow3D.classList.remove('active');
        }
        document.querySelectorAll('.full-screen-window').forEach(window => {
          if (window !== targetWindow) {
            window.classList.remove('active');
          }
        });
      }
    }
  });
});

// Initialize clocks with internet time, fallback to local time
getInternetTime().then(time => {
  updateClocks(time);
  setInterval(() => {
    time.setSeconds(time.getSeconds() + 1);
    updateClocks(time);
  }, 1000);
}).catch(() => {
  const localTime = new Date();
  updateClocks(localTime);
  setInterval(() => updateClocks(new Date()), 1000);
});
