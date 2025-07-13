document.addEventListener('DOMContentLoaded', () => {
    // Tile hover effect for preview image
    const tiles = document.querySelectorAll('.tile');
    const previewImage = document.getElementById('preview-image');

    tiles.forEach(tile => {
        tile.addEventListener('mouseenter', () => {
            const imageSrc = tile.getAttribute('data-image');
            previewImage.src = imageSrc || 'placeholder.jpg';
            previewImage.alt = tile.querySelector('a').textContent;
        });

        tile.addEventListener('mouseleave', () => {
            previewImage.src = 'placeholder.jpg';
            previewImage.alt = 'Preview';
        });

        // Add keyboard accessibility
        tile.addEventListener('focus', () => {
            const imageSrc = tile.getAttribute('data-image');
            previewImage.src = imageSrc || 'placeholder.jpg';
            previewImage.alt = tile.querySelector('a').textContent;
        });

        tile.addEventListener('blur', () => {
            previewImage.src = 'placeholder.jpg';
            previewImage.alt = 'Preview';
        });
    });

    // Custom cursor implementation
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Hide custom cursor on touch devices
    document.addEventListener('touchstart', () => {
        cursor.style.display = 'none';
    });
});
