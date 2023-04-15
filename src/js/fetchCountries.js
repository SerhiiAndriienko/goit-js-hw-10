export { fetchCountries };
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const countryCard = document.getElementById('js-info');
const countryList = document.getElementById('js-list');
const inputEl = document.getElementById('search-box');

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
        countryList.addEventListener('click', clickOnCountry);
        let markup = '';
        const moreInfo =
          '<p class="more-info"> Click to open more info about country:<p/>';
        country.forEach(({ flags, name }) => {
          markup += `<li> <img width='40px' height="30px" src=${flags.png} alt=${flags.alt} />${name.common}</li>`;
        });

        countryList.innerHTML = markup;
        countryList.insertAdjacentHTML('afterBegin', moreInfo);
      } else {
        countryList.innerHTML = '';
        const { flags, name, capital, population, languages } = country[0];
        const lang = Object.values(languages).map(lang => {
          return ` ${lang}`;
        });
        const markup = `<div class='card'>
  <div class='card-body'>
  <div class="flex-container"> 
  <img width='40px' height="30px" src=${flags.png} alt=${flags.alt} />   
    <h2  class='card-name'> ${name.common}</h2>
     </div>
    <p class='card-info'><span class="key-js">Capital</span>: ${capital}</p>
    <p class='card-info'><span class="key-js">Population</span>: ${population}</p>
    <p class='card-info'><span class="key-js">Languages</span>:${lang}</p>
  </div>

</div>`;
        countryCard.innerHTML = markup;
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}
function clickOnCountry(event) {
  window.removeEventListener('click', clickOnCountry);
  const test = event.target;
  inputEl.value = '';

  if (test.localName === 'li') {
    console.log(test.localName);
    let feltchCountry = fetch(
      `https://restcountries.com/v3.1/name/${test.textContent.trim()}?fullText=true&fields=languages,capital,name,flags,population`
    ).then(response => {
      return response.json();
    });
    makeMarkup(feltchCountry);
  }
}
