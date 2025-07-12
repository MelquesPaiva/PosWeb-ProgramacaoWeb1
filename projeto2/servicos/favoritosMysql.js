const { Database } = require("./db");
const connection = require('../bd');

class FavoritosMysql extends Database {

    #connection = null

    constructor() {
        super()
        this.#connection = connection
    }

    /** @override */
    async findAll() {
        const [rows] = await this.#connection.query('SELECT * FROM favoritos')
        return rows
    }

    /** @override */
    async save(data) {
        const {nome, autor, ano} = data
        const [result] = await this.#connection.query(
            'INSERT INTO favoritos (nome, autor, ano) VALUES (?, ?, ?)',
            [nome, autor, ano]
        )
        return {id: result.insertId, ...data}
    }

    /** @override */
    async findById(id) {
        const [rows] = await this.#connection.query('SELECT * FROM favoritos WHERE id = ?', [id])
        return rows
    }

    /** @override */
    async delete(id) {
        await this.#connection.query('DELETE FROM favoritos WHERE id = ?', [id])
        return true
    }
}

module.exports = {
    FavoritosMysql
}
