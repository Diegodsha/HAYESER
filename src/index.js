import 'bootstrap';
import './style.scss';
import searchWeather from './fetch';

const searchBtn = document.getElementById('search');

searchBtn.addEventListener('click', searchWeather);

window.onload = () => {
  alert('Search city and country separated by comma, e.g: Seattle, US');
};
