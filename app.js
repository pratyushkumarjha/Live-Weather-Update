const apiKey = "e76bb5be74c57aee6d4b0ccde390f6a2";
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');

var weatherIcon = document.querySelector('.weather-icon');
var cityElement = document.querySelector('.city');
var tempElement = document.querySelector('.temp');
var humidityElement = document.querySelector('.humidity');
var windElement = document.querySelector('.wind');
var weatherDetails = document.querySelector('.weather-details'); // This is the wrapper for all weather details

// Ensure the weather details are hidden initially
weatherDetails.style.display = 'none';
const weatherCondition = document.querySelector('.weather-condition');

async function checkWeather(city) {
    if (!city) {
        // If the search box is empty, hide all weather details
        weatherDetails.style.display = 'none';
        return;
    }
    
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    // If the city is found, show the weather details
    if (data.cod === 200) {
        weatherDetails.style.display = 'block'; // Show weather details if data is valid

        // Display the weather information
        cityElement.innerHTML = data.name;
        tempElement.innerHTML = Math.round(data.main.temp) + '°C';
        humidityElement.innerHTML = data.main.humidity + '%';
        windElement.innerHTML = data.wind.speed + ' km/h';

        // Set the appropriate weather icon based on weather conditions
        if (data.weather[0].main === 'Clouds') {
            weatherIcon.src = 'assets/img/cloudy-forecast-svgrepo-com.svg';
            weatherCondition.innerText = "Clouds";
        } else if (data.weather[0].main === 'Clear') {
            weatherIcon.src = 'assets/img/sun-svgrepo-com.svg';
            weatherCondition.innerText = "Clear";
        } else if (data.weather[0].main === 'Rain') {
            weatherIcon.src = 'assets/img/rain-svgrepo-com (2).svg';
            weatherCondition.innerText = "Rain";
        } else if (data.weather[0].main === 'Drizzle') {
            weatherIcon.src = 'assets/img/cloud-drizzle-svgrepo-com.svg';
            weatherCondition.innerText = "Drizzle";
        } else if (data.weather[0].main === 'Mist') {
            weatherIcon.src = 'assets/img/mist-svgrepo-com.svg';
            weatherCondition.innerText = "Mist";
        } else if (data.weather[0].main === 'Snow') {
            weatherIcon.src = 'assets/img/snowing-forecast-svgrepo-com.svg';
            weatherCondition.innerText = "Snow";
        }
    } else {
        // Handle case if the city is not found
        weatherDetails.style.display = 'none';
        alert("City not found!");
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});

// Optionally, you can add a listener to handle the Enter key
searchBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkWeather(searchBox.value);
    }
});
