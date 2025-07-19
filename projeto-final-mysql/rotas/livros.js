const { Router } = require('express');
const { getLivros, salvarLivro, getLivroById, removeLivro, atualizarLivro, getLivrosPorEditora } = require('../controladores/livros');
const { livrosMysql: livrosDbMysql } = require('../servicos/livrosMysql');

const router = Router();

router.get('/', (req, res) => {
    getLivros(req, res, livrosDbMysql)
});

router.get('/busca', (req, res) => {
    getLivrosPorEditora(req, res, livrosDbMysql)
})

router.get('/:id', (req, res) => {
    getLivroById(req, res, livrosDbMysql)
})

router.post('/', (req, res) => {
    salvarLivro(req, res, livrosDbMysql)
});

router.patch('/:id', (req, res) => {
    atualizarLivro(req, res, livrosDbMysql)
});

router.delete('/:id', (req, res) => {
    removeLivro(req, res, livrosDbMysql)
});

module.exports = router
