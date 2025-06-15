async function fetchWeather() {
    const lat = 25.8387; // Diphu latitude
    const lon = 93.4373; // Diphu longitude
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&timezone=Asia/Kolkata`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Extract today's max and min temperatures and round to nearest whole number
        const maxTemp = Math.round(data.daily.temperature_2m_max[0]);
        const minTemp = Math.round(data.daily.temperature_2m_min[0]);
        
        // Update the temperature div
        document.getElementById('temperature').innerHTML = 
            ` ${maxTemp}°C <br > ${minTemp}°C`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('temperature').innerHTML = 
            'Failed to load temperature data';
    }
}

// Call the function when the page loads
window.onload = fetchWeather;
