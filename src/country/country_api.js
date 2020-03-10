"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CountryModel_1 = require("../models/CountryModel");
const NOT_FOUND_ERROR_MESSAGE = "The country with id does not exist";
const COUNTRY_ID_NOT_NUMBER = "The country with id requires to be an integer";
const handler = (request, response) => {
    response.append('Content-Type', 'application/json');
    const model = CountryModel_1.countryModel();
    const countryId = Number(request.params.country);
    if (countryId === undefined) {
        response.status(422).send({
            message: COUNTRY_ID_NOT_NUMBER
        });
    }
    if (model.contains(countryId)) {
        response.send(model.get(countryId));
    }
    else {
        response.status(404).send({
            message: NOT_FOUND_ERROR_MESSAGE
        });
    }
};
exports.countryHandler = handler;
