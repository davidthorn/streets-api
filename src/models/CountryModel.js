"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class CountryModel {
    constructor() {
        this.path = "./db/countries.json";
        this.countries = [];
        this.loaded = false;
    }
    load() {
        if (this.loaded) {
            return;
        }
        let rawData = fs_1.default.readFileSync(this.path);
        this.countries = JSON.parse(rawData.toString('utf8'));
        this.loaded = true;
    }
    get(countryId) {
        this.load();
        if (!this.contains(countryId)) {
            return null;
        }
        return this.countries.filter(item => {
            return item.id === countryId;
        }).shift();
    }
    all() {
        this.load();
        return this.countries;
    }
    contains(countryId) {
        this.load();
        return this.countries.filter(item => {
            return item.id === countryId;
        }).length == 1;
    }
    containsCountryWithName(countryName) {
        this.load();
        return this.countries.filter(item => {
            return item.name.toLowerCase() === countryName.toLowerCase();
        }).length == 1;
    }
    getNextId() {
        this.load();
        let id = 1;
        this.countries.forEach(country => {
            id = country.id >= id ? country.id + 1 : id;
        });
        return id;
    }
    getId(name) {
        this.load();
        const index = this.countries.findIndex((country) => {
            return country.name.toLowerCase() === name.toLowerCase();
        });
        return index === -1 ? undefined : this.countries[index].id;
    }
    add(country) {
        this.load();
        this.countries.push(country);
        fs_1.default.writeFileSync(this.path, JSON.stringify(this.countries));
    }
    json() {
        this.load();
        return JSON.stringify(this.countries);
    }
}
const model = () => {
    return new CountryModel();
};
exports.countryModel = model;
