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
        let livros = this.findAll()
        const livroIndex = livros.findIndex((livro) => livro.id == id)
        if (livroIndex === -1) {
            return false
        }

        const conteudoAtualizado = {
            ...livros[livroIndex],
            ...livroAtualizado
        }
    
        livros[livroIndex] = conteudoAtualizado
        fs.writeFileSync(caminhoJson, JSON.stringify(livros))
        return true
    }
    
    delete(id) {
        const livros = this.findAll()
        const livroParaRemover = livros.find((livro) => livro.id == id)
        if (livroParaRemover) {
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
