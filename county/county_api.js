const fs = require('fs')
const countyModel = require('../models/CountyModel')

exports.handler = (request, response) => {
    response.append('Content-Type' , 'application/json')
    const model = countyModel.model()
    let countyId = request.params.county

    if (model.contains(countyId)) {
        response.send(model.get(countyId))
    } else {
        response.status(404).send({
            message: "The county with id does not exist"
        })
    }
} 