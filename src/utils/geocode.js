const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicGFyYWdvbmFkZXkiLCJhIjoiY2x6a3ZrNTJqMDZxejJxc2N6Ym15ZjYyZyJ9.RNY0cQi1BcEOgqAXv2AG3g&limit=1'
    // const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGFyYWdvbmFkZXkiLCJhIjoiY2x6a3ZrNTJqMDZxejJxc2N6Ym15ZjYyZyJ9.RNY0cQi1BcEOgqAXv2AG3g&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
             // Low-level error (e.g., network issues)
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
             // Coordinate error (e.g., invalid location)
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                // Success: Pass the formatted geocode string
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode