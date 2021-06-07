import 'bootstrap';
import './style.scss';

// const cardBkg = document.getElementById('cardBack');
// cardBkg.src = cardBack;

const searchBtn = document.getElementById('search');
const location = document.getElementById('location');
const cityName = document.querySelector('.city-name');

const searchWeather = (e) => {
  e.preventDefault();
  const cityCountry = location.value.trim().split(/\s+/);
  console.log(cityCountry);
  cityName.innerText = cityCountry[0];
};

searchBtn.addEventListener('click', searchWeather);
