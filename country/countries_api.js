const fs = require('fs')
const countryModel = require('../models/CountryModel')

const postHandler = (request, response) => {
    let model = countryModel.model()
    let body = request.body
    response.append('Content-Type' , 'application/json')

    if(body.name === undefined || body.name === null) {
        response.status(422).send({
            message: "The name property is missing"
        })
    } else if (model.containsName(body.name, body.country_id)) {
        response.status(422).send({
            message: "A country with this name already exists"
        })
    } else {

        const newCountry = Object.assign(body, {
            id: model.nextId()
        })
        model.add(newCountry)
        const country = JSON.stringify(newCountry)
        response.status(201).send(country)
    }
} 

exports.handler = {
    get: (request, response) => {
        response.append('Content-Type' , 'application/json')
        let model = countryModel.model()
        let json = JSON.stringify(model.all())
        response.send(json)
    },
    post: postHandler
}