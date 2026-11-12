# 🌤️ Weather Villes

## 📌 Présentation du projet

**Weather Villes** est une application web qui permet de rechercher une ville et de consulter ses informations météorologiques.

L'application affiche les conditions météorologiques actuelles ainsi que les prévisions des cinq prochains jours.

Les données météorologiques sont récupérées à partir des API gratuites d'**Open-Meteo**.

## ✨ Fonctionnalités

- Recherche d'une ville par son nom.
- Récupération des coordonnées géographiques de la ville.
- Affichage de la température actuelle en °C.
- Affichage du taux d'humidité en %.
- Affichage de la vitesse du vent en km/h.
- Affichage d'une icône représentant les conditions météorologiques.
- Prévisions météorologiques sur cinq jours.
- Affichage des températures minimales et maximales.
- Formatage des dates en français.
- Indicateur de chargement pendant la récupération des données.
- Vérification des réponses HTTP et gestion des erreurs.

## 🛠️ Technologies utilisées

| Technologie | Utilisation |
|---|---|
| HTML5 | Structure de l'application |
| CSS3 | Mise en forme et design |
| JavaScript | Logique et interaction |
| Fetch API | Récupération des données |
| Async / Await | Gestion des opérations asynchrones |
| DOM Manipulation | Création et modification des éléments HTML |
| Open-Meteo | Fournisseur des données météorologiques |

## 🌐 API utilisées

L'application utilise deux API d'Open-Meteo.

### 1. Geocoding API

Cette API permet de rechercher une ville et de récupérer ses coordonnées géographiques : latitude et longitude.

**Endpoint :**

```text
https://geocoding-api.open-meteo.com/v1/search
```

**Paramètres utilisés :**

| Paramètre | Description |
|---|---|
| `name` | Nom de la ville recherchée |
| `count` | Nombre de résultats souhaités |
| `language` | Langue des résultats |
| `format` | Format de la réponse |
| `countryCode` | Code du pays (MA pour le Maroc) |

**Exemple de requête :**

```text
https://geocoding-api.open-meteo.com/v1/search?name=Oujda&count=10&language=en&format=json&countryCode=MA
```

L'API retourne notamment la latitude et la longitude de la ville recherchée.

### 2. Forecast API

Cette API permet de récupérer les informations météorologiques à partir des coordonnées géographiques.

**Endpoint :**

```text
https://api.open-meteo.com/v1/forecast
```

**Paramètres utilisés :**

| Paramètre | Description |
|---|---|
| `latitude` | Latitude de la ville |
| `longitude` | Longitude de la ville |
| `current` | Conditions météorologiques actuelles |
| `daily` | Prévisions météorologiques journalières |
| `forecast_days` | Nombre de jours de prévision |
| `timezone` | Fuseau horaire |

**Données demandées :**

- `temperature_2m` : température actuelle.
- `relative_humidity_2m` : taux d'humidité.
- `wind_speed_10m` : vitesse du vent.
- `weather_code` : code météorologique.
- `temperature_2m_max` : température maximale.
- `temperature_2m_min` : température minimale.

## 📊 Exemple de réponse JSON

Voici un exemple simplifié des données retournées par l'API Forecast :

```json
{
  "latitude": 34.68,
  "longitude": -1.91,
  "timezone": "Africa/Casablanca",
  "current": {
    "temperature_2m": 25.9,
    "relative_humidity_2m": 41,
    "wind_speed_10m": 24.5,
    "weather_code": 1
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

*Remarque : les données présentées sont illustratives. Les valeurs réelles dépendent de la ville et de la date.*

## ⚙️ Fonctionnement de l'application

Le fonctionnement se déroule en plusieurs étapes :

**1. Recherche de la ville**

L'utilisateur saisit le nom d'une ville dans le champ de recherche.

**2. Récupération des coordonnées**

La Geocoding API recherche la ville et retourne sa latitude et sa longitude.

**3. Récupération des données météorologiques**

La Forecast API utilise les coordonnées pour récupérer les conditions actuelles et les prévisions sur cinq jours.

**4. Affichage des résultats**

JavaScript récupère les données JSON et les affiche dans la page grâce à la manipulation du DOM.

Les prévisions sont générées dynamiquement avec `document.createElement()`, `textContent` et `append()`.

**5. Gestion des codes météorologiques**

Un objet JavaScript `WEATHER_CODES` associe chaque code météorologique à une description et une icône correspondante.

**6. Formatage des dates**

La méthode `toLocaleDateString()` permet d'afficher les dates en français.

## ⚠️ Gestion des erreurs et limites

L'application vérifie les réponses HTTP avec la propriété `response.ok`.

Les erreurs possibles comprennent :

- Champ de recherche vide.
- Ville introuvable.
- Erreur de réponse HTTP.
- Problème de connexion Internet.
- Indisponibilité temporaire de l'API.

**Limites du projet :**

- Une connexion Internet est nécessaire.
- La recherche est limitée au Maroc avec le paramètre `countryCode=MA`.
- Les prévisions météorologiques sont estimatives.
- Les données dépendent de la disponibilité du service Open-Meteo.
- Les informations météorologiques peuvent changer.

## 📁 Structure du projet

```text
Weather-villes/
│
├── HTML/
│   └── index.html
│
├── CSS/
│   └── style.css
│
├── JS/
│   └── script.js
│
└── README.md
```

## 🚀 Installation et lancement

**1. Cloner le projet**

```bash
git clone https://github.com/hrymaz/-Weather-villes.git
```

**2. Ouvrir le dossier**

```bash
cd -Weather-villes
```

**3. Lancer l'application**

Ouvrir `HTML/index.html` avec l'extension Live Server de Visual Studio Code.

L'application s'ouvre ensuite dans le navigateur.

## 🔗 Liens du projet

- **GitHub :** https://github.com/hrymaz/-Weather-villes

## 👨‍💻 Auteur

**Mohamed Hrymaz** 🇲🇦

Projet réalisé dans le cadre de l'apprentissage du développement web et de JavaScript.
