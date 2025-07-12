const express = require('express');
const rotaLivro = require('./rotas/livros')

const app = express();
const port = 8000;

app.use(express.json())

app.use('/livros', rotaLivro)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
