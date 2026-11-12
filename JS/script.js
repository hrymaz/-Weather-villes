const city = document.querySelector('#city')
const search = document.querySelector('#search')
const loading = document.querySelector('#loading')
const icon = document.querySelector('#icon');
const forecast = document.querySelector('#forecast')

const error = document.querySelector('#error-container')
const message = document.querySelector('#error-message')
const button = document.querySelector('#retry-btn')


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

   loading.textContent = "Loading...";
    error.style.display = "none";
    button.disabled = true;
    search.disabled = true;

    console.log(error);
    


    try {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=10&language=en&format=json&countryCode=MA`);
        
     
         if (!res.ok) {
         if (res.status === 429) {
         throw new Error("Quota atteint. Réessayez plus tard.");
          }

         throw new Error("Service météo indisponible.");
         }
 
        const data = await res.json();

        if (!data.results || data.results.length === 0) {
            throw new Error("Ville introuvable");
        }

        const latitude = data.results[0].latitude;
        const longitude = data.results[0].longitude;

        console.log(latitude);
        console.log(longitude);

        const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=5&timezone=auto`);

         if (!weather.ok) {
         if (weather.status === 429) {
         throw new Error("Quota météo atteint. Réessayez plus tard.");
         }

          throw new Error("Impossible de récupérer la météo.");
         }
        const weatherData = await weather.json();
        console.log(weatherData);

        loading.textContent = "";
        document.querySelector('#city-name').textContent = cityName; 
        document.querySelector('#temperature').textContent =
         weatherData.current.temperature_2m + " °C"; 
        document.querySelector('#humidity').textContent =
         "Humidity: " + weatherData.current.relative_humidity_2m + "%"; 
        document.querySelector('#wind').textContent =
         "Wind Speed: " + weatherData.current.wind_speed_10m + " Km/h";
    


        const weatherCode = weatherData.current.weather_code;
        icon.textContent = WEATHER_CODES[weatherCode].icon;
         
        displayForecast(weatherData.daily);

    } catch (err) {
        error.style.display = "block";
        message.textContent = err.message;

    } finally {
        loading.textContent = "";
        button.disabled = false;
        search.disabled = false;
    }
 }
 
 
 function displayForecast(daily) {
     forecast.textContent = "";
     
     for (let i = 0; i < daily.time.length; i++) {
         const card = document.createElement('div')
         const data = document.createElement('h3')
         const temperature =document.createElement('p')
         const iconweather = document.createElement('p')
         
         const weather = WEATHER_CODES[daily.weather_code[i]];
         
         let results = new Date(daily.time[i]);
         
         let text = results.toLocaleDateString("fr-FR", {
             weekday: "long",
             month: "long",
             day: "numeric"
            });
            
            data.textContent = text;
            
            temperature.textContent =
            daily.temperature_2m_max[i] + "°C / " +
            daily.temperature_2m_min[i] + "°C";
            
            if (weather) {
                iconweather.textContent = weather.icon ; 
            } else {
                iconweather.textContent = "N/A"
            }
            card.append(data, iconweather , temperature);
            forecast.append(card);
        }
        
        
    } 
    
    button.addEventListener("click" , searchWeather)
    console.log(button);

    search.addEventListener("click", searchWeather);