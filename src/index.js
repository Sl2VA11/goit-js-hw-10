import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
const _ = require('lodash');
import './css/styles.css';


const refs = {
   input: document.querySelector('#search-box'),
   countryList: document.querySelector('.country-list'),
   countryInfo: document.querySelector('.country-info'),
}

const DEBOUNCE_DELAY = 300;


refs.input.addEventListener('input', _.debounce(inputHandler , DEBOUNCE_DELAY))


const cleanMarkup = ref => (ref.innerHTML = '');


function inputHandler (e){
   e.preventDefault()

   const textInput = e.target.value.trim()
   
   if (!textInput) {
    cleanMarkup(refs.countryInfo);
    cleanMarkup(refs.countryList);
    return;
  }

   fetchCountries(textInput)
      .then(data => {
      console.log(data)
      if (data.length > 10) {
         return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      } 
         
      addCountryMarkup(data)
   })
   .catch(error => {
      cleanMarkup(refs.countryList);
      cleanMarkup(refs.countryInfo);
      Notiflix.Notify.failure("Oops, there is no country with that name")
   })
     
   
}



function addCountryMarkup(data) {
   console.log(data);
   if (data.length === 1) { 
      
      cleanMarkup(refs.countryList);
      refs.countryInfo.innerHTML = makeCountryInfoMarkup(data)
      
     
   } else {
      cleanMarkup(refs.countryInfo);
      refs.countryList.innerHTML = makeCountryListMarkup(data)
      
   } 
  
  
}



function makeCountryListMarkup(data) {
  
   return data.map(
      
    ({ name, flags, }) =>
      `<h1 class = 'country-title'><img src="${flags.png}" alt="${name.official}" width="60" height="40" class = 'country-img'>${
        name.official
      }</h1>
      `
  ).join('')
}

function makeCountryInfoMarkup(data) {
  
   return data.map(
    ({ name, capital, population, flags, languages }) =>
      `<h1 class = 'country-title'><img src="${flags.png}" alt="${name.official}" width="60" height="40" class = 'country-img'>${
        name.official
      }</h1>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>`,
  );
};




















