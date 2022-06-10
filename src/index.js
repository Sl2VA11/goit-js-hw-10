import { fetchCountries } from './fetchCountries';
const _ = require('lodash');
import './css/styles.css';


const refs = {
   input: document.querySelector('#search-box'),
   countryList: document.querySelector('.country-list'),
   countryInfo: document.querySelector('.country-info'),
}
const DEBOUNCE_DELAY = 300;



refs.input.addEventListener('input',_.debounce( (e) => {
   e.preventDefault()
   if (fetchCountries > 10) {
     alert('too much countries')
   }else if (fetchCountries > 2 && fetchCountries < 10) {
     return createCountryList
   } else {
      return addingCountriesToMarkup
   }
   

   
} , DEBOUNCE_DELAY) )



function createCountryList({ name }, { flags }) {
   refs.countryInfo.classList.add('is-hidden')

   return `
   <li class="country-list__item">
      <img src="${flags.svg}" alt="" class="country-list__img">
      <p class="country-list__text">${name.official}</p>
   </li>
   `
}

function createCountriesMarkup({ name }, { capital }, { population }, { flags }, { languages }) {
  refs.countryInfo.classList.remove('is-hidden')
   return `
      <li class="country-info__item">
        <img src="${flags.svg}" alt="flags" class="country-info__img">
        <p class="country-info__text">Country: ${name.official}</p>
        <p class="country-info__text">Capital: ${capital}</p>
        <p class="country-info__text">Population: ${population}</p>
        <p class="country-info__text">Languages: ${languages}</p>
        
      </li>
   `
}
function addingCountriesToMarkup() {
   refs.countryInfo.insertAdjacentHTML('beforeend', createCountriesMarkup)
}









