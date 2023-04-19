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
  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document
    .querySelector("#big-image")
    .setAttribute("src", `media/${response.data.weather[0].icon}.png`);
  document
    .querySelector("#big-image")
    .setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
}

function searchForm(city) {
  let apiKey = "d1a86552de255334f6117b348c4519bd";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(weatherData);
  changeTempSystem();
}

function formInput(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;

  searchForm(city);
}

function handlePosition(position) {
  let units = "metric";
  let apiKey = "d1a86552de255334f6117b348c4519bd";
  let urlData = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(urlData).then(weatherData);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
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

let localDate = new Date();
document.querySelector(".dayMonth").innerHTML = formatDate(localDate);

function timeNow(time) {
  let currentHour = time.getHours();
  let currentMinutes = ("0" + time.getMinutes()).slice(-2);
  let formattedTime = `${currentHour}:${currentMinutes}`;
  return formattedTime;
}

let localTime = new Date();
let currentHourMin = document.querySelector(".localTime");
currentHourMin.innerHTML = timeNow(localTime);

function changeTempSystem() {
  if (temperatureSystemButton.innerHTML == "°C to °F") {
    let changeBigUnit = document.querySelector(".units-big-cel");
    changeBigUnit.innerHTML = "°F";
    let changeTemp = document.querySelector(".currentTemp");
    changeTemp.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
    let changeUnits = document.querySelectorAll(".units-cel");
    changeUnits.forEach((element) => {
      element.innerHTML = "°F";
    });
    let changeSmallTemp = document.querySelectorAll(".small-temp");
    changeSmallTemp.forEach((element) => {
      element.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
    });
    temperatureSystemButton.innerHTML = "°F to °C";
  } else {
    let changeBigUnit = document.querySelector(".units-big-cel");
    changeBigUnit.innerHTML = "°C";
    let changeUnits = document.querySelectorAll(".units-cel");
    changeUnits.forEach((element) => {
      element.innerHTML = "°C";
      let changeSmallTemp = document.querySelectorAll(".small-temp");
      changeSmallTemp.forEach((element) => {
        element.innerHTML = Math.round(celsiusTemperature);
      });
    });
    let changeTemp = document.querySelector(".currentTemp");
    changeTemp.innerHTML = Math.round(celsiusTemperature);
    temperatureSystemButton.innerHTML = "°C to °F";
  }
}

let celsiusTemperature = null;

let temperatureSystemButton = document.querySelector(".temperatureSystem");
temperatureSystemButton.addEventListener("click", changeTempSystem);

searchForm("Warsaw");
