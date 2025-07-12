function getLivros(req, res, db) {
    try {
        res.send(db.findAll())
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

function salvarLivro(req, res, db) {
    try {
        const livro = req.body
        const livroExiste = db.findById(livro.id)
        if (livroExiste) {
            res.status(400)
            return res.send({erro: "Livro já existe"})
        }

        db.save(livro)
        res.send({status: "Sucesso"})
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

function getLivroById(req, res, db) {
    try {
        res.send(db.findById(req.params.id))
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

function removeLivro(req, res, db) {
    try {
        const id = req.params.id
        const livroRemovido = db.delete(id)
        if (livroRemovido) {
            res.send({status: "Livro removido com sucesso"})
            return
        }
        res.status(404)
        res.send({erro: "Livro não encontrado"})
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

function atualizarLivro(req, res, db) {
    try {
        const id = req.params.id
        const livroAtualizado = req.body
        const sucesso = db.update(id, livroAtualizado)
        if (sucesso) {
            res.send({status: "Livro atualizado com sucesso"})
            return
        }
        res.status(404)
        res.send({erro: "Livro não encontrado"})
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

module.exports = {
    getLivros,
    salvarLivro,
    getLivroById,
    removeLivro,
    atualizarLivro
}
