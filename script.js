const cityList = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "San Francisco",
  "Charlotte",
  "Indianapolis",
  "Seattle",
  "Denver",
  "Washington",
  "Boston",
  "El Paso",
  "Nashville",
  "Detroit",
  "Oklahoma City",
  "Portland",
  "Las Vegas",
  "Memphis",
  "Louisville",
  "Baltimore"
  // 👉 You can add up to 1000+ cities here
];

const cityInput = document.getElementById("cityInput");
const suggestions = document.getElementById("suggestions");

cityInput.addEventListener("input", () => {
  const input = cityInput.value.toLowerCase();
  suggestions.innerHTML = "";

  if (input.length >= 2) {
    const matchedCities = cityList.filter(city =>
      city.toLowerCase().startsWith(input)
    );

    matchedCities.forEach(city => {
      const li = document.createElement("li");
      li.textContent = city;
      li.addEventListener("click", () => {
        cityInput.value = city;
        suggestions.innerHTML = "";
        fetchAirQuality(city);
      });
      suggestions.appendChild(li);
    });
  }
});

function fetchAirQuality(city) {
  fetch(`https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality?city=${city}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '29319182famsh79992c05fef05dbp1161f2jsnaa44ff3138f4', // <-- Replace with your actual RapidAPI key
      'X-RapidAPI-Host': 'air-quality-by-api-ninjas.p.rapidapi.com'
    }
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById("co").textContent = `CO: ${data.CO.concentration} µg/m³`;
      document.getElementById("no2").textContent = `NO₂: ${data.NO2.concentration} µg/m³`;
      document.getElementById("o3").textContent = `O₃: ${data.O3.concentration} µg/m³`;
      document.getElementById("so2").textContent = `SO₂: ${data.SO2.concentration} µg/m³`;
      document.getElementById("pm25").textContent = `PM2.5: ${data["PM2.5"].concentration} µg/m³`;
      document.getElementById("pm10").textContent = `PM10: ${data.PM10.concentration} µg/m³`;

      const aqi = data.overall_aqi;
      const aqiBox = document.getElementById("aqiBox");
      aqiBox.textContent = `AQI: ${aqi}`;
      aqiBox.style.background = getAQIColor(aqi);
    })
    .catch(err => {
      console.error("Error fetching data: ", err);
      alert("Failed to fetch air quality data. Try another city.");
    });
}

function getAQIColor(aqi) {
  if (aqi <= 50) return "#00e400";      // Good
  if (aqi <= 100) return "#ffff00";     // Moderate
  if (aqi <= 150) return "#ff7e00";     // Unhealthy for Sensitive Groups
  if (aqi <= 200) return "#ff0000";     // Unhealthy
  if (aqi <= 300) return "#8f3f97";     // Very Unhealthy
  return "#7e0023";                     // Hazardous
}

// Developer section toggle
document.getElementById("developerBtn").addEventListener("click", () => {
  document.getElementById("developerInfo").classList.toggle("hidden");
});
















