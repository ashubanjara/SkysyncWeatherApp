console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('.weather-form')
const search = document.querySelector('.weather-input')
const loader = document.querySelector('.loader')
const weatherDescription = document.querySelector(".weather-description")
let isTypeFinished = true

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if(isTypeFinished) {
        weatherDescription.innerHTML = ""
        if (!search.value) {
            isTypeFinished = false
            typeWriter(0, 'Please input something before searching!', weatherDescription)
        }
        else {
            isTypeFinished = false
            const location = search.value[0].toUpperCase() + search.value.slice(1)
            loader.classList.add('loader-active')
            fetch(`/weather?address=${location}`)
            .then(response => {
                search.value = ""
                response.json()
                .then(
                    data => {
                        if (data.error) {
                            loader.classList.remove('loader-active')
                            typeWriter(0, `${data.error}`, weatherDescription)
                        }
                        else {
                            let text = `The current weather in ${location}, ${data.country} is ${data.description} with a temperature of ${data.temperature} C and it feels like ${data.feelsLike} C. There is a 10% chance of rain.`
                            loader.classList.remove('loader-active')
                            typeWriter(0, text, weatherDescription)
                        }
                    })
                })
        }
    }
})

function typeWriter(i, text, htmlElement) {
    if (i < text.length) {
        htmlElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(() => {
            typeWriter(i, text, htmlElement)
        }, 40);
    }
    else {
        isTypeFinished = true
    }
}