export { fetchCountries };
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const countryCard = document.getElementById('js-info');
const countryList = document.getElementById('js-list');

function fetchCountries(e) {
  if (e.target.value.trim()) {
    let feltchCountry = fetch(
      `https://restcountries.com/v3.1/name/${e.target.value.trim()}?fields=languages,capital,name,flags,population`
    ).then(response => {
      return response.json();
    });
    makeMarkup(feltchCountry);
  } else {
    countryCard.innerHTML = '';
    countryList.innerHTML = '';
  }
}
function makeMarkup(arrayOfCountries) {
  arrayOfCountries
    .then(country => {
      if (country.length > 10) {
        countryCard.innerHTML = '';
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (country.length > 1) {
        countryCard.innerHTML = '';

        let markup = '';
        country.forEach(({ flags, name }) => {
          markup += `<li><img width='40px' src=${flags.png} alt=${flags.alt} /><span></span>${name.common}</li>`;
        });
        countryList.innerHTML = markup;
      } else {
        countryList.innerHTML = '';
        const { flags, name, capital, population, languages } = country[0];
        const lang = Object.values(languages).map(lang => {
          return ` ${lang}`;
        });
        const markup = `<div class='card'>
  <div class='card-body'>
  <img width='40px' src=${flags.png} alt=${flags.alt} />   
    <h2  class='card-name'> ${name.common}</h2>
    <p class='card-info'>Capital: ${capital}</p>
    <p class='card-info'>Population: ${population}</p>
    <p class='card-info'>Languages:${lang}</p>
  </div>

</div>`;
        countryCard.innerHTML = markup;
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}
