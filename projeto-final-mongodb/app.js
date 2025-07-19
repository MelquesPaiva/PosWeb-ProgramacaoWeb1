import express from 'express';
import cors from 'cors';
import rotaLivro from './rotas/livros.js';
import rotaFavoritos from './rotas/favoritos.js';
import pool from './dbConnection.js';
import "dotenv/config";
import rotaAutor from './rotas/autor.js';

const app = express();
const port = 8000;
const conexao = await pool()

conexao.on('error', (error) => {
  console.error('Erro de conexão com o banco de dados:', error);
});

conexao.once('open', () => {
  console.log('Conexão com o banco de dados estabelecida com sucesso.');
});

app.use(express.json())
app.use(cors({origin: '*'}))
app.use('/livros', rotaLivro)
app.use('/favoritos', rotaFavoritos)
app.use('/autores', rotaAutor)

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
});
