async function getWeatherForecast() {
    const citySelect = document.getElementById('city');
    const city = citySelect.value;
    if (!city) {
        alert("Please select a city.");
        return;
    }
    const [lat, lon] = city.split(',');

    const url = `http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civil&output=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        displayForecast(data.dataseries);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = ''; // Clear previous forecast

    data.slice(0, 7).forEach(dayData => {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.innerHTML = `
            <h3>${new Date(dayData.date).toDateString()}</h3>
            <p>Weather: ${dayData.weather}</p>
            <p>Temp: ${dayData.temp2m.min} - ${dayData.temp2m.max} °C</p>
        `;
        forecastContainer.appendChild(dayElement);
    });
}
