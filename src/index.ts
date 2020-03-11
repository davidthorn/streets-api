import express from 'express'
import * as bodyParser from 'body-parser'
import { countriesHandler } from './country/countries_api'
import { countryHandler } from './country/country_api'
import { countiesHandler } from './county/counties_api'
import { countyHandler } from './county/county_api'

const app = express()
const port = 3000

app.use(bodyParser.json({ type: 'application/json' }))
app.get('/countries/:country', countryHandler)
app.get('/countries', countriesHandler.get)
app.post('/countries', countriesHandler.post)
app.get('/counties/:county', countyHandler)
app.get('/counties', countiesHandler.get)
app.post('/counties', countiesHandler.post)

app.listen(port, () => {
    console.log('server is listening')
})