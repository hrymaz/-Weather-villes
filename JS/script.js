const city = document.querySelector('#city')
const search = document.querySelector('#search')
const loading = document.querySelector('#loading')
const forecast = document.querySelector('#forecast');

const WEATHER_CODES = {
    0: { label: "Ciel dégagé", icon: "☀️" },
    1: { label: "Plutôt dégagé", icon: "🌤️" },
    2: { label: "Partiellement nuageux", icon: "⛅" },
    3: { label: "Couvert", icon: "☁️" },
    45: { label: "Brouillard", icon: "🌫️" },
    48: { label: "Brouillard givrant", icon: "🌫️" },
    51: { label: "Bruine légère", icon: "🌦️" },
    53: { label: "Bruine", icon: "🌦️" },
    55: { label: "Bruine forte", icon: "🌦️" },
    61: { label: "Pluie légère", icon: "🌧️" },
    63: { label: "Pluie", icon: "🌧️" },
    65: { label: "Pluie forte", icon: "🌧️" },
    71: { label: "Neige légère", icon: "🌨️" },
    73: { label: "Neige", icon: "🌨️" },
    75: { label: "Neige forte", icon: "❄️" },
    80: { label: "Averses légères", icon: "🌦️" },
    81: { label: "Averses", icon: "🌧️" },
    82: { label: "Averses violentes", icon: "⛈️" },
    95: { label: "Orage", icon: "⛈️" },
    96: { label: "Orage avec grêle", icon: "⛈️" },
    99: { label: "Orage avec forte grêle", icon: "⛈️" }
};

async function searchWeather() {
    const cityName = city.value;

    if (city.value === "") {
        alert("enter a city name");
        return;
    }

    loading.textContent = "Loading..."

    const cityserch = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=10&language=en&format=json&countryCode=MA`)
        .then((res) => res.json())
        .then((data) => {
            const latitude = data.results[0].latitude;
            const longitude = data.results[0].longitude;

            console.log(latitude);
            console.log(longitude);

            return { latitude, longitude };
        });

    const latitude = cityserch.latitude;
    const longitude = cityserch.longitude;

const marocserch = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=5&timezone=auto`)
    .then((results) => results.json())
    .then((data) => {
       

        loading.textContent = "";
    },2000);

}
 



search.addEventListener("click", searchWeather);