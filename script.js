const mainContent  = document.querySelector('.main-content')
const mode = document.querySelector('.mode')
const moonIcon = document.querySelector('.mode i')
const selectByRegion = document.querySelector('.select')
const searchBar = document.querySelector('.search-container input')

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

mode.addEventListener('click', () => {
    document.body.classList.toggle('dark')
    moonIcon.classList.toggle('fa-moon')
    moonIcon.classList.toggle('fa-sun')
 })