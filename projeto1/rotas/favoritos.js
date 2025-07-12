const { Router } = require('express');
const { getFavoritos, getFavoritoPorId, salvarFavorito, removeFavorito } = require('../controladores/favoritos');
const { FavoritosJson } = require('../servicos/favoritosJson');
const { LivrosJsonDatabase } = require('../servicos/livrosJson');

const router = Router();
const favoritosDb = new FavoritosJson()
const livrosDb = new LivrosJsonDatabase()

router.get('/', (req, res) => {
    getFavoritos(req, res, favoritosDb)
});

router.get('/:id', (req, res) => {
    getFavoritoPorId(req, res, favoritosDb)
})

router.post('/', (req, res) => {
    salvarFavorito(req, res, favoritosDb, livrosDb)
});

router.delete('/:id', (req, res) => {
    removeFavorito(req, res, favoritosDb)
});

module.exports = router
