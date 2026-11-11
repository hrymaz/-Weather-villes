# 🌤️ Weather App

## 📌 Description

Weather App est une application web qui permet de rechercher une ville et d'afficher ses informations météorologiques actuelles ainsi que les prévisions des 5 prochains jours.

L'application utilise l'API **Open-Meteo** pour récupérer les données météorologiques.

## 🚀 Technologies utilisées

- HTML5
- CSS3
- JavaScript
- Open-Meteo API

## 🌐 API utilisées

### 1. Geocoding API

Cette API permet de rechercher une ville et de récupérer ses coordonnées géographiques (latitude et longitude).

**Endpoint :**

```text
https://geocoding-api.open-meteo.com/v1/search
```

**Paramètres utilisés :**

- `name` : nom de la ville recherchée.
- `count` : nombre de résultats.
- `language` : langue des résultats.
- `format` : format de réponse.

### 2. Forecast API

Cette API permet de récupérer les informations météorologiques à partir des coordonnées géographiques.

**Endpoint :**

```text
https://api.open-meteo.com/v1/forecast
```

**Paramètres utilisés :**

- `latitude` : latitude de la ville.
- `longitude` : longitude de la ville.
- `current` : données météorologiques actuelles.
- `daily` : prévisions météorologiques journalières.
- `timezone` : fuseau horaire.

## 📊 Données récupérées

### Météo actuelle (`current`)

| Propriété | Description |
|---|---|
| `temperature_2m` | Température actuelle en °C |
| `relative_humidity_2m` | Humidité en % |
| `wind_speed_10m` | Vitesse du vent en km/h |

### Prévisions (`daily`)

| Propriété | Description |
|---|---|
| `time` | Date de chaque journée |
| `temperature_2m_max` | Température maximale |
| `temperature_2m_min` | Température minimale |
| `weather_code` | Code représentant l'état du temps |

## 📝 Exemple simplifié de réponse JSON

```json
{
  "latitude": 34.66837,
  "longitude": -1.9434253,
  "timezone": "Africa/Casablanca",
  "current": {
    "temperature_2m": 25.9,
    "relative_humidity_2m": 41,
    "wind_speed_10m": 24.5
  },
  "daily": {
    "time": [
      "2026-11-11",
      "2026-11-12",
      "2026-11-13"
    ],
    "temperature_2m_max": [28, 27, 25],
    "temperature_2m_min": [17, 16, 15],
    "weather_code": [1, 2, 3]
  }
}
```

*Remarque : cet exemple est simplifié et illustratif. Les valeurs peuvent changer selon la ville et la date.*

## 🖥️ Affichage des données

Les données récupérées sont affichées dans l'interface avec JavaScript.

- **Recherche :** l'utilisateur saisit le nom d'une ville.
- **Géolocalisation :** l'application récupère sa latitude et sa longitude grâce à la Geocoding API.
- **Météo actuelle :** affichage de la température, de l'humidité et de la vitesse du vent.
- **Prévisions :** affichage des températures minimales et maximales pour les 5 jours.
- **Icônes météo :** les valeurs de `weather_code` sont associées à des icônes et des descriptions grâce à un objet JavaScript.
- **Dates :** les dates sont formatées avec `Date` et `toLocaleDateString()`.

Les données sont récupérées avec `fetch()`, puis converties en JSON avec `response.json()`.

Les éléments HTML sont créés dynamiquement avec `document.createElement()` et remplis avec `textContent`.

## ⚠️ Limites de l'API

- Une connexion Internet est nécessaire.
- Le nom de la ville doit être reconnu par l'API de géocodage.
- Les prévisions météorologiques sont estimatives et peuvent changer.
- L'utilisation de l'API est soumise aux conditions et aux limites de service d'Open-Meteo.
- L'API peut être temporairement indisponible.

## 👨‍💻 Auteur

**Mohamed Hrymaz** 🇲🇦