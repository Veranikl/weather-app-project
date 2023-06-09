function weatherData(response) {
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".localisation").innerHTML =
    response.data.name.toUpperCase();
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#weatherDescNow").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );

  document
    .querySelector("#big-image")
    .setAttribute("src", `media/${response.data.weather[0].icon}.png`);
  document
    .querySelector("#big-image")
    .setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
  feelsLikeTemperature = response.data.main.feels_like;
  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  let apiKey = "0a521eaf234a3a56f45252fac3c737ad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row row-cols-7">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 8 && index > 0) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col dayName">
            ${formatDay(forecastDay.dt)}
            <img
              class="small-image"
              src="media/${forecastDay.weather[0].icon}.png"
              alt=""
              width="40px"
            />
            <p class="forecast-temperature">
              <span class="future-max-temp">${Math.round(
                forecastDay.temp.max
              )}</span
              ><span class="units-cel">°</span>
              <span class="future-min-temp">${Math.round(
                forecastDay.temp.min
              )}</span
              ><span class="units-cel-min">°</span>
            </p>
          </div>
            `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.daily[0].temp.min
  );
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.daily[0].temp.max
  );

  minTodayTemperatureCel = response.data.daily[0].temp.min;
  maxTodayTemperatureCel = response.data.daily[0].temp.max;
}

function searchForm(city) {
  let apiKey = "d1a86552de255334f6117b348c4519bd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(weatherData);
}

function formInput(event) {
  event.preventDefault();
  city = document.querySelector("#search-bar").value;
  searchForm(city);
}

function handlePosition(position) {
  let apiKey = "d1a86552de255334f6117b348c4519bd";
  let urlData = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(urlData).then(weatherData);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function changeTempSystem() {
  if (temperatureSystemButton.innerHTML.includes("°C to °F")) {
    units = "imperial";
    let changeBigUnit = document.querySelector(".units-big-cel");
    changeBigUnit.innerHTML = "°F";
    let changeSpeedSystem = document.querySelector("#speed-system");
    changeSpeedSystem.innerHTML = " mi/h";
    temperatureSystemButton.innerHTML = "°F to °C";
  } else {
    units = "metric";
    let changeBigUnit = document.querySelector(".units-big-cel");
    changeBigUnit.innerHTML = "°C";
    let changeSpeedSystem = document.querySelector("#speed-system");
    changeSpeedSystem.innerHTML = " m/s";
    temperatureSystemButton.innerHTML = "°C to °F";
  }
  let cityInput = document.querySelector("#city-input").innerHTML;
  searchForm(cityInput, units);
}

let getLocationButton = document.querySelector("#buttonLocation");
getLocationButton.addEventListener("click", getPosition);

let formData = document.querySelector("form");
formData.addEventListener("submit", formInput);

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();

  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate} ${currentYear} `;

  return formattedDate;
}

function timeNow(time) {
  let currentHour = time.getHours();
  let currentMinutes = ("0" + time.getMinutes()).slice(-2);
  let formattedTime = `${currentHour}:${currentMinutes}`;
  return formattedTime;
}

let localDate = new Date();
document.querySelector(".dayMonth").innerHTML = formatDate(localDate);

let localTime = new Date();
let currentHourMin = document.querySelector(".localTime");
currentHourMin.innerHTML = timeNow(localTime);

let celsiusTemperature = null;

let temperatureSystemButton = document.querySelector(".temperatureSystem");
temperatureSystemButton.addEventListener("click", changeTempSystem);

let units = "metric";

let city = "Warsaw";

searchForm(city);
displayForecast();
