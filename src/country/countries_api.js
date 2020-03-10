"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CountryModel_1 = require("../models/CountryModel");
const postHandler = (request, response) => {
    let model = CountryModel_1.countryModel();
    let body = request.body;
    response.append('Content-Type', 'application/json');
    if (body.name === undefined || body.name === null) {
        response.status(422).send({
            message: "The name property is missing"
        });
    }
    else if (model.containsCountryWithName(body.name)) {
        response.status(422).send({
            message: "A country with this name already exists"
        });
    }
    else {
        const newCountry = Object.assign(body, {
            id: model.getNextId()
        });
        model.add(newCountry);
        const country = JSON.stringify(newCountry);
        response.status(201).send(country);
    }
};
const getHandler = (_, response) => {
    response.append('Content-Type', 'application/json');
    let model = CountryModel_1.countryModel();
    response.send(model.json());
};
const handler = {
    get: getHandler,
    post: postHandler
};
exports.countriesHandler = handler;
