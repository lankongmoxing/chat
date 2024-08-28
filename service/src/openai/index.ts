import OpenAI from "openai";
import {sendResponse} from './../utils/send'

const openai = new OpenAI({
  baseURL: "https://api.chatanywhere.tech/v1",
  apiKey: "sk-RgOFiwhbZlTIsssv0Ew5irRGDCls5hzAZjuDQGeSa7nSQj1I",
});

async function getTest(res) {
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "西瓜好不好吃" }],
    stream: true
  });
  for await (const chunk of stream) {
    const word = chunk.choices[0].delta.content || ''
    res.write('data:' + word + '\n\n')
  }
  res.end()
  // console.log(completion);
  // console.log(completion.choices[0])
}

export { getTest };
