"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CountyModel_1 = require("../models/CountyModel");
const CountryModel_1 = require("../models/CountryModel");
const NAME_MISSING_ERROR_MESSAGE = "The name property is missing";
const COUNTRY_ID_MISSING_ERROR_MESSAGE = "The country id property is missing";
const COUNTY_ALREADY_EXISTS = "A county with this name already exists in this country";
const COUNTRY_DOES_NOT_EXISTS = "A country with this id does not exist";
const postHandler = (request, response) => {
    response.append('Content-Type', 'application/json');
    let model = CountyModel_1.countyModel();
    let countriesModel = CountryModel_1.countryModel();
    let body = request.body;
    if (body.country_name !== undefined && body.country_name !== null) {
        body.country_id = countriesModel.getId(body.country_name) || body.country_id;
        delete body.country_name;
    }
    if (body.name === undefined || body.name === null) {
        response.status(422).send({
            message: NAME_MISSING_ERROR_MESSAGE
        });
    }
    else if (body.country_id === undefined || body.country_id === null) {
        response.status(422).send({
            message: COUNTRY_ID_MISSING_ERROR_MESSAGE
        });
    }
    else if (model.containsName(body.name, body.country_id)) {
        response.status(422).send({
            message: COUNTY_ALREADY_EXISTS
        });
    }
    else if (!countriesModel.contains(body.country_id)) {
        response.status(422).send({
            message: COUNTRY_DOES_NOT_EXISTS
        });
    }
    else {
        const newCounty = Object.assign(body, {
            id: model.nextId()
        });
        model.add(newCounty);
        const county = JSON.stringify(newCounty);
        response.status(201).send(county);
    }
};
const getHandler = (request, response) => {
    response.append('Content-Type', 'application/json');
    const countryId = Number(request.query.country_id);
    const model = CountyModel_1.countyModel();
    response.send(model.json(countryId));
};
const handler = {
    get: getHandler,
    post: postHandler
};
exports.countiesHandler = handler;
