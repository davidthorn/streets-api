import { countryModel } from '../models/CountryModel'
import { Request, Response } from 'express'

const NOT_FOUND_ERROR_MESSAGE = "The country with id does not exist"
const COUNTRY_ID_NOT_NUMBER = "The country with id requires to be an integer"

const handler = (request: Request, response: Response) => {
    response.append('Content-Type' , 'application/json')
    
    const model = countryModel()
    const countryId: number | undefined = Number(request.params.country)
 
    if (countryId === undefined) {
        response.status(422).send({
            message: COUNTRY_ID_NOT_NUMBER
        })
    }
    
    if (model.contains(countryId)) {
        response.send(model.get(countryId))
    } else {
        response.status(404).send({
            message: NOT_FOUND_ERROR_MESSAGE
        })
    }
} 

export { handler as countryHandler }