const textarea = document.querySelector('.notepad-textarea');
const saveButton = document.querySelector('.notepad-save');
const clearButton = document.querySelector('.notepad-clear');

textarea.value = localStorage.getItem('notepad-text') || '';

saveButton.addEventListener('click', () => {
  localStorage.setItem('notepad-text', textarea.value);
});

clearButton.addEventListener('click', () => {
  textarea.value = '';
  localStorage.removeItem('notepad-text');
});

// Enable drag-and-drop for File Sharing integration
textarea.addEventListener('dragstart', (e) => {
  if (textarea.value) {
    e.dataTransfer.setData('text/plain', textarea.value);
  }
});
