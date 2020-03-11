const fs = require('fs')
const countyModel = require('../models/CountyModel')
const countriesModel = require('../models/CountryModel')

const postHandler = (request, response) => {
    response.append('Content-Type' , 'application/json')
    let model = countyModel.model()
    let countryModel = countriesModel.model()
    let body = request.body

    if (body.name === undefined || body.name === null) {
        response.status(422).send({
            message: "The name property is missing"
        })
    } else if (body.country_id === undefined || body.country_id === null) {
        response.status(422).send({
            message: "The country_id property is missing"
        })
    } else if (model.containsName(body.name, body.country_id)) {
        response.status(422).send({
            message: "A county with this name already exists in this country"
        })
    } else if (!countryModel.contains(body.country_id)) {
        response.status(422).send({
            message: "A country with this id does not exist"
        })
    } else {

        const newCounty = Object.assign(body, {
            id: model.nextId()
        })
        model.add(newCounty)
        const county = JSON.stringify(newCounty)
        response.status(201).send(county)
    }
}

exports.handler = {
    get: (request, response) => {
        response.append('Content-Type' , 'application/json')
        const model = countyModel.model()
        const countryModel = countriesModel.model()
        
        const counties = model.all().filter(county => {
            const countryId = Number(request.query.country_id)
            if (countryId) {
                return county.country_id === countryId
            }

            return true
        })

        let json = JSON.stringify(counties)
        response.send(json)
    },
    post: postHandler
}