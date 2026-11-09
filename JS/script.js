const city = document.querySelector('#city')
const search = document.querySelector('#search')
const loading = document.querySelector('#loading')

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

    const marocserch = fetch(`https://api.open-meteo.com/v1/forecast?latitude=34.68139&longitude=-1.90858&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`)
        .then((results) => results.json())
        .then((data) => {
            console.log(data);
            loading.textContent = "";
        }, 2000);

    console.log(cityName);
}

search.addEventListener("click", searchWeather);