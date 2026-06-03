// 1. Assign API access token variable path
const apiKey = "466e51f686af49b29621cbd583be121e"; 

// 2. Target UI view components control handles
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');
const errorMessage = document.getElementById('errorMessage');

const cityName = document.getElementById('cityName');
const weatherDescription = document.getElementById('weatherDescription');
const tempDisplay = document.getElementById('tempDisplay');
const humidityDisplay = document.getElementById('humidityDisplay');
const windDisplay = document.getElementById('windDisplay');

// 3. Operational Logic Function network query pipeline execution
async function getWeatherData() {
    const city = cityInput.value.trim();
    
    if (city === "") return;

    // Build unique URL request query route using template literal backticks
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        // Fetch raw response package from openweather remote servers pipeline 
        const response = await fetch(url);

        // If the city was not found or bad server status codes hit
        if (!response.ok) {
            throw new Error("City not found");
        }

        // Convert raw incoming byte values data packets streams arrays straight into JSON
        const data = await response.json();

        // Reveal the hidden layout elements card grid, and clear previous errors
        weatherResult.classList.remove('hidden');
        errorMessage.classList.add('hidden');

        // Extract metrics from the server data object response to update visual strings texts
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        weatherDescription.textContent = data.weather[0].description;
        tempDisplay.textContent = `${Math.round(data.main.temp)}°C`;
        humidityDisplay.textContent = `${data.main.humidity}%`;
        windDisplay.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`; 

    } catch (error) {
        // If data fails to download, hide data container results layout sheet and activate error warnings
        weatherResult.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
}

// 4. Attach trigger click listener onto search button
searchBtn.addEventListener('click', getWeatherData);

// Also triggers matching data updates instantly if users hit keyboard Return/Enter key
cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        getWeatherData();
    }
});