require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const API_KEY = process.env.API_KEY;

app.use(cors());
app.use(express.json());


app.post('/api/chat', async (req, res) => {

  // Menssagem recebida do frontend
  const { message } = req.body;

  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo', 
      messages: [
        {role: 'user', content:`${message}`}
      ],
      max_tokens: 2048,
      temperature: 0.5
    })
  })
  .then(response => response.json())
  .then(data => {
    // Resposta enviada ao Frontend
    res.send(data);
  })
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
