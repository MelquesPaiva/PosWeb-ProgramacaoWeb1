const express = require('express');
const rotaLivro = require('./rotas/livros')
const rotaFavoritos = require('./rotas/favoritos')
const cors = require('cors')

const app = express();
const port = 8000;

app.use(express.json())
app.use(cors({origin: '*'}))
app.use('/livros', rotaLivro)
app.use('/favoritos', rotaFavoritos)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
