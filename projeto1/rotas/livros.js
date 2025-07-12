const { Router } = require('express');
const { getLivros, salvarLivro, getLivroById, removeLivro, atualizarLivro } = require('../controladores/livros');
const { LivrosJsonDatabase } = require('../servicos/livrosJson');

const router = Router();
const livrosDb = new LivrosJsonDatabase()

router.get('/', (req, res) => {
    getLivros(req, res, livrosDb)
});

router.get('/:id', (req, res) => {
    getLivroById(req, res, livrosDb)
})

router.post('/', (req, res) => {
    salvarLivro(req, res, livrosDb)
});

router.patch('/:id', (req, res) => {
    atualizarLivro(req, res, livrosDb)
});

router.delete('/:id', (req, res) => {
    removeLivro(req, res, livrosDb)
});

module.exports = router
