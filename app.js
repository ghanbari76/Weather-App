import getWeatherData from "./utils/httpReq.js";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");
const forecastContainer = document.getElementById("forecast");
const locationIcon = document.getElementById("location");


const renderCurrentWeather = (data) => {
    const weatherJsx = `
        <h1>${data.name}, ${data.sys.country}</h1>
        <div id="main">
            <img alt="weather icon" src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" />
            <span>${data.weather[0].main}</span>
            <p>${Math.round(data.main.temp)} °C </p>
        </div>
        <div id="info">
            <p>Humidity : <span>${data.main.humidity} % </span></p>
            <p>Wind Speed : <span>${data.wind.speed} m/s </span></p>
        </div>
    `;

    weatherContainer.innerHTML = weatherJsx;
};

const getWeekDay = (date) => {
  return DAYS[new Date(date * 1000).getDay()];
};

const renderForecastWeather = (data) => {
  forecastContainer.innerHTML = "";
  data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
  data.forEach((item) => {
    const forecastJsx =`
      <div>
        <img alt="weather icon" src="https://openweathermap.org/img/w/${item.weather[0].icon}.png" />
        <h3>${getWeekDay(item.dt)}</h3>
        <p>${Math.round(item.main.temp)} °C </p>
        <span>${item.weather[0].main}</span>
      </div>
    `;
    
    forecastContainer.innerHTML += forecastJsx;
  });
};

const searchHandler = async () => {
    const cityName = searchInput.value;

    if (!cityName) {
        alert("Please enter city name!");
    }
    const currentData = await getWeatherData("current",cityName);
    renderCurrentWeather(currentData);
    const forecastData = await getWeatherData("forecast",cityName);
    renderForecastWeather(forecastData);
};

const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition,showError);
    } else {
     alert("Geolocation is not supported by this browser");
    }
  };
  
  const showPosition =  (position) => {
    const currentData = getWeatherData("current",position.coords);
    renderCurrentWeather(currentData);
    const forecastData = getWeatherData("forecast",position.coords);
    renderForecastWeather(forecastData);
  };

  const showError = (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
       weatherContainer.innerHTML = "User denied the request for Geolocation";
        break;
      case error.POSITION_UNAVAILABLE:
       weatherContainer.innerHTML = "Location information is unavailable";
        break;
      case error.TIMEOUT:
       weatherContainer.innerHTML = "The request to get user location timed out";
        break;
      case error.UNKNOWN_ERROR:
       weatherContainer.innerHTML = "An unknown error occurred";
        break;
    }
  };


searchButton.addEventListener("click",searchHandler);
locationIcon.addEventListener("click",getLocation);