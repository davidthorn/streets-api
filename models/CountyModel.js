const fs = require('fs')

class CountyModel {

    path = "./db/counties.json"
    counties = []
    loaded = false

    constructor() { }

    load() {
        if (this.loaded) { return }

        let rawData = fs.readFileSync(this.path)
        this.counties = JSON.parse(rawData)
        this.loaded = true
    }

    get(countyId) {
        this.load()

        if (!this.contains(countyId)) {
            return null
        }

        return this.counties.filter(item => {
            return item.id == countyId
        }).splice(0,1)
    }

    all() {
        this.load()
        return this.counties
    }

    contains(countyId) {
        this.load()
        return this.counties.filter(item => {
            return item.id == countyId
        }).length == 1
    }

    containsName(countyName, countryId) {
        this.load()
        return this.counties
        .filter(item => {
            return item.country_id === countryId
        })
        .filter(item => {
            return item.name.toLowerCase() === countyName.toLowerCase()
        }).length == 1
    }

    nextId() {
        this.load()
        let id = 1
        this.counties.forEach(county => {
            id = county.id >= id ? county.id + 1 : id
        })

        return id
    }
    
    add(county) {
        this.load()

        this.counties.push(county)
        fs.writeFileSync(this.path, JSON.stringify(this.counties))
    }

}

exports.model = () => {
    return new CountyModel()
}