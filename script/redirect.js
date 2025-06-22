// redirect.js

const targetUrl = 'http://server.local'; // Replace with your desired URL to check and redirect to
const initialWaitTime = 2 * 1000; // 10 seconds in milliseconds
const retryWaitTime = 60 * 1000;   // 60 seconds in milliseconds

async function checkAndRedirect() {
    console.log(`[Redirect Script] Attempting to check ${targetUrl}... (Timestamp: ${new Date().toLocaleString()})`);
    try {
        const response = await fetch(targetUrl, { method: 'HEAD', mode: 'no-cors' });

        // If the fetch completes without an error, it's generally considered reachable.
        console.log(`[Redirect Script] Target URL "${targetUrl}" appears to be reachable. Redirecting...`);

        const newTab = window.open(targetUrl, '_blank');

        if (newTab) {
            newTab.focus();
            console.log(`[Redirect Script] Opened new tab and attempted to focus.`);
        } else {
            // This case happens if a pop-up blocker prevents the new tab from opening.
            // Since we want distraction-free, we only log this, no alert.
            console.warn(`[Redirect Script] Could not open new tab for "${targetUrl}". It might be blocked by a pop-up blocker.`);
            // Optional: If you want to force the redirect in the current tab as a fallback
            // window.location.href = targetUrl;
        }

    } catch (error) {
        // If fetch throws an error (e.g., network down, DNS error, host unreachable)
        console.error(`[Redirect Script] Target URL "${targetUrl}" is not reachable. Error:`, error);
        console.log(`[Redirect Script] Retrying in ${retryWaitTime / 1000} seconds...`);

        // Schedule a retry after retryWaitTime
        setTimeout(() => {
            checkAndRedirect(); // Call the function again to retry
        }, retryWaitTime);
    }
}

// Initial wait before the first check
console.log(`[Redirect Script] Waiting ${initialWaitTime / 1000} seconds before initial check...`);
setTimeout(() => {
    checkAndRedirect();
}, initialWaitTime);

