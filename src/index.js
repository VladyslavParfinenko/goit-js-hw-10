import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;


const input = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input',onSearch);






      
function createMarkup({ officialName, capital, population, languages, flagSVG }) {
    const languagesHTML = Object.values(languages).join(', ');
  
    countryInfo.insertAdjacentHTML('beforeend', `
      <img src=${flagSVG} height='50'>
      <h1>${officialName}</h1>
      <h2>Capital: ${capital}</h2>
      <h2>Population: ${population}</h2>
      <h2>Languages: ${languagesHTML}</h2>
    `);
  }
  

  
function onSearch(event) {
    const exemplCountry = event.target.value.toLowerCase();
    fetchCountries(exemplCountry)
      .then(data => {
        createMarkup(data); // Вставка полученных данных в разметку
      })
      .catch(error => console.log(error));
  }

 







