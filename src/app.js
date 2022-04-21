const path = require('path')
const express = require('express')
const hbs = require('hbs')
const utils = require('./utils/utils')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Search for a Location to get Weather!',
        name: 'Ashutosh Banjara'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ashutosh Banjara'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    utils.getGeocode(req.query.address, (error, data) => {
        if(error) {
            res.send({error})
        }
        else {
            utils.getForecast(data.latitude, data.longitude, (error, data) => {
                if(error) {
                    res.send({error})
                }
                else {
                    res.send(data)
                }
            })
        }
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        name: 'Ashutosh Banjara',
        title: '404',
        errorMsg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})