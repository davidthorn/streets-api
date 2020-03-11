import { Request, Response } from 'express'
import { countyModel } from '../models/CountyModel'

const COUNTY_ID_NOT_NUMBER = "The county with id requires to be an integer"
const NOT_FOUND_ERROR_MESSAGE = "The county with id does not exist"

const handler = (request: Request, response: Response) => {
    response.append('Content-Type' , 'application/json')
    const model = countyModel()
    const countyId: number | undefined = Number(request.params.county)
 
    if (countyId === undefined) {
        response.status(422).send({
            message: COUNTY_ID_NOT_NUMBER
        })
    }

    if (model.contains(countyId)) {
        response.send(model.get(countyId))
    } else {
        response.status(404).send({
            message: NOT_FOUND_ERROR_MESSAGE
        })
    }
} 

export { handler as countyHandler }