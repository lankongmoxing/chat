import OpenAI from "openai";
import {sendResponse} from './../utils/send'

const openai = new OpenAI({
  baseURL: "https://api.chatanywhere.tech/v1",
  apiKey: "sk-RgOFiwhbZlTIsssv0Ew5irRGDCls5hzAZjuDQGeSa7nSQj1I",
});

async function getTest(req, res) {
  const content = req.body.content
  console.log('content111', req.body, content)
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: content || '如何成为一个帅比' }],
    stream: true
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
