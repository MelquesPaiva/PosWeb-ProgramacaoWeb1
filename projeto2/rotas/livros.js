const { Router } = require('express');
const { getLivros, salvarLivro, getLivroById, removeLivro, atualizarLivro } = require('../controladores/livros');
const LivrosMysql = require('../servicos/livrosMysql');

const router = Router();

const livrosDbMysql = new LivrosMysql()

router.get('/', (req, res) => {
    getLivros(req, res, livrosDbMysql)
});

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
