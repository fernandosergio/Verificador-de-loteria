import axios from 'axios'
import {Request, Response} from 'express'

export default async function getNumber(req:Request,res:Response){
    const {loteria,concurso} = req.query

    const url = `https://apiloterias.com.br/app/resultado?loteria=${loteria}&token=${process.env.API_KEY}&concurso=${concurso}`

    const data = await axios.get(url)

    return res.json(data.data)

}