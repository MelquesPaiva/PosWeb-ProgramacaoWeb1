const fs = require('fs')
const { Database } = require("./db");

const caminhoJson = './controladores/favoritos.json'

class FavoritosJson extends Database {

    /** @override */
    findAll() {
        return JSON.parse(fs.readFileSync(caminhoJson))
    }

    /** @override */
    save(data) {
        const favoritos = this.findAll()
        favoritos.push(data)
        fs.writeFileSync(caminhoJson, JSON.stringify(favoritos))
    }

    /** @override */
    findById(id) {
        const favoritos = this.findAll()
        const favorito = favoritos.find(( favorito ) => favorito.id_livro == id)
        return favorito
    }

    /** @override */
    delete(id) {
        const favoritos = this.findAll()
        const favoritoParaRemover = favoritos.find((favorito) => favorito.id_livro == id)
        if (favoritoParaRemover) {
            const favoritosAtualizados = favoritos.filter((favorito) => favorito.id_livro != favoritoParaRemover.id_livro)
            if (favoritosAtualizados) {
                fs.writeFileSync(caminhoJson, JSON.stringify(favoritosAtualizados))
            } else {
                fs.writeFileSync(caminhoJson, JSON.stringify([]))
            }
            return true
        }

        return false
    }    
}

module.exports = {
    FavoritosJson
}
