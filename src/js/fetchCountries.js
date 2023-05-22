import { Notify } from 'notiflix/build/notiflix-notify-aio';

const URL = 'https://restcountries.com/v3.1/name/';
const URL_OPTIONS = '?fields=name,capital,population,flags,languages,';

export const searchesCountries = name => {
  return fetch(`${URL}${name}${URL_OPTIONS}`).then(response => {
    if (response.status === 404) {
      throw new Error(response.status
        
      );
    }
      return response.json()
  });
};
