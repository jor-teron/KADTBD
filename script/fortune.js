// Assuming fortune.json is in the same directory as your HTML file
fetch('fortune1.json')
  .then(response => response.json())  // Parse the JSON response
  .then(data => {
    // Randomly select a fortune from the array
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomFortune = data[randomIndex];
    
    // Display the selected fortune in the HTML element with id="fortune"
    document.getElementById('fortune').textContent = randomFortune;
  })
  .catch(error => {
    // Handle any errors that might occur
    console.error('Error loading the fortune data:', error);
    document.getElementById('fortune').textContent = 'Sorry, we could not load your fortune.';
  });
