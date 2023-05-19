import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function simpleMurkup({ officialName, flagSVG }) {
  countryInfo.insertAdjacentHTML(
    'beforeend',
    `
    <h1><img src=${flagSVG} height='50'>${officialName}</h1>
    
  `
  );
}

function createMarkup({
  officialName,
  capital,
  population,
  languages,
  flagSVG,
}) {
  const languagesHTML = Object.values(languages).join(', ');

  countryInfo.insertAdjacentHTML(
    'beforeend',
    `
      <img src=${flagSVG} height='50'>
      <h1>${officialName}</h1>
      <h2>Capital: ${capital}</h2>
      <h2>Population: ${population}</h2>
      <h2>Languages: ${languagesHTML}</h2>
    `
  );
}

function onSearch(event) {
  const exemplCountry = event.target.value.toLowerCase();

  fetchCountries(exemplCountry)
    .then(data => {
      if (data.length > 10) {
        
        Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
        
      } else if (data.length > 2 && data.length < 10) {
        clearResults();
        const namesAndFlags = data.map(item => {
          const { name, flags } = item;
          return {
            officialName: name.official,
            flagSVG: flags.svg,
          };
        });
        
        countryInfo.innerHTML = '';
        namesAndFlags.forEach(obj => simpleMurkup(obj, countryInfo));
      } else if (data.length === 1) {
        clearResults();
        const { name, capital, population, languages, flags } = data[0];
        const obj = {
          officialName: name.official,
          capital,
          population,
          languages,
          flagSVG: flags.svg,
        };
        countryInfo.innerHTML = '';
        createMarkup(obj, countryInfo);
      }
    })
    .catch(error => console.log(error));
}

function clearResults() {
  countryInfo.innerHTML = '';
}

//   fetchCountries(exemplCountry)
//     .then(data => {

//         createMarkup(data); // Вставка полученных данных в разметку
//     })
//     .catch(error => console.log(error));
// }

//  function murkupSimple(){
//   if (data.length > 2){

//   }
//  };

// console.log(data.length);

// const { name, capital, population, languages, flags } = data[0];
// const countryData = {
//   officialName: name.official,
//   capital,
//   population,
//   languages,
//   flagSVG: flags.svg
// };
// console.log(data);
