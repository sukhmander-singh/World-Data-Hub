const mainContent  = document.querySelector('.main-content')
const mode = document.querySelector('.mode')
const modeIcon = document.querySelector('.mode i')
const modeName = document.querySelector('.mode span')
const selectByRegion = document.querySelector('.select')
const searchBar = document.querySelector('.search-container input')
const modeCssFile = document.querySelector('#mode-css-file')

modeCssFile.href = localStorage.getItem('mode')

fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then(fetchCountries)

selectByRegion.addEventListener('change', (e) => {
    mainContent.innerHTML =''
    fetch(`https://restcountries.com/v3.1/region/${selectByRegion.value}`)
    .then((res) => res.json())
    .then(fetchCountries)
})

function fetchCountries(countries) {
        countries.forEach((country) => {
            const countryContainer = document.createElement('a')
            countryContainer.href = `country.html?name=${country.name.common}`
            countryContainer.classList.add('country-container')
            countryContainer.innerHTML = `
                <img src="${country.flags.svg}" alt="${country.name.common} flag" style="border: .5px solid rgba(0, 0, 0, 0.1)">
                <div class="country-text">
                    <h3>${country.name.common}</h3>
                    <p><b>Population: </b>${country.population.toLocaleString()}</p>
                    <p><b>Region: </b>${country.region}</p>
                    <p><b>Capital: </b>${country.capital?.[0]}</p>
                </div>`
                mainContent.append(countryContainer)
        })
}
function fetchSearchedCountries(countries) {
    countries.forEach((country) => {
        const countryContainer = document.createElement('a')
        countryContainer.href = `country.html?name=${country.name.common}`
        countryContainer.classList.add('country-container')
        countryContainer.innerHTML = `
            <img src="${country.flags.svg}" alt="${country.name.common} flag" style="border: .5px solid rgba(0, 0, 0, 0.1)">
            <div class="country-text">
                <h3>${country.name.common}</h3>
                <p><b>Population: </b>${country.population.toLocaleString()}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital?.[0]}</p>
            </div>`
        if(country.name.common.toLowerCase().includes(searchBar.value.toLowerCase())) {
            mainContent.append(countryContainer)
        }
    })
}

searchBar.addEventListener('input', (e) => {
    mainContent.innerHTML = ''
    fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then(fetchSearchedCountries)
    })


if (!localStorage.getItem('mode name')) {
    localStorage.setItem('mode name', 'Dark Mode');
}
let modeNameVar = localStorage.getItem('mode name');
modeName.innerText = modeNameVar;

if (!localStorage.getItem('mode icon')) {
    localStorage.setItem('mode icon', 'fa-moon');
}
let modeIconClass = localStorage.getItem('mode icon');
modeIcon.classList.add(modeIconClass);

mode.addEventListener('click', () => {
    let modetext = localStorage.getItem('mode')

    if (modetext === 'dark.css') {
        localStorage.setItem('mode', 'light.css')
        modeCssFile.href = 'light.css'
        localStorage.setItem('mode name', 'Dark Mode')
        modeName.innerText = localStorage.getItem('mode name')
        modeIcon.classList.remove(localStorage.getItem('mode icon'))
        localStorage.setItem('mode icon', 'fa-moon')
        modeIcon.classList.add(localStorage.getItem('mode icon'))
    } else {
        localStorage.setItem('mode', 'dark.css')
        modeCssFile.href = 'dark.css'
        localStorage.setItem('mode name', 'Light Mode')
        modeName.innerText = localStorage.getItem('mode name')
        modeIcon.classList.remove(localStorage.getItem('mode icon'))
        localStorage.setItem('mode icon', 'fa-sun')
        modeIcon.classList.add(localStorage.getItem('mode icon'))
    }
 })