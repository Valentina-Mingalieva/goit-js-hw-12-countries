import './sass/main.scss';
import fetchCountries from "./js/fetchCountries.js";
import countryTemplate from './partials/countryCard.hbs';

import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import { defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
defaultModules.set(PNotifyMobile, {});
import { alert, error } from '@pnotify/core';

const debounce = require('lodash.debounce');

const input = document.querySelector('.input');
const list = document.querySelector('.list');
const countryContainer = document.querySelector('.country-container')

function onInputChange() {
  countryContainer.innerHTML = '';
  list.innerHTML = '';

  fetchCountries(input.value)
    .then(renderCountries)
    .catch(alert({ text: 'Please enter a country!' }))
    .finally()
}

function renderCountries(countries) {
  if (countries.length > 1 && countries.length <= 10) {
    list.appendChild(countries);
  } else if (countries.length > 10) {
    alert({ text: 'To many matches found. Please enter a more specific query!' });
  } else {
    renderCountry(countries);
  }
}
  
function renderCountry(country) {
  countryContainer.insertAdjacentHTML('beforeend', countryTemplate(country));
}
  
input.addEventListener('input', debounce(onInputChange, 500));