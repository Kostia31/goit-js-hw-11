import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { searchesCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  search: document.querySelector('#search-box'),
  countryInfo: document.querySelector('.country-info'),
  countryList: document.querySelector('.country-list'),
};

refs.search.addEventListener('input', debounce(setCauntries, DEBOUNCE_DELAY));

function setCauntries(evt) {
  const searchCountries = evt.target.value.trim();
  if (!searchCountries) {
        isHiddenElements();
        return;
      }
  searchesCountries(searchCountries)
    .then(data => {
      

      if (data.length <= 10) {
        refs.countryList.classList.remove('is-hidden');
        refs.countryInfo.classList.add('is-hidden');
        createCountriesList(data);
      }

      if (data.length === 1) {
        refs.countryInfo.classList.remove('is-hidden');
        refs.countryList.classList.add('is-hidden');
        createCountriesBox(data);
      }

      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(error => {
      isHiddenElements();
      Notify.failure('Oops, there is no country with that name');
    });
}

function createCountriesList(countries) {
  const allCountries = [];
  countries.map(({ name: { official, common }, flags: { svg } }) => {
    const counter = `<li>
        <img src="${svg}" alt="${common}" width="50">
        <span>${official}</span>
      </li>`;
    allCountries.push(counter);
  });
  refs.countryList.innerHTML = allCountries.join('');
}

function createCountriesBox(counter) {
  refs.countryList.innerHTML = '';
  const country = [];
  counter.map(
    ({
      flags: { svg },
      name: { official, common },
      population,
      languages,
      capital,
    }) => {
      const speaking = Object.values(languages);
      const searchCounter = `<img src="${svg}" alt="${common}" width="260" height="auto">
            <h2> ${official}</h2>
            <h3>Capital: <p> ${capital}</p></h3>
            <h3>Population: <p> ${population}</p></h3>
            <h3>Languages: <p> ${speaking}</p></h3>`;
      country.push(searchCounter);
    }
  );
  refs.countryInfo.innerHTML = country.join('');
}

function isHiddenElements() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
  refs.countryInfo.classList.add('is-hidden');
  refs.countryList.classList.add('is-hidden');
}
