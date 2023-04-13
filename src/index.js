import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
var _ = require('lodash');

const inputEl = document.getElementById('search-box');
const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', _.debounce(fetchCountries, DEBOUNCE_DELAY));
