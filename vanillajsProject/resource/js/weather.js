const API_KEY = "50c7865d1285b2b9b0057e2194bc35dd";

function getGeo(position) {

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    console.log(latitude, longitude);
    fetch(url).then(response => response.json()).then(data => {
        const todayWeather =  document.querySelector('.todayweather');
        const _location =  todayWeather.querySelector('.location');
        const _temperature =  todayWeather.querySelector('.temperature');
        const _weather =  todayWeather.querySelector('.weather');
        const _humidity  =  todayWeather.querySelector('.humidity');

        
        const name = data.name;
        const weather = data.weather[0].main;
        const temp = data.main.temp;
        const humidity = data.main.humidity; 
        
        console.log(humidity);
        _location.textContent = `Location : ${name}`;
        _temperature.textContent = `Temperature : ${temp}`;
        _weather.textContent = `Weather : ${weather}`;
        _humidity.textContent = `Humidity : ${humidity}`;

    });
}

function getGeoErr() {
    alert("Where are you?!");
}

navigator.geolocation.getCurrentPosition(getGeo, getGeoErr);
