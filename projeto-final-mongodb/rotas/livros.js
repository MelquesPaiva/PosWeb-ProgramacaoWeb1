import { Router } from 'express';
import { getLivros, salvarLivro, getLivroById, removeLivro, atualizarLivro, getLivrosPorEditora } from '../controladores/livros.js';
import LivrosMongoDb from '../servicos/livrosMongoDb.js';
import AutorMongoDb from '../servicos/autorMongoDb.js';

const rotaLivro = Router();
const livrosDb = new LivrosMongoDb()
const autorDb = new AutorMongoDb()

rotaLivro.get('/', (req, res) => {
    getLivros(req, res, livrosDb)
});

rotaLivro.get('/busca', (req, res) => {
    getLivrosPorEditora(req, res)
})

rotaLivro.get('/:id', (req, res) => {
    getLivroById(req, res, livrosDb)
})

rotaLivro.post('/', (req, res) => {
    salvarLivro(req, res, livrosDb, autorDb)
});

rotaLivro.patch('/:id', (req, res) => {
    atualizarLivro(req, res, livrosDb, autorDb)
});

rotaLivro.delete('/:id', (req, res) => {
    removeLivro(req, res, livrosDb)
});

export default rotaLivro;
