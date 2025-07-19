const connection = require("../bd");
const { Database } = require("./db");

class LivrosMysql extends Database {

    #connection = null

    constructor() {
        super()
        this.#connection = connection
    }

    async findAll() {
        const [rows] = await this.#connection.query(`
            SELECT
                livros.*,
                autores.nome as "autor_nome",
                autores.nacionalidade as "autor_nacionalidade"
            FROM livros 
                LEFT JOIN autores ON livros.autor = autores.id 
            `)
        return rows
    }

    async save(data) {
        const {nome, autor, editora, valor, paginas} = data
        const [result] = await this.#connection.query(
            'INSERT INTO livros (nome, autor, editora, valor, paginas) VALUES (?, ?, ?, ?, ?)',
            [nome, autor, editora, valor, paginas]
        )
        return {id: result.insertId, ...data}
    }

    async findById(id) {
        const [rows] = await this.#connection.query(`
            SELECT
                livros.*,
                autores.nome as "autor_nome",
                autores.nacionalidade as "autor_nacionalidade"
            FROM livros
                LEFT JOIN autores ON livros.autor = autores.id 
            WHERE livros.id = ?
            `, [id])
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

async function findByEditora(editora) {
    const [rows] = await connection.query('SELECT * FROM livros WHERE editora LIKE ?', [`%${editora}%`])
    return rows
}

const livrosMysql = new LivrosMysql()

module.exports = {
    livrosMysql,
    findByEditora
}