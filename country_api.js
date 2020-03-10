const fs = require('fs')
const countryModel = require('./models/CountryModel')

exports.handler = (request, response) => {
    const model = countryModel.model()
    let countryId = request.params.country

    if (model.contains(countryId)) {
        response.send(model.get(countryId))
    } else {
        response.status(404).send({
            message: "The country with id does not exist"
        })
    }
} 