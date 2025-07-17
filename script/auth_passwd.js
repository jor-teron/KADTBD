
// IMPORTANT SECURITY WARNING:
// This password is hardcoded in the client-side JavaScript.
// Anyone can view your page's source code and find this password.
// DO NOT use this method for sensitive information or production environments.
// For secure authentication, you need a backend server to store and validate passwords.
const CORRECT_PASSWORD = "2000"; // <<< CHANGE THIS TO YOUR DESIRED PASSWORD

// --- AUTHENTICATION EXPIRATION SETTINGS ---
// Set the duration for authentication expiration.
// If a unit is not needed, set its value to 0.
const AUTH_EXPIRATION_HOURS = 0;
const AUTH_EXPIRATION_MINUTES = 30;
const AUTH_EXPIRATION_SECONDS = 0;
// ------------------------------------------

const overlay = document.getElementById('overlay');
const passwordInput = document.getElementById('password-input');
const submitButton = document.getElementById('submit-password');
const errorMessage = document.getElementById('error-message');

/**
 * Calculates the total expiration time in milliseconds based on the configured hours, minutes, and seconds.
 * @returns {number} The total expiration time in milliseconds.
 */
function getExpirationInMillis() {
    // Ensure values are treated as numbers and default to 0 if not valid
    const hoursInMillis = (Number(AUTH_EXPIRATION_HOURS) || 0) * 60 * 60 * 1000;
    const minutesInMillis = (Number(AUTH_EXPIRATION_MINUTES) || 0) * 60 * 1000;
    const secondsInMillis = (Number(AUTH_EXPIRATION_SECONDS) || 0) * 1000;

    const totalExpiration = hoursInMillis + minutesInMillis + secondsInMillis;

    if (totalExpiration <= 0) {
        console.warn('Expiration time is zero or negative. Defaulting to 2 hours.');
        return 2 * 60 * 60 * 1000; // Default to 2 hours if calculated time is invalid
    }
    return totalExpiration;
}

/**
 * Checks if the user is authenticated and if the authentication has expired.
 * @returns {boolean} True if authenticated and not expired, false otherwise.
 */
function isAuthenticated() {
    const isAuthenticatedFlag = localStorage.getItem('isAuthenticated');
    const authTimestamp = localStorage.getItem('authTimestamp');

    if (!isAuthenticatedFlag || !authTimestamp) {
        return false; // Not authenticated at all
    }

    const currentTime = new Date().getTime();
    const storedTimestamp = parseInt(authTimestamp, 10);
    const expirationDuration = getExpirationInMillis(); // Get dynamic expiration duration

    // If the current time is greater than the stored timestamp + expiration, it's expired
    if (currentTime > storedTimestamp + expirationDuration) {
        console.log('Authentication expired.');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('authTimestamp');
        return false; // Authentication expired
    }

    console.log('User is authenticated and session is active.');
    return true; // Authenticated and not expired
}

/**
 * Shows the password overlay.
 */
function showOverlay() {
    overlay.classList.remove('hidden');
    passwordInput.value = ''; // Clear input field
    errorMessage.classList.add('hidden'); // Hide error message
    // Use a setTimeout to ensure the element is fully rendered and ready for focus
    setTimeout(() => {
        passwordInput.focus();
    }, 0);
}

/**
 * Hides the password overlay.
 */
function hideOverlay() {
    overlay.classList.add('hidden');
}

/**
 * Handles the password submission.
 */
function handlePasswordSubmit() {
    const enteredPassword = passwordInput.value;

    // Only proceed if the entered password matches the correct one
    if (enteredPassword === CORRECT_PASSWORD) {
        // Password is correct
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('authTimestamp', new Date().getTime().toString());
        hideOverlay();
        console.log('Page unlocked!');
    } else {
        // Incorrect password
        errorMessage.textContent = 'Incorrect password. Please try again.';
        errorMessage.classList.remove('hidden');
        passwordInput.value = ''; // Clear the incorrect password
        passwordInput.focus(); // Keep focus on input
        console.log('Incorrect password entered.');
    }
}

// Event listener for the submit button (still available as a fallback)
submitButton.addEventListener('click', handlePasswordSubmit);

// Event listener for 'Enter' key press on the password input (still available as a fallback)
passwordInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission if any
        handlePasswordSubmit();
    }
});

// New: Event listener for input changes to enable auto-login
passwordInput.addEventListener('input', function() {
    // Check if the length of the entered password matches the correct password's length
    if (passwordInput.value.length === CORRECT_PASSWORD.length) {
        handlePasswordSubmit(); // Attempt to submit the password automatically
    }
});


// Initial check on page load
document.addEventListener('DOMContentLoaded', () => {
    if (!isAuthenticated()) {
        showOverlay();
    } else {
        hideOverlay(); // Ensure overlay is hidden if already authenticated
    }
});

// Optional: Add a listener for browser's back/forward navigation to re-check auth state
window.addEventListener('pageshow', function(event) {
    if (event.persisted) { // Check if page is loaded from cache (bfcache)
        if (!isAuthenticated()) {
            showOverlay();
        } else {
            hideOverlay();
        }
    }
});

