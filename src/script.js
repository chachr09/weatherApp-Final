function formatDate() {
  let days = [`Sun`, `Mon`, `Tues`, `Wed`, `Thur`, `Fri`, `Sat`];

  let months = [
    `Jan`,
    `Feb`,
    `Mar`,
    `Apr`,
    `May`,
    `Jun`,
    `Jul`,
    `Aug`,
    `Sep`,
    `Oct`,
    `Nov`,
    `Dec`
  ];

  let currentTime = new Date();
  let currentDay = days[currentTime.getDay()];
  let currentMonth = months[currentTime.getMonth()];
  let currentHours = currentTime.getHours();
  let currentMinutes = currentTime.getMinutes();
  let currentDate = currentTime.getDate();

  let h5 = document.querySelector(`h5`);
  h5.innerHTML = `${currentHours}:${currentMinutes}`;
  let h6 = document.querySelector(`h6`);
  h6.innerHTML = `${currentDay}. ${currentMonth}/${currentDate}`;

  let formattedDate = `${currentHours}:${currentMinutes} ${currentDay}. ${currentMonth} ${currentDate}`;
  console.log(formattedDate);

  return formattedDate;
}
console.log(formatDate());

function displayWeatherConditions(response) {
  console.log(response.data);

  document.querySelector(`#forecast-description`).innerHTML =
    response.data.weather[0].description;
  document.querySelector(`#current-degreeHi`).innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(`#current-degreeLow`).innerHTML = Math.round(
    response.data.main.temp_min
  );

  document.querySelector(`#weather-icon`).innerHTML =
    response.data.weather.icon;
  document.querySelector(`#city`).innerHTML = response.data.name;
  document.querySelector(`#country`).innerHTML = response.data.sys.country;
  document.querySelector(`#wind`).innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(`#sunrise`).innerHTML = Math.round(
    response.data.sys.sunrise
  );
  document.querySelector(`#sunset`).innerHTML = Math.round(
    response.data.sys.sunset
  );
}

function search(city) {
  let units = `metric`;
  let apiKey = `20e1dda3ee52411912adb300097a5c3f`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(`#search-city-input`).value;
  search(city);
}

search(`New York`);


function showLocation(position) {
  let units = `metric`;
  let apiKey = `20e1dda3ee52411912adb300097a5c3f`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherConditions);
}
function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let button = document.querySelector(`#current-location`);
button.addEventListener(`click`, getCurrentPosition);

let searchForm = document.querySelector("#search-weather");
searchForm.addEventListener("submit", handleSubmit);
