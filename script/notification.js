/*
H -> Holiday
R -> restricted holiday
B -> Birthday
S -> Sunrise
D -> (No day)
SS -> Sunday
2nd -> 2nd Saturday
4th -> 4th saturday
*/

const notificationFolder = 'notification/';
const notificationFiles = [
    'birthday.json',
    'holiday.json',
    'sunday-saturday.json',
    'DAY.json',
    'misc.json',
    'office.json',
    'sun.json'
];

const fetchPromises = notificationFiles.map(file =>
    fetch(notificationFolder + file).then(response => response.json())
);

Promise.allSettled(fetchPromises)
    .then(results => {
        let allNotificationsData = [];

        results.forEach((result, index) => {
            const fileName = notificationFiles[index];
            if (result.status === 'fulfilled' && result.value && result.value.data) {
                allNotificationsData.push(...result.value.data);
            } else if (result.reason) {
                console.warn(`Error fetching ${fileName} (continuing without it):`, result.reason);
            }
        });

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
        allNotificationsData.forEach(row => {
            const startMonth = parseInt(row[0]);
            const startDate = parseInt(row[1]);
            const endMonth = row[2] ? parseInt(row[2]) : startMonth;
            const endDate = row[3] ? parseInt(row[3]) : startDate;
            const timeout = row[6] ? parseFloat(row[6]) : 6; // Default to 6 seconds if TIMEOUT is missing or invalid

            // Validate timeout: must be a positive number
            const timeoutMs = (!isNaN(timeout) && timeout > 0) ? timeout * 1000 : 6000;

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
                if (isToday && type !== 'D' && type !== 'S') {
                    dateContext = '<br />(Today)';
                } else if (isTomorrow && type !== 'D' && type !== 'S') {
                    dateContext = '<br />(Tomorrow)';
                } else if (isDayAfterTomorrow && type !== 'D' && type !== 'S') {
                    dateContext = '<br />(in 2 days)';
                }
                let notificationText = message ? `${message} ${dateContext}` : '';
                let textColor = 'white';
                let display = true;

                if (type === 'B') {
                    notificationText = `Happy B'day ${message} ! ${dateContext}`;
                    textColor = '#E96316';
                } else if (type === 'H') {
                    textColor = '#0DC143';
                } else if (type === 'R') {
                    textColor = '#AFE1AF';
                } else if (type === 'D') {
                    notificationText = message || '';
                } else if (type === 'S') {
                    notificationText = message ? `<span id="line2"> sunrise - noon - sunset <hr /> ${message} </span>` : '';
                } else if (!message) {
                    display = false;
                }

                if (display) {
                    displayEntries.push({
                        text: notificationText,
                        isToday,
                        isTomorrow,
                        isDayAfterTomorrow,
                        dateContext,
                        textColor,
                        timeout: timeoutMs // Store timeout in milliseconds
                    });
                }
            }
        });

        const notificationDiv = document.getElementById('notification');
        if (displayEntries.length > 0) {
            let index = 0;
            let intervalId = null;

            const updateNotification = () => {
                const entry = displayEntries[index];
                notificationDiv.innerHTML = `${entry.text}`;
                notificationDiv.style.color = entry.textColor;

                // Clear existing interval (if any) to reset timing
                if (intervalId !== null) {
                    clearInterval(intervalId);
                }

                // Set new interval based on current entry's timeout
                if (displayEntries.length > 1) {
                    intervalId = setInterval(() => {
                        index = (index + 1) % displayEntries.length;
                        updateNotification();
                    }, entry.timeout);
                }
            };

            updateNotification();
        } else {
            notificationDiv.innerHTML = 'Have a great day !';
            notificationDiv.style.color = 'olive';
        }
    })
    .catch(error => {
        console.error('Error processing notifications:', error);
        document.getElementById('notification').innerHTML = 'Failed to load notifications.';
    });
