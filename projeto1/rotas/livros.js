const { Router } = require('express');
const { getLivros, salvarLivros, getLivrosById } = require('../controladores/livros');
const { LivrosJsonDatabase } = require('../servicos/livros_json');

const router = Router();
const livrosDb = new LivrosJsonDatabase()

router.get('/', (req, res) => {
    getLivros(req, res, livrosDb)
});

router.get('/:id', (req, res) => {
    getLivrosById(req, res, livrosDb)
})

router.post('/', (req, res) => {
    salvarLivros(req, res, livrosDb)
});

router.patch('/', (req, res) => {
    res.send('List of books PATCH');
});

router.delete('/', (req, res) => {
    res.send('List of books DELETE');
});

module.exports = router
