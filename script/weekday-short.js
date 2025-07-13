
// weekday-short.js

document.addEventListener('DOMContentLoaded', () => {
    // Get the div element where the weekday will be displayed
    const weekdayDiv = document.getElementById('weekday');

    // Check if the div element exists
    if (weekdayDiv) {
        // Create a new Date object for the current date and time
        const today = new Date();

        // Options for formatting the weekday to a short name (e.g., "Mon", "Tue")
        const options = { weekday: 'short' };

        // Get the short weekday name based on the user's locale
        const shortWeekday = today.toLocaleDateString(undefined, options);

        // Update the text content of the div
        weekdayDiv.textContent = shortWeekday;
    } else {
        // Log an error if the div is not found, useful for debugging
        console.error('DIV with ID "weekday" not found.');
    }
});


