const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

app.use(cors());

app.get('/', async (req, res) => {
  const url = req.query.url;
  const response = await fetch(url);
  const data = await response.json();
  res.set('Access-Control-Allow-Origin', '*'); // Agregar este encabezado
  res.send(data);
});

app.listen(3000, () => console.log('Proxy running on port 3000'));
