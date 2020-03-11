import CountryInterface from './CountryInterface'

type OptionalCountry = CountryInterface | null | undefined

interface CountryModelInterface {
    add(country: CountryInterface): void
    get(countryId: number): OptionalCountry
    getId(name: string): number | undefined
    all(): CountryInterface[]
    contains(countryId: number): boolean
    containsCountryWithName(countryName: string): boolean
    getNextId(): number
    json(): string
}

export { CountryModelInterface, OptionalCountry }