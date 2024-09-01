const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const application = express()
const port = process.env.PORT || 3333

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Dynamic Pages with Templating

// Setup handlebars engine and views location
application.set('view engine', 'hbs')
application.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
application.use(express.static(publicDirectoryPath))


application.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Yakub Ojo'
    })
})

application.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Yakub Ojo'
    })
})

// Goal: Create a template for help page
// 
// 1. Setup a help template to render a help massage to the screen
// 2. Setup the help route and render the template with an example massage
// 3. Visit the route in the browers and see your help message print

application.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Yakub Ojo'
    })
})



// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__filename, '../public'))

// application.get('', (req, res) => {
//     // res.send("Hello Adekola")
//     // Serving up HTML and JSON
//     res.send('<h1>Hello Adekola</h1>')
// });

application.get('/help', (req, res) => {
    // res.send('Help Pages')
    // serving up JSON
    // res.send({
    //     name: 'Yakub',
    //     age: 25,
    //     lastName: 'Adekola',
    // })
    // ARREY METHOD IN JSON FORMET
    res.send([{
        name: 'Ojo',
        age: 23
    }, {
        name: 'Adewale',
        age: 27
    }, {
        name: 'yakub',
        age: 20
    }])
});

// Goal: Setup two new routes
// 
// 1. Setup an about route and render a page Title
// 2. Setup a weather route and render a page title
// 3. Test your work by visiting both in the brower

// Goal: Update
// 1. Setup about router to render a litle with HTMl
// 2. Setup a weather router to send back JSON
//  - Object with forecast and location strings
// 3. Test your work by visiting both in the brower

application.get('/about', (req, res) => {
    // res.send('A about page')
    res.send('<h2>This My About pages bold in H2 tages </h2>')  
})

application.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })

    //  Goal: Wire up /weather
    // 
    // 1. Require geocode/forecast into app.js
    // 2. Use the address to geocode
    // 3. Use the coordinates to get forecast
    // 4. Send back the real forecast and location
})




// 
// Goal: Update weather endpoint to accept address
// 
// 1. No address? Send back an error message
// 2. Address? Send the static JSON
//      - Add address property onto JSON which returns the provided address
// 3. Test /weather and /weather?address=philadelphia

application.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }


    console.log(req.query.search)
    res.send({
        products: []
    })
})

// 404 PAGES

application.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yakub Ojo',
        errorMessage: 'Help article not found.'
    })
})

application.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yakub Ojo',
        errorMessage: 'Page not found.'
    })
})

// Goal: Create and render a 404 page with handlebar

// 1. Setup the template to render the header and footer
// 2. Setup the template to render an error message in a paragraph
// 3. Render the template for both 404 routes
//      - Page not found.
//      - Help article not found.
// 4. Test your work. Visit /what and /help/units

application.listen(port, () => {
    console.log('Sever is up on port ' + port)
});