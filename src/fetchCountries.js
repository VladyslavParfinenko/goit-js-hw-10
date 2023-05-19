function fetchCountries(exempleCountry) {
    const URL = 'https://restcountries.com/v3.1/';
    const ENDPOINT = 'name/';
    return fetch(`${URL}${ENDPOINT}${exempleCountry}?fields=name,capital,population,languages,flags`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Request failed');
        }
        return response.json().then(data => {
            console.log(data);
          const { name, capital, population, languages, flags } = data[0];
          return {
            officialName: name.official,
            capital,
            population,
            languages,
            flagSVG: flags.svg
          };
        });
      })
      .catch(error => console.log(error));
  }
  
  export { fetchCountries };
  
  
