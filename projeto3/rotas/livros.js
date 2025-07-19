import { Router } from 'express';
import { getLivros, salvarLivro, getLivroById, removeLivro, atualizarLivro } from '../controladores/livros.js';
import LivrosMongoDb from '../servicos/livrosMongoDb.js';

const rotaLivro = Router();
const livrosDb = new LivrosMongoDb()

rotaLivro.get('/', (req, res) => {
    getLivros(req, res, livrosDb)
});

rotaLivro.get('/:id', (req, res) => {
    getLivroById(req, res, livrosDb)
})

rotaLivro.post('/', (req, res) => {
    salvarLivro(req, res, livrosDb)
});

rotaLivro.patch('/:id', (req, res) => {
    atualizarLivro(req, res, livrosDb)
});

rotaLivro.delete('/:id', (req, res) => {
    removeLivro(req, res, livrosDb)
});

export default rotaLivro;
