const connection = require("../bd");
const { Database } = require("./db");

class LivrosMysql extends Database {

    #connection = null

    constructor() {
        super()
        this.#connection = connection
    }

    async findAll() {
        const [rows] = await this.#connection.query('SELECT * FROM livros')
        return rows
    }

    async save(data) {
        const {nome, autor, ano} = data
        const [result] = await this.#connection.query(
            'INSERT INTO livros (nome, autor, ano) VALUES (?, ?, ?)',
            [nome, autor, ano]
        )
        return {id: result.insertId, ...data}
    }

    async findById(id) {
        const [rows] = await this.#connection.query('SELECT * FROM livros WHERE id = ?', [id])
        return rows
    }

    async update(id, modificacoes) {
        const campos = []
        const valores = []
        for (const [chave, valor] of Object.entries(modificacoes)) {
            campos.push(`${chave} = ? `)
            valores.push(valor)
        }
        valores.push(id)
        const sql = `UPDATE livros SET  ${campos.join(', ')} WHERE id = ?`
        await this.#connection.query(sql, valores)

        return true
    }

    async delete(id) {
        await this.#connection.query('DELETE FROM livros WHERE id = ?', [id])
        return true
    }
}

module.exports = LivrosMysql
