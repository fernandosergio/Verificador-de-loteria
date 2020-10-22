import express from 'express'
const api = express()
import cors from 'cors'

const port = process.env.PORT || 5000

import loadData from './views/data'

api.use(cors())
api.use(express.json())
api.post('/', loadData)

api.listen(port, () => console.log('Api is running at ' + port) )


/* 
pra usar require('dotenv/config)
pra usar process.env.TOKEN

*/