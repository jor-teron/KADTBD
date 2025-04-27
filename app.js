document.getElementById('toggle-grid').addEventListener('click', () => {
    const grid = document.querySelector('.grid-container');
    const notifications = document.getElementById('notifications');
    const button = document.getElementById('toggle-grid');
    
    grid.classList.toggle('hidden');
    notifications.classList.toggle('active');
    button.textContent = grid.classList.contains('hidden') ? 'Restore' : 'Minimize';
});

fetch('notifications.json')
    .then(response => response.json())
    .then(json => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        
        const todayMonth = today.getMonth() + 1;
        const todayDate = today.getDate();
        const tomorrowMonth = tomorrow.getMonth() + 1;
        const tomorrowDate = tomorrow.getDate();
        
        const notifications = json.data.filter(row => {
            const month = parseInt(row[0]);
            const date = parseInt(row[1]);
            return (month === todayMonth && date === todayDate) || 
                   (month === tomorrowMonth && date === tomorrowDate);
        });
        
        const notificationDiv = document.getElementById('notifications');
        if (notifications.length > 0) {
            let index = 0;
            const updateNotification = () => {
                const row = notifications[index];
                const icon = row[2] === 'Birthday' ? '🎂' : '🎉';
                notificationDiv.innerHTML = `${icon} ${row[3]}`;
                index = (index + 1) % notifications.length;
            };
            updateNotification();
            if (notifications.length > 1) {
                setInterval(updateNotification, 5000);
            }
        } else {
            notificationDiv.innerHTML = 'Have a great day!';
        }
    });
