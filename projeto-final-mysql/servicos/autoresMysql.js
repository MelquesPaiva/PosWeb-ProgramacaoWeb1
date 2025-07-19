const connection = require("../bd");
const { Database } = require("./db");

class AutoresMysql extends Database {

    #connection = null

    constructor() {
        super()
        this.#connection = connection
    }

    async findAll() {
        const [rows] = await this.#connection.query('SELECT * FROM autores')
        return rows
    }

    async save(data) {
        const {nome, nacionalidade} = data
        const [result] = await this.#connection.query(
            'INSERT INTO autores (nome, nacionalidade) VALUES (?, ?)',
            [nome, nacionalidade]
        )
        return {id: result.insertId, ...data}
    }

    async findById(id) {
        const [rows] = await this.#connection.query('SELECT * FROM autores WHERE id = ?', [id])
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
        const sql = `UPDATE autores SET  ${campos.join(', ')} WHERE id = ?`
        await this.#connection.query(sql, valores)

        return true
    }

    async delete(id) {
        await this.#connection.query('DELETE FROM autores WHERE id = ?', [id])
        return true
    }
}

module.exports = AutoresMysql
