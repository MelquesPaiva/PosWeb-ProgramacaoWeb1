const { Router } = require('express');
const { getFavoritos, getFavoritoPorId, salvarFavorito, removeFavorito } = require('../controladores/favoritos');
const { livrosMysql: livrosDb } = require('../servicos/livrosMysql');
const { FavoritosMysql } = require('../servicos/favoritosMysql');

const router = Router();
const favoritosDb = new FavoritosMysql()

router.get('/', (req, res) => {
    getFavoritos(req, res, favoritosDb)
});

router.get('/:id', (req, res) => {
    getFavoritoPorId(req, res, favoritosDb)
})

router.post('/', (req, res) => {
    salvarFavorito(req, res, favoritosDb, livrosDb)
});

router.post('/:id', (req, res) => {
    salvarFavorito(req, res, favoritosDb, livrosDb)
});

router.delete('/:id', (req, res) => {
    removeFavorito(req, res, favoritosDb)
});

module.exports = router
