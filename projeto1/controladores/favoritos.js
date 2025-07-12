function getFavoritos(req, res, db) {
    try {
        res.send(db.findAll())
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

function salvarFavorito(req, res, dbFavorito, dbLivro) {
    try {
        let favorito = req.body
        let id = req.params.id
        if (id) {
            favorito = {id_livro: id}
        }

        if (!idValido(favorito.id_livro)) {
            res.status(422)
            return res.send({erro: "ID inválido"})
        }

        const livro = dbLivro.findById(favorito.id_livro)
        if (!livro) {
            res.status(400)
            return res.send({erro: "Livro não existe"})
        }

        const favoritoExiste = dbFavorito.findById(favorito.id_livro)
        if (favoritoExiste) {
            res.status(400)
            return res.send({erro: "Livro já foi favoritado"})
        }

        dbFavorito.save(livro)
        res.send({status: "Sucesso"})
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

function getFavoritoPorId(req, res, db) {
    try {
        if (!idValido(req.params.id)) {
            res.status(422)
            return res.send({erro: "ID inválido"})
        }

        res.send(db.findById(req.params.id))
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

function removeFavorito(req, res, db) {
    try {
        const id = req.params.id
        if (!idValido(id)) {
            res.status(422)
            return res.send({erro: "ID inválido"})
        }

        const favoritoRemovido = db.delete(id)
        if (favoritoRemovido) {
            res.send({status: "Favorito removido com sucesso"})
            return
        }
        res.status(404)
        res.send({erro: "Favorito não encontrado"})
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

function idValido(id) {
    if (id && Number(id)) {
        return true
    }
    return false
}

module.exports = {
    getFavoritos,
    salvarFavorito,
    getFavoritoPorId,
    removeFavorito,
}
