import moment from 'moment';

const body = document.querySelector('body');
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

const getWeatherData = async (url = '') => {
  const response = await fetch(url);
  const weatherObj = await response.json();
  return weatherObj;
};

const searchWeather = (e) => {
  e.preventDefault();
  const cityCountry = location.value.trim().split(/[ ,]+/);

  if (location.value === '') {
    alertWarning.classList.add('show');
    alertMsg.innerText = 'Cannot search empty city, e.g: Seatle, US';
    cityName.innerText = 'Empty city';
    return;
  }
  getWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${cityCountry[0]},${cityCountry[1]}&appid=b4a9c69d12afbe1ee38ffe1d3953a1c3&units=metric`)
    .then((data) => {
      const formSwitch = document.querySelector('.form-switch');
      cityName.innerText = data.name;
      countryName.innerText = data.sys.country;
      temperature.innerText = `${Math.floor(data.main.temp)}°C`;
      sky.innerText = data.weather['0'].description;
      humidity.innerText = `${data.main.humidity}%`;
      feelsLike.innerText = `${Math.floor(data.main.feels_like)}°C`;
      windSpeed.innerText = `${data.wind.speed} m/s`;
      maxTemp.innerText = `${Math.floor(data.main.temp_max)}°C`;
      visibility.innerText = `${data.visibility / 1000} km`;
      pressure.innerText = `${data.main.pressure}hPa`;

      const changeTemp = () => {
        if (temperature.innerText.includes('C')) {
          feelsLike.innerText = `${
            (Math.floor(data.main.feels_like) * 9) / 5 + 32
          }°F`;
          temperature.innerText = `${
            (Math.floor(data.main.temp) * 9) / 5 + 32
          }°F`;
          maxTemp.innerText = `${
            (Math.floor(data.main.temp_max) * 9) / 5 + 32
          }°F`;
        } else if (temperature.innerText.includes('F')) {
          temperature.innerText = `${Math.floor(data.main.temp)}°C`;
          feelsLike.innerText = `${Math.floor(data.main.feels_like)}°C`;
          maxTemp.innerText = `${Math.floor(data.main.temp_max)}°C`;
        }
      };

      formSwitch.addEventListener('click', changeTemp);

      if (sky.innerText.includes('clouds')) {
        icon.innerHTML = '<i class="fas fa-cloud-sun"></i>';
        body.classList.add('body-clouds');
        body.classList.remove('body-sun');
        body.classList.remove('body-rain');
      } else if (sky.innerText.includes('rain')) {
        icon.innerHTML = '<i class="fas fa-cloud-rain"></i>';
        body.classList.remove('body-clouds');
        body.classList.remove('body-sun');
        body.classList.add('body-rain');
      } else if (sky.innerText.includes('clear')) {
        icon.innerHTML = '<i class="fas fa-sun"></i>';
        body.classList.remove('body-clouds');
        body.classList.add('body-sun');
        body.classList.remove('body-rain');
      }
    })
    .catch(() => {
      alertWarning.classList.add('show');
      cityName.innerText = 'City not found';
      countryName.classList.add('d-none');
    });

  hour.innerText = moment().format('ddd, MMMM D , h:mm a');
  form.reset();
};

export default searchWeather;
