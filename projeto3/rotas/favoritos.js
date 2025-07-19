import { Router } from 'express';
import { getFavoritos, getFavoritoPorId, salvarFavorito, removeFavorito } from '../controladores/favoritos.js';
import LivrosMongoDb from '../servicos/livrosMongoDb.js';
import FavoritosMongoDb from '../servicos/favoritosMongoDb.js';

const rotaFavoritos = Router();
const favoritosDb = new FavoritosMongoDb()
const livrosDb = new LivrosMongoDb()

rotaFavoritos.get('/', (req, res) => {
    getFavoritos(req, res, favoritosDb)
});

rotaFavoritos.get('/:id', (req, res) => {
    getFavoritoPorId(req, res, favoritosDb)
})

rotaFavoritos.post('/', (req, res) => {
    salvarFavorito(req, res, favoritosDb, livrosDb)
});

rotaFavoritos.post('/:id', (req, res) => {
    salvarFavorito(req, res, favoritosDb, livrosDb)
});

rotaFavoritos.delete('/:id', (req, res) => {
    removeFavorito(req, res, favoritosDb)
});

export default rotaFavoritos;
