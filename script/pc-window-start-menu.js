// This script assumes it's loaded after the HTML elements are available,
// ideally by placing it before the closing </body> tag or using DOMContentLoaded.

document.addEventListener('DOMContentLoaded', () => {
    // Get references to the elements
    const startButton = document.getElementById('start');
    const categoryWindow = document.getElementById('category');
    // Get reference to the close button inside the category window
    const closeButton = categoryWindow ? categoryWindow.querySelector('.close-button') : null;

    // Check if both elements exist
    if (startButton && categoryWindow) {
        // Initially hide the window (ensure this is also set in CSS as a fallback)
        categoryWindow.style.display = 'none'; // Ensure it's hidden on load

        // Add a click event listener to the start button to toggle visibility
        startButton.addEventListener('click', () => {
            // Toggle the display style of the category window
            // If it's 'none', set it to 'block' (or your desired display type, e.g., 'flex')
            // If it's not 'none', set it to 'none'
            if (categoryWindow.style.display === 'none') {
                categoryWindow.style.display = 'block'; // Or 'flex', 'grid', etc., based on your layout needs
                console.log('Category window shown by start button.');
            } else {
                categoryWindow.style.display = 'none';
                console.log('Category window hidden by start button.');
            }
        });

        // Add a click event listener to the close button to only hide the window
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                categoryWindow.style.display = 'none';
                console.log('Category window hidden by close button.');
            });
        } else {
            console.error('Error: Close button with class "close-button" not found inside category window.');
        }

    } else {
        // Log an error if elements are not found, useful for debugging
        if (!startButton) {
            console.error('Error: Element with ID "start" not found.');
        }
        if (!categoryWindow) {
            console.error('Error: Element with ID "category" not found.');
        }
    }
});

