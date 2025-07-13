// sticky-note.js

document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('note-content');
    const localStorageKey = 'stickyNoteContent'; // Key for local storage

    // Check if the textarea element was found
    if (!textarea) {
        console.error('Error: Textarea with ID "note-content" not found!');
        return; // Stop script execution if element is missing
    } else {
        console.log('Textarea element found successfully.');
    }

    // Function to save the note content to local storage
    function saveNote() {
        try {
            localStorage.setItem(localStorageKey, textarea.value);
            console.log('Note saved to local storage!');
        } catch (e) {
            console.error('Error saving to local storage:', e);
            // This might happen if storage is full or disabled
        }
    }

    // Load saved note from local storage when the page loads
    try {
        const savedContent = localStorage.getItem(localStorageKey);
        if (savedContent !== null) { // Check for null explicitly
            textarea.value = savedContent;
            console.log('Loaded note from local storage.');
        } else {
            console.log('No saved note found in local storage.');
        }
    } catch (e) {
        console.error('Error loading from local storage:', e);
    }

    // Set up auto-save every 10 seconds
    setInterval(saveNote, 10000); // 10000 milliseconds = 10 seconds

    // Optional: Save immediately when user types (in addition to interval)
    textarea.addEventListener('input', saveNote);
});
