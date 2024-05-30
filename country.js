const countryName = new URLSearchParams(location.search).get('name')
const countryImage = document.querySelector('.flag-box img')
const countryTitle = document.querySelector('.country-title')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.tld')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderCountries = document.querySelector('.country-border')
const backBtn = document.querySelector('.back-btn')
const mode = document.querySelector('.mode')
const moonIcon = document.querySelector('.mode i')
const fullBody = document.body


backBtn.addEventListener('click', () => {
    history.back()
})

fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((res) => res.json())
    .then(([country]) => {
        countryImage.src = country.flags.svg
        countryTitle.innerText = country.name.common
        if(country.name.nativeName) {
            nativeName.innerText = Object.values(country.name.nativeName)[0].common
        } else{
            nativeName.innerText = country.name.common
        }
        population.innerText = country.population.toLocaleString()
        region.innerText = country.region
        if(country.subregion){
            subRegion.innerText = country.subregion
        }else {
            subRegion.innerText = country.region
        }
        
        if(country.capital) {
            capital.innerText = country.capital.join(', ')
        }else {
            capital.innerText = 'Not Available'
        }
        if(country.tld) {
            topLevelDomain.innerText = (country.tld.join(', '))
        } else {
            topLevelDomain.innerText = 'Not Available'
        }
        if (country.currencies) {
            currencies.innerText = Object.values(country.currencies).map((currency) => currency.name).join(', ')
        } else {
            currencies.innerText = 'Not Available'
        }
        if(country.languages) {
            languages.innerText = Object.values(country.languages).join(', ')
        } else {
            languages.innerText = 'Not Available'
        }
        if(country.borders) {
            country.borders.forEach((borderCountry) => {
                fetch(`https://restcountries.com/v3.1/alpha/${borderCountry}`)
                    .then((res) => res.json())
                    .then(([borderCountryData]) => {
                        const countryTagLinks = document.createElement('a')
                        countryTagLinks.classList.add('country-links') 
                        countryTagLinks.innerText = borderCountryData.name.common
                        countryTagLinks.href = `./country.html?name=${borderCountryData.name.common}`
                        borderCountries.append(countryTagLinks)
                    })
            })
        }
    })

mode.addEventListener('click', () => {
        document.body.classList.toggle('dark')
        moonIcon.classList.toggle('fa-moon')
        moonIcon.classList.toggle('fa-sun')
     })
