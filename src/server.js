import express from 'express';
import { aiController } from './controllers/aiController.js';
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Olá Mundo!')
})

app.post('/ai', aiController)
app.post('/message', aiController)


app.listen(port, () => {
  console.log(`App de exemplo esta rodando na porta ${port}`)
})

