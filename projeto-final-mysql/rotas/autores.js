const { Router } = require('express');
const AutoresMysql = require('../servicos/autoresMysql');
const { getAutores, getAutorPorId, salvarAutores, atualizaAutor, removeAutor } = require('../controladores/autores');

const router = Router();

const livrosDbMysql = new AutoresMysql()

router.get('/', (req, res) => {
    getAutores(req, res, livrosDbMysql)
});

router.get('/:id', (req, res) => {
    getAutorPorId(req, res, livrosDbMysql)
})

router.post('/', (req, res) => {
    salvarAutores(req, res, livrosDbMysql)
});

router.patch('/:id', (req, res) => {
    atualizaAutor(req, res, livrosDbMysql)
});

router.delete('/:id', (req, res) => {
    removeAutor(req, res, livrosDbMysql)
});

module.exports = router
