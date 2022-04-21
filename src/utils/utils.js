const request = require('postman-request');

const getGeocode = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=579f97e5d006a98e322b7b168b911705&query=${encodeURIComponent(address)}`

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        }
        else if (response.body.error || response.body.data.length === 0) {
            callback('Unable to find location, Try another search.', undefined)
        }
        else {
            callback(undefined, {
                latitude: response.body.data[0].latitude,
                longitude: response.body.data[0].longitude 
            })
        }
    })
}

const getForecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=779a171f2d29508149d5516927d74441&query=${latitude},${longitude}`

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        }
        else if (response.body.error) {
            callback('Unable to get weather for location', undefined);
        }
        else {
            const data = response.body
            callback(undefined, {
                location: data.location.name,
                country: data.location.country,
                region: data.location.region,
                description: data.current.weather_descriptions[0],
                temperature: data.current.temperature,
                feelsLike: data.current.feelslike
            })
        }
    })
}

module.exports = {
    getGeocode: getGeocode,
    getForecast: getForecast
}