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
        
        // Create display entries for rotation
        const displayEntries = [];
        json.data.forEach(row => {
            const startMonth = parseInt(row[0]);
            const startDate = parseInt(row[1]);
            const endMonth = row[2] ? parseInt(row[2]) : startMonth;
            const endDate = row[3] ? parseInt(row[3]) : startDate;
            
            // Convert dates to comparable numbers (YYYYMMDD)
            const todayNum = todayMonth * 100 + todayDate;
            const tomorrowNum = tomorrowMonth * 100 + tomorrowDate;
            const startNum = startMonth * 100 + startDate;
            const endNum = endMonth * 100 + endDate;
            
            // Check if today or tomorrow falls within the event range
            if ((todayNum >= startNum && todayNum <= endNum) || 
                (tomorrowNum >= startNum && tomorrowNum <= endNum)) {
                const type = row[4];
                const message = row[5];
                if (type === 'Y') {
                    // Add Happy Birthday for birthdays
                    displayEntries.push({ icon: '🎂', text: 'Happy Birthday' });
                    // Add MESSAGE if non-empty
                    if (message) {
                        displayEntries.push({ icon: '🎉', text: message });
                    }
                } else if (message) {
                    // Add MESSAGE for non-birthday events
                    displayEntries.push({ icon: '🎉', text: message });
                }
            }
        });
        
        const notificationDiv = document.getElementById('notifications');
        if (displayEntries.length > 0) {
            let index = 0;
            const updateNotification = () => {
                const entry = displayEntries[index];
                notificationDiv.innerHTML = `${entry.icon} ${entry.text}`;
                index = (index + 1) % displayEntries.length;
            };
            updateNotification();
            if (displayEntries.length > 1) {
                setInterval(updateNotification, 2000);
            }
        } else {
            notificationDiv.innerHTML = 'Have a great day!';
        }
    });
