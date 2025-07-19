import { Router } from 'express';
import AutorMongoDb from '../servicos/autorMongoDb.js';
import { atualizarAutor, getAutores, getAutorPorId, removerAutor, salvarAutor } from '../controladores/autor.js';

const rotaAutor = Router();
const db = new AutorMongoDb()

rotaAutor.get('/', (req, res) => {
    getAutores(req, res, db)
});

rotaAutor.get('/:id', (req, res) => {
    getAutorPorId(req, res, db)
})

rotaAutor.post('/', (req, res) => {
    salvarAutor(req, res, db)
});

rotaAutor.patch('/:id', (req, res) => {
    atualizarAutor(req, res, db)
});

rotaAutor.delete('/:id', (req, res) => {
    removerAutor(req, res, db)
});

export default rotaAutor;
