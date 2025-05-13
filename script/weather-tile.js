async function getWeatherWithProbability() {
  const weatherDiv = document.getElementById('weather');
  weatherDiv.innerHTML = 'Loading weather data...';

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 2);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayFormatted = formatDate(today);
  const nextDayFormatted = formatDate(nextDay);

  // Coordinates for Guwahati, Assam, India
  const latitude = 25.8387;
  const longitude = 93.4373;

  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_mean&timezone=Asia%2FKolkata&start_date=${todayFormatted}&end_date=${nextDayFormatted}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.daily && data.daily.time && data.daily.time.length >= 3) {
      let weatherHTML = '';
      const dayNames = ['Today', 'Tomorrow', nextDay.toLocaleDateString('en-US', { weekday: 'long' })];

      for (let i = 0; i < 3; i++) {
        const maxTemp = Math.round(data.daily.temperature_2m_max[i]);
        const minTemp = Math.round(data.daily.temperature_2m_min[i]);
        const avgPrecipitationProbability = data.daily.precipitation_probability_mean[i];

        weatherHTML += `<p><strong><u>${dayNames[i]}</u></strong><br>`;
        weatherHTML += `${maxTemp}°C / ${minTemp}°C<br>`;
        if (avgPrecipitationProbability > 0) {
          weatherHTML += `Rain: <strong> ${avgPrecipitationProbability}% </strong><br>`;
        }
        weatherHTML += `</p>`;
      }

      weatherDiv.innerHTML = weatherHTML;
    } else {
      weatherDiv.innerHTML = 'Failed to retrieve weather data for three days.';
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherDiv.innerHTML = 'An error occurred while fetching weather data.';
  }
}

window.onload = getWeatherWithProbability;
