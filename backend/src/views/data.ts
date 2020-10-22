import getNumber from'../api/api'
import {Request, Response} from 'express'

export default async function loadData(require:Request, response:Response){
    const jogo = {
        loteria: 'lotofacil',
        concurso: ''
    }

    const data = await getNumber(require, response)

}
