const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
app.use(bodyParser.json({ type: 'application/json' }))

const countries = require('./country/countries_api')
const country = require('./country/country_api')

app.get('/countries/:country', country.handler)
app.get('/countries', countries.handler.get)
app.post('/countries', countries.handler.post)

app.listen(port, () => {
    console.log('server is listening')
})