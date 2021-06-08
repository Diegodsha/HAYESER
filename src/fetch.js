const moment = require('moment');

const form = document.getElementById('form');
const alertWarning = document.querySelector('.alert-warning');
const alertMsg = document.querySelector('.alert-msg');
const location = document.getElementById('location');
const cityName = document.querySelector('.city-name-text');
const countryName = document.querySelector('.country-name');
const hour = document.querySelector('.hour');
const temperature = document.querySelector('.temperature-text');
const sky = document.querySelector('.sky');
const humidity = document.querySelector('.humidity-percentage');
const feelsLike = document.querySelector('.feels-like-deg');
const windSpeed = document.querySelector('.wind-speed-text');
const maxTemp = document.querySelector('.max-temp-text');
const visibility = document.querySelector('.visibility-text');
const pressure = document.querySelector('.hpa-text');
const icon = document.querySelector('.weather-icon');

async function getWeatherData(url = '') {
  const response = await fetch(url);
  const weatherObj = await response.json();
  return weatherObj;
}

const searchWeather = (e) => {
  e.preventDefault();
  const cityCountry = location.value.trim().split(/[ ,]+/);

  if (location.value === '') {
    alertWarning.classList.add('show');
    alertMsg.innerText = 'Cannot search empty city, e.g: Seatle, US';
    cityName.innerText = 'Empty city';
    return;
  }
  getWeatherData(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityCountry[0]},${cityCountry[1]}&appid=b4a9c69d12afbe1ee38ffe1d3953a1c3&units=metric`
  )
    .then((data) => {
      cityName.innerText = data.name;
      countryName.innerText = data.sys.country;
      temperature.innerText = `${Math.floor(data.main.temp)}°C`;
      sky.innerText = data.weather['0'].description;
      humidity.innerText = `${data.main.humidity}%`;
      feelsLike.innerText = `${Math.floor(data.main.feels_like)}°C`;
      windSpeed.innerText = `${data.wind.speed} m/s`;
      maxTemp.innerText = `${data.main.temp_max}°C`;
      visibility.innerText = `${data.visibility / 1000} km`;
      pressure.innerText = `${data.main.pressure}hPa`;

      if (sky.innerText.includes('clouds')) {
        icon.innerHTML = '<i class="fas fa-cloud-sun"></i>';
      } else if (sky.innerText.includes('rain')) {
        icon.innerHTML = '<i class="fas fa-cloud-rain"></i>';
      } else if (sky.innerText.includes('clear')) {
        icon.innerHTML = '<i class="fas fa-sun"></i>';
      }
    })
    .catch((err) => {
      console.log(err, 'failure-check-your-code');
      alertWarning.classList.add('show');
      cityName.innerText = 'City not found';
      countryName.classList.add('d-none');
    });

  hour.innerText = moment().format('ddd, MMMM D , h:mm a');
  form.reset();
};

export default searchWeather;
