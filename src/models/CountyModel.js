"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class CountyModel {
    constructor() {
        this.path = "./db/counties.json";
        this.counties = [];
        this.loaded = false;
    }
    load() {
        if (this.loaded) {
            return;
        }
        let rawData = fs_1.default.readFileSync(this.path);
        this.counties = JSON.parse(rawData.toString('utf8'));
        this.loaded = true;
    }
    get(countyId) {
        this.load();
        if (!this.contains(countyId)) {
            return null;
        }
        return this.counties.filter(item => {
            return item.id === countyId;
        }).shift();
    }
    all() {
        this.load();
        return this.counties;
    }
    contains(countyId) {
        this.load();
        return this.counties.filter(item => {
            return item.id === countyId;
        }).length === 1;
    }
    containsName(countyName, countryId) {
        this.load();
        return this.counties
            .filter(item => {
            return item.country_id === countryId;
        })
            .filter(item => {
            return item.name.toLowerCase() === countyName.toLowerCase();
        }).length == 1;
    }
    nextId() {
        this.load();
        let id = 1;
        this.counties.forEach(county => {
            id = county.id >= id ? county.id + 1 : id;
        });
        return id;
    }
    add(county) {
        this.load();
        this.counties.push(county);
        fs_1.default.writeFileSync(this.path, JSON.stringify(this.counties));
    }
    json(countryId) {
        this.load();
        const counties = this.all().filter((county) => {
            if (countryId) {
                return county.country_id === countryId;
            }
            return true;
        });
        return JSON.stringify(counties);
    }
}
const model = () => {
    return new CountyModel();
};
exports.countyModel = model;
