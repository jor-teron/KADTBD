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
  const tomorrowFormatted = formatDate(tomorrow);
  const nextDayFormatted = formatDate(nextDay);

  // Corrected coordinates for Guwahati, Assam, India
  const latitude = 25.8387 ;
  const longitude = 93.4373 ;

  // Fetch hourly and daily data for three days (removed precipitation_sum from daily)
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=weathercode,temperature_2m,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Asia%2FKolkata&start_date=${todayFormatted}&end_date=${nextDayFormatted}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.hourly && data.hourly.time && data.daily && data.daily.time && data.daily.time.length >= 3) {
      let weatherHTML = '';
      const dayNames = ['Today', 'Tomorrow', nextDay.toLocaleDateString('en-US', { weekday: 'long' })];

      for (let i = 0; i < 3; i++) {
        const date = new Date(data.daily.time[i]);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        const maxTemp = Math.round(data.daily.temperature_2m_max[i]); // Round max temperature
        const minTemp = Math.round(data.daily.temperature_2m_min[i]); // Round min temperature
        const weatherCode = data.daily.weathercode[i];

        // Filter hourly data for the current day
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setDate(endOfDay.getDate() + 1);
        endOfDay.setHours(0, 0, 0, 0);

        const hourlyProbabilities = data.hourly.time
          .map((t, index) => ({ time: new Date(t), probability: data.hourly.precipitation_probability[index] }))
          .filter(item => item.time >= startOfDay && item.time < endOfDay && item.probability !== undefined && item.probability !== null)
          .map(item => item.probability);

        let maxPrecipitationProbability = 0;
        if (hourlyProbabilities.length > 0) {
          maxPrecipitationProbability = Math.max(...hourlyProbabilities);
        }

        let skyCondition = '';
        switch (weatherCode) {
          case 0:
            skyCondition = 'Clear sky';
            break;
          case 1:
          case 2:
          case 3:
            skyCondition = 'Partly cloudy';
            break;
          case 45:
          case 48:
            skyCondition = 'Fog';
            break;
          case 51:
          case 53:
          case 55:
            skyCondition = 'Drizzle';
            break;
          case 56:
          case 57:
            skyCondition = 'Freezing Drizzle';
            break;
          case 61:
          case 63:
          case 65:
            skyCondition = 'Rain';
            break;
          case 66:
          case 67:
            skyCondition = 'Freezing Rain';
            break;
          case 71:
          case 73:
          case 75:
            skyCondition = 'Snow fall';
            break;
          case 77:
            skyCondition = 'Snow grains';
            break;
          case 80:
          case 81:
          case 82:
            skyCondition = 'Rain showers';
            break;
          case 85:
          case 86:
            skyCondition = 'Snow showers';
            break;
          case 95:
            skyCondition = 'Thunderstorm';
            break;
          case 96:
          case 99:
            skyCondition = 'Thunderstorm + hail';
            break;
          default:
            skyCondition = 'Unknown';
        }

        weatherHTML += `<p><strong><u> ${dayNames[i]} </u></strong> <br>`;
        weatherHTML += ` ${maxTemp}°C / ${minTemp}°C <br>`;
        weatherHTML += `${skyCondition}<br>`;
        if (maxPrecipitationProbability > 0) {
          weatherHTML += `Rain: <strong>${maxPrecipitationProbability}%</strong><br>`;
        }
        weatherHTML += `</p>`;
      }
      weatherDiv.innerHTML = weatherHTML;
    } else {
      weatherDiv.innerHTML = 'Failed to retrieve weather data for three days with probability.';
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherDiv.innerHTML = 'An error occurred while fetching weather data.';
  }
}

// Call the function to fetch and display weather data with probability
window.onload = getWeatherWithProbability;
