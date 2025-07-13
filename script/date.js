
// date.js

document.addEventListener('DOMContentLoaded', () => {
    // Get the div element where the date will be displayed
    const footerDateElement = document.getElementById('footer-date');

    // Check if the element exists to prevent errors
    if (footerDateElement) {
        // Create a new Date object for the current date
        const today = new Date();

        // Get day, month, and year
        // getUTCDate() is used to avoid timezone issues, but getDate() is also common for local time
        const day = String(today.getDate()).padStart(2, '0'); // Add leading zero if single digit
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
        const year = today.getFullYear();

        // Format the date as DD-MM-YYYY
        const formattedDate = `${day}-${month}-${year}`;

        // Set the text content of the div
        footerDateElement.textContent = formattedDate;
        console.log(`Date displayed: ${formattedDate}`);
    } else {
        console.error('Error: Div with ID "footer-date" not found!');
    }
});



