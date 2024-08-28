import express from 'express'
import {getTest} from './openai'

const app = express()
const router = express.Router()

router.get('/config', async (req, res) => {
  getTest()

  const data = {
    t1: 666,
  }
  res.send(data)
})

app.use('', router)

app.listen(3002, () => globalThis.console.log('Server is running on port 3002'))