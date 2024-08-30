const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=82500b2b13bd487418f4b98bdbba43c8&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            // Low-level error (e.g., network issues)
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            // Coordinate error (e.g., invalid location)
            callback('Unable to find location', undefined)
        } else {
            // Success: Pass the formatted forecast string
            callback(undefined, body.current.weather_descriptions[0] +'. It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.feelslike + '% chance of rain')
            // callback(undefined, body.current.weather_descriptions[0] +'. It is currently' + body.current.temperature + " degress out. It feels like " + body.current.feelslike + ' degress out.')
        }
    })
}

module.exports = forecast


