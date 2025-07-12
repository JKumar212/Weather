const cityInput = document.getElementById("cityInput");
const suggestions = document.getElementById("suggestions");

let timeout = null;

cityInput.addEventListener("input", () => {
  clearTimeout(timeout);
  const query = cityInput.value.trim();
  if (query.length >= 2) {
    timeout = setTimeout(() => {
      fetch(`https://api.api-ninjas.com/v1/city?name=${query}`, {
        headers: {
          "X-Api-Key": "29319182famsh79992c05fef05dbp1161f2jsnaa44ff3138f4"
        }
      })
        .then(res => res.json())
        .then(data => {
          suggestions.innerHTML = "";
          data.forEach(city => {
            const li = document.createElement("li");
            li.textContent = city.name;
            li.addEventListener("click", () => {
              cityInput.value = city.name;
              suggestions.innerHTML = "";
              fetchAirQuality(city.name);
            });
            suggestions.appendChild(li);
          });
        });
    }, 300);
  } else {
    suggestions.innerHTML = "";
  }
});

function fetchAirQuality(city) {
  fetch(`https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality?city=${city}`, {
    method: 'GET' ,
    headers: {
      "X-Api-Key": "29319182famsh79992c05fef05dbp1161f2jsnaa44ff3138f4"
      'x-RapidAPI-Host' : ' air-quality-by-api-ninjas.p.rapidapi.com'
    }
  })
    .then(res => res.json())
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
    });
}

function getAQIColor(aqi) {
  if (aqi <= 50) return "#00e400";      // Good (Green)
  if (aqi <= 100) return "#ffff00";     // Moderate (Yellow)
  if (aqi <= 150) return "#ff7e00";     // Unhealthy for Sensitive Groups (Orange)
  if (aqi <= 200) return "#ff0000";     // Unhealthy (Red)
  if (aqi <= 300) return "#8f3f97";     // Very Unhealthy (Purple)
  return "#7e0023";                     // Hazardous (Maroon)
}

document.getElementById("developerBtn").addEventListener("click", () => {
  document.getElementById("developerInfo").classList.toggle("hidden");
});
