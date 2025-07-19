async function getFavoritos(req, res, db) {
    try {
        res.send(await db.findAll())
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

async function salvarFavorito(req, res, dbFavorito, dbLivro) {
    try {
        let id = req.params.id

        const livro = await dbLivro.findById(id)
        if (!livro) {
            res.status(400)
            return res.send({erro: "Livro não existe"})
        }

        const favoritoExiste = await dbFavorito.findById(id)
        if (favoritoExiste) {
            res.status(400)
            return res.send({erro: "Favorito já existe"})
        }

        const result = await dbFavorito.save({
            "_id": livro.id,
            "nome": livro.nome,
            "editora": livro.editora,
            "preco": livro.preco,
            "paginas": livro.paginas,
        })
        if (!result) {
            res.status(400)
            return res.send({erro: "Erro ao salvar favorito"})
        }
        res.send({status: "Favorito salvo com sucesso"})
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

async function getFavoritoPorId(req, res, db) {
    try {
        const favorito = await db.findById(req.params.id)
        if (!favorito) {
            res.status(404)
            return res.send({erro: "Favorito não encontrado"})
        }
        return res.send(favorito)
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

async function removeFavorito(req, res, db) {
    try {
        const id = req.params.id
        const favoritoRemovido = await db.delete(id)
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

export {
    getFavoritos,
    salvarFavorito,
    getFavoritoPorId,
    removeFavorito,
}
