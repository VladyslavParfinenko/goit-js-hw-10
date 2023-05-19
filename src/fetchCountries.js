function fetchCountries(exempleCountry) {
  const URL = 'https://restcountries.com/v3.1/';
  const ENDPOINT = 'name/';
  return fetch(`${URL}${ENDPOINT}${exempleCountry}?fields=name,capital,population,languages,flags`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Request failed');
      }
      return response.json();
    });
}

  
  export { fetchCountries };
  
  
