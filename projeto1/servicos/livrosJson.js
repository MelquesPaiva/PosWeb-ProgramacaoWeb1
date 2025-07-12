const fs = require('fs')
const { Database } = require('./db')

const caminhoJson = './controladores/livros.json'

class LivrosJsonDatabase extends Database {

    /** @override */
    findAll() {
        return JSON.parse(fs.readFileSync(caminhoJson))
    }

    /** @override */
    findById(id) {
        const livros = this.findAll()
        const livro = livros.find((livro) => livro.id == id)
        return livro
    }

    /** @override */
    save(livro) {
        const livros = this.findAll()
        livros.push(livro)
        fs.writeFileSync(caminhoJson, JSON.stringify(livros))
    }

    /** @override */
    update(id, livroAtualizado) {

    }
    
    delete(id) {
        const livroParaRemover = this.findById(id)
        if (livroParaRemover) {
            const livros = this.findAll()
            const livrosAtualizados = livros.filter((livro) => livro.id != id)
            fs.writeFileSync(caminhoJson, JSON.stringify(livrosAtualizados))
            return true
        }

        return false
    }
}

module.exports = {
    LivrosJsonDatabase
}
