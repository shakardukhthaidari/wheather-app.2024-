function refreshWeather(response) {
  let cityE = document.querySelector('#h1');
  let weatherE = document.querySelector('#weather');
  let weather = Math.round(response.data.temperature.current);
  let iconE = document.querySelector('#icon-img');
  let dateE = document.querySelector('#date');
  let rainE = document.querySelector('#rain');
  let humidityE = document.querySelector('#humidity');
  let windE = document.querySelector('#wind'); 
  let date = new Date(response.data.time * 1000);

  iconE.innerHTML = `<img src="${response.data.condition.icon_url}" id="icon-img" alt="weather icon">`; // Added alt attribute
  console.log(response.data.condition.icon_url);
  cityE.innerHTML = response.data.city;
  weatherE.innerHTML = `${weather}`;
  
  dateE.innerHTML = formatDate(date);
  rainE.innerHTML = `${response.data.condition.description}`;
  humidityE.innerHTML = `Humidity : ${response.data.temperature.humidity}%`;
  windE.innerHTML = `Wind :  ${response.data.wind.speed}km/h`;

  getForecast(response.data.city);
}

function formatDate(now) {
  let shapingdate = (time) => (time < 10 ? `0${time}` : time);

  let hour = shapingdate(now.getHours());
  let minut = shapingdate(now.getMinutes());
  let day = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  let days = day[now.getDay()];

  return `${days} ${hour}:${minut}`;
}

function searchCity(city) {
  let apiKey = `b2a5adcct04b33178913oc335f405433`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric&lang`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault(); // Corrected the typo in 'preventDefault'
  let searchinput = document.querySelector('#search').value;
  searchCity(searchinput);
}

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()]; // Corrected the method to get the day of the week
}

function getForecast(city) {
  let apiKey = `b2a5adcct04b33178913oc335f405433`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric&lang`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = '';
  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHtml += `<div class="day ${formatDay(day.time).toLowerCase()}">`; // Dynamically added class based on the day
      forecastHtml += `<span id="${formatDay(day.time).toLowerCase()}">${formatDay(day.time)}</span><br>`;
      forecastHtml += `<img src="${day.condition.icon_url}" alt="weather icon" id="${formatDay(day.time).toLowerCase()}-icon"><br>`;
      forecastHtml += `<span id="${formatDay(day.time).toLowerCase()}-fWeather"><strong>${Math.round(day.temperature.maximum)}</strong>°/</span>`;
      forecastHtml += `<span id="${formatDay(day.time).toLowerCase()}-minimum"><small>${Math.round(day.temperature.minimum)}°</small></span>`
      forecastHtml += `</div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("kabul");