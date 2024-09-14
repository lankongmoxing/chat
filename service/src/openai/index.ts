import OpenAI from "openai";
import {sendResponse} from './../utils/send'
import * as dotenv from 'dotenv'
dotenv.config()

const OPEN_API_BASE_URL = process.env.OPEN_API_BASE_URL
const OPEN_API_API_KEY = process.env.OPEN_API_API_KEY
// openai config
const openai = new OpenAI({
  baseURL: OPEN_API_BASE_URL,
  apiKey: OPEN_API_API_KEY,
});

async function getTest(req, res) {
  const content = req.body.content
  console.log('content111', req.body, content)
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: content || '如何成为一个帅比' }],
    stream: true,
  });
  for await (const chunk of stream) {
    const word = chunk.choices[0].delta.content || ''
    const data = {
      content: word
    }
    res.write('data:' + JSON.stringify(data) + '\n\n')
  }
  res.end()
  // console.log(completion);
  // console.log(completion.choices[0])
}

export { getTest };
