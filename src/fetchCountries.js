export {fetchCountries}

const BASE_URL =  'https://restcountries.com/v3.1/name'

function fetchCountries(name) {
   fetch(`${BASE_URL}/${name}?fields=name,capital,population,flags,languages`)
      .then(response => {
         if (response.status === 404) {
            return alert('ooopppsss i dont know what is it')
         }
         response.json()
      })
      .then()
   
}
