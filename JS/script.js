
const city = document.querySelector('#city')
const search = document.querySelector('#search')

async function searchWeather() {
    const cityName = city.value;
    if (city.value === "") {
         alert("enter a city name");
         return; 
    }
    const cityserch =  await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=10&language=en&format=json&countryCode=MA`)
                    .then((res) => res.json())
                    .then((data) => {  
                       const latitude = data.results[0].latitude;
                       const longitude = data.results[0].longitude;
                        console.log(latitude);
                        console.log(longitude);
                     });
    const marocserch = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`) 
                     .then((results) => results.json())
                     .then((data) => {
                       console.log(data)
                     }) 

    console.log(cityName);
}

search.addEventListener("click", searchWeather);