import Database from './db.js'
import favoritos from '../models/Favoritos.js';

export default class FavoritosMongoDb extends Database {

    /** @override */
    async findAll() {
        return await favoritos.find({}, {
            "_id": 0,
            "id": { $toString: "$_id" },
            "nome": 1,
            "editora": 1,
            "preco": 1,
            "paginas": 1,
        })
    }

    /** @override */
    async save(data) {
        return await favoritos.create(data);
    }

    /** @override */
    async findById(id) {
        return await favoritos.findById(id, {
            "_id": 0,
            "id": { $toString: "$_id" },
            "nome": 1,
            "editora": 1,
            "preco": 1,
            "paginas": 1,
        });
    }

    /** @override */
    async delete(id) {
        return await favoritos.findByIdAndDelete(id);
    }    
}
