import Database from './db.js';
import livros from '../models/Livros.js';

class LivrosMongoDb extends Database {

    /** @override */
    async findAll() {
        return await livros.find(
            {},
            {
                "_id": 0,
                "id": { $toString: "$_id" },
                "nome": 1,
                "editora": 1,
                "preco": 1,
                "paginas": 1,
                "autor": 1,
            }
        );
    }

    /** @override */
    async findById(id) {
        return await livros.findById(
            id,
            {
                "_id": 0,
                "id": { $toString: "$_id" },
                "nome": 1,
                "editora": 1,
                "preco": 1,
                "paginas": 1,
                "autor": 1,
            }
        )
    }

    /** @override */
    async save(livro) {
        return await livros.create(livro);
    }

    /** @override */
    async update(id, livroAtualizado) {
        return await livros.findByIdAndUpdate(id, livroAtualizado, { new: true });
    }
    
    async delete(id) {
        return await livros.findByIdAndDelete(id);
    }
}

async function findBy(params) {
    return await livros.find(params)
}

export {
    LivrosMongoDb as default,
    findBy
}
