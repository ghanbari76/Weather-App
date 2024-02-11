const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "dae9eb3d2c2c91dada0e72afd4792469";

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");

const searchHandler = (city) => {
    const cityName = searchInput.value;

    if (!cityName) {
        alert("Please enter city name!")
    }
}

searchButton.addEventListener("click",searchHandler)