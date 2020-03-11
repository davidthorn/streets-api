import fs from 'fs'

type OptionalCounty = CountyInterface | undefined | null

interface CountyInterface {
    id: number
    name: string
    country_id: number
}

interface CountyModelInterface {
    get(countyId: number): OptionalCounty
    all(): CountyInterface[]
    contains(countyId: number): boolean
    containsName(countyName: string, countryId: number): boolean
    nextId(): number
    add(county: CountyInterface): void
    json(countryId?: number): string
}

class CountyModel implements CountyModelInterface {

    private path: string = "./db/counties.json"
    private counties: CountyInterface[] = []
    private loaded = false

    private load(): void {
        if (this.loaded) { return }

        let rawData = fs.readFileSync(this.path)
        this.counties = JSON.parse(rawData.toString('utf8'))
        this.loaded = true
    }

    public get(countyId: number): OptionalCounty {
        this.load()

        if (!this.contains(countyId)) {
            return null
        }

        return this.counties.filter(item => {
            return item.id === countyId
        }).shift()
    }

    public all(): CountyInterface[] {
        this.load()
    
        return this.counties
    }

    public contains(countyId: number): boolean {
        this.load()
        
        return this.counties.filter(item => {
            return item.id === countyId
        }).length === 1
    }

    public containsName(countyName: string, countryId: number): boolean {
        this.load()
        return this.counties
        .filter(item => {
            return item.country_id === countryId
        })
        .filter(item => {
            return item.name.toLowerCase() === countyName.toLowerCase()
        }).length == 1
    }

    public nextId(): number {
        this.load()
        
        let id = 1
        this.counties.forEach(county => {
            id = county.id >= id ? county.id + 1 : id
        })

        return id
    }
    
    public add(county: CountyInterface): void {
        this.load()

        this.counties.push(county)
        fs.writeFileSync(this.path, JSON.stringify(this.counties))
    }

    public json(countryId?: number): string {
        this.load()

        const counties = this.all().filter((county: any) => {
            if (countryId) {
                return county.country_id === countryId
            }
    
            return true
        })

        return JSON.stringify(counties)
    }

}

const model: () => CountyModelInterface = () => {
    return new CountyModel()
}

export { model as countyModel }