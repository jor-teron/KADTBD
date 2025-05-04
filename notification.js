const localNotificationsUrl = 'notifications.json'; // Adjust the path as needed

fetch(localNotificationsUrl)
    .then(response => response.json())
    .then(json => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const dayAfterTomorrow = new Date(today);
        dayAfterTomorrow.setDate(today.getDate() + 2);

        const todayMonth = today.getMonth() + 1;
        const todayDate = today.getDate();
        const tomorrowMonth = tomorrow.getMonth() + 1;
        const tomorrowDate = tomorrow.getDate();
        const dayAfterTomorrowMonth = dayAfterTomorrow.getMonth() + 1;
        const dayAfterTomorrowDate = dayAfterTomorrow.getDate();

        const displayEntries = [];
        json.data.forEach(row => {
            const startMonth = parseInt(row[0]);
            const startDate = parseInt(row[1]);
            const endMonth = row[2] ? parseInt(row[2]) : startMonth;
            const endDate = row[3] ? parseInt(row[3]) : startDate;

            const todayNum = todayMonth * 100 + todayDate;
            const tomorrowNum = tomorrowMonth * 100 + tomorrowDate;
            const dayAfterTomorrowNum = dayAfterTomorrowMonth * 100 + dayAfterTomorrowDate;
            const startNum = startMonth * 100 + startDate;
            const endNum = endMonth * 100 + endDate;

            const isToday = todayNum >= startNum && todayNum <= endNum;
            const isTomorrow = tomorrowNum >= startNum && tomorrowNum <= endNum;
            const isDayAfterTomorrow = dayAfterTomorrowNum >= startNum && dayAfterTomorrowNum <= endNum;

            if (isToday || isTomorrow || isDayAfterTomorrow) {
                const type = row[4];
                const message = row[5];
                let dateContext = '';
                if (isToday && type !== 'D') {
                    dateContext = '(Today)';
                } else if (isTomorrow && type !== 'D') {
                    dateContext = '(Tomorrow)';
                } else if (isDayAfterTomorrow && type !== 'D') {
                    dateContext = '(in 2 days)';
                }
                let notificationText = message ? `${message} ${dateContext}` : '';
                let textColor = 'white';
                let display = true; // Flag to control if an entry is added

                if (type === 'Y') {
                    notificationText = `Happy Birthday ${message} ${dateContext}`;
                    textColor = '#E96316';
                } else if (type === 'H') {
                    textColor = '#0DC143';
                } else if (type === 'R') { // Changed from 'HH' to 'R'
                    textColor = '#AFE1AF';
                } else if (type === 'D') {
                    notificationText = message || ''; // Display just the message, no date context
                } else if (!message) {
                    display = false; // Don't display if no message and not a special type
                }

                if (display) {
                    displayEntries.push({
                        text: notificationText,
                        isToday,
                        isTomorrow,
                        isDayAfterTomorrow,
                        dateContext,
                        textColor
                    });
                }
            }
        });

        const notificationDiv = document.getElementById('notifications');
        if (displayEntries.length > 0) {
            let index = 0;
            const updateNotification = () => {
                const entry = displayEntries[index];
                notificationDiv.innerHTML = `${entry.text}`;
                notificationDiv.style.color = entry.textColor;
                index = (index + 1) % displayEntries.length;
            };
            updateNotification();
            if (displayEntries.length > 1) {
                setInterval(updateNotification, 2000);
            }
        } else {
            notificationDiv.innerHTML = 'Have a great day!';
            notificationDiv.style.color = '';
        }
    })
    .catch(error => {
        console.error('Error fetching notifications:', error);
        document.getElementById('notifications').innerHTML = 'Failed to load notifications.';
    });
