const fs = require('fs')

class CountryModel {

    path = "./api/countries.json"
    countries = []
    loaded = false

    constructor() { }

    load() {
        if (this.loaded) { return }

        let rawData = fs.readFileSync(this.path)
        this.countries = JSON.parse(rawData)
        this.loaded = true
    }

    get(countryId) {
        this.load()

        if (!this.contains(countryId)) {
            return null
        }

        return this.countries.filter(item => {
            return item.id == countryId
        }).splice(0,1)
    }

    all() {
        this.load()
        return this.countries
    }

    contains(countryId) {
        this.load()
        return this.countries.filter(item => {
            return item.id == countryId
        }).length == 1
    }

    containsName(countryName) {
        this.load()
        return this.countries.filter(item => {
            return item.name.toLowerCase() === countryName.toLowerCase()
        }).length == 1
    }

    nextId() {
        this.load()
        let id = 1
        this.countries.forEach(country => {
            id = country.id >= id ? country.id + 1 : id
        })

        return id
    }
    
    add(country) {
        this.load()

        this.countries.push(country)
        fs.writeFileSync(this.path, JSON.stringify(this.countries))
    }

}

exports.model = () => {
    return new CountryModel()
}