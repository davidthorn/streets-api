"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const countries_api_1 = require("./country/countries_api");
const country_api_1 = require("./country/country_api");
const counties_api_1 = require("./county/counties_api");
const county_api_1 = require("./county/county_api");
const app = express_1.default();
const port = 3000;
app.use(bodyParser.json({ type: 'application/json' }));
app.get('/countries/:country', country_api_1.countryHandler);
app.get('/countries', countries_api_1.countriesHandler.get);
app.post('/countries', countries_api_1.countriesHandler.post);
app.get('/counties/:county', county_api_1.countyHandler);
app.get('/counties', counties_api_1.countiesHandler.get);
app.post('/counties', counties_api_1.countiesHandler.post);
app.listen(port, () => {
    console.log('server is listening');
});
