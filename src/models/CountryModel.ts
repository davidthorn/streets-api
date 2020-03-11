import fs from 'fs'
import CountryInterface from './CountryInterface'
import {
    CountryModelInterface,
    OptionalCountry
} from './CountryModelInterface'

class CountryModel implements CountryModelInterface {

    private path: string = "./db/countries.json"
    private countries: CountryInterface[] = []
    private loaded: Boolean = false

    private load() {
        if (this.loaded) { return }

        let rawData = fs.readFileSync(this.path)
        this.countries = JSON.parse(rawData.toString('utf8'))
        this.loaded = true
    }

    public get(countryId: number): OptionalCountry {
        this.load()

        if (!this.contains(countryId)) {
            return null
        }

        return this.countries.filter(item => {
            return item.id === countryId
        }).shift()
    }

    public all(): CountryInterface[] {
        this.load()
        return this.countries
    }

    public contains(countryId: number): boolean {
        this.load()

        return this.countries.filter(item => {
            return item.id === countryId
        }).length == 1
    }

    public containsCountryWithName(countryName: string): boolean {
        this.load()

        return this.countries.filter(item => {
            return item.name.toLowerCase() === countryName.toLowerCase()
        }).length == 1
    }

    public getNextId(): number {
        this.load()

        let id: number = 1
        this.countries.forEach(country => {
            id = country.id >= id ? country.id + 1 : id
        })

        return id
    }

    public getId(name: string): number | undefined {
        this.load()

        const index = this.countries.findIndex((country: CountryInterface) => {
            return country.name.toLowerCase() === name.toLowerCase()
        })

        return index === -1 ? undefined : this.countries[index].id
    }

    public add(country: CountryInterface): void {
        this.load()

        this.countries.push(country)
        fs.writeFileSync(this.path, JSON.stringify(this.countries))
    }

    public json(): string {
        this.load()
        
        return JSON.stringify(this.countries)
    }

}

const model: () => CountryModelInterface = (): CountryModelInterface => {
    return new CountryModel()
}

export { model as countryModel }