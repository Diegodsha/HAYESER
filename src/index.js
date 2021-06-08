import 'bootstrap';
import './style.scss';
import { searchWeather } from './fetch';

const searchBtn = document.getElementById('search');

searchBtn.addEventListener('click', searchWeather);
