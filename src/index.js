'use strict';

import './sass/main.scss';
import fetchCountries from "./js/fetchCountries.js";
import countryTemplate from './partials/countryCard.hbs';
import renderListTemplate from './partials/renderListTemplate.hbs';

import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import { defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import { alert } from '@pnotify/core';
import * as Confirm from "@pnotify/confirm";
import "@pnotify/confirm/dist/PNotifyConfirm.css";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
defaultModules.set(PNotifyMobile, {});

const debounce = require('lodash.debounce');

const input = document.querySelector('.input');
const list = document.querySelector('.list');
const countryContainer = document.querySelector('.country-container');

function onInputChange() {
  countryContainer.innerHTML = '';
  list.innerHTML = '';

  fetchCountries(input.value)
    .then(renderCountries)
    .catch()
    .finally()
}

function renderCountries(countries) {
  if (countries.length > 1 && countries.length <= 10) {
    renderList(countries);
  } else if (countries.length > 10) {
    alert({ text: 'Too many matches found. Please enter a more specific query!' });
  } else {
    renderCountry(countries);
  }
}
  
function renderCountry(country) {
  countryContainer.insertAdjacentHTML('beforeend', countryTemplate(country));
}

function renderList(countries) {
  list.insertAdjacentHTML('beforeend', renderListTemplate(countries));
}
  
input.addEventListener('input', debounce(onInputChange, 500));