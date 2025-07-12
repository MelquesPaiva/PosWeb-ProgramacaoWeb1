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
        if (!idValido(livro.id)) {
            res.status(422)
            return res.send({erro: "ID inválido"})
        }
    
        if (!nomeValido(livro.nome)) {
            res.status(422)
            return res.send({erro: "Nome inválido"})
        }

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

function removeLivro(req, res, db) {
    try {
        const id = req.params.id
        if (!idValido(id)) {
            res.status(422)
            return res.send({erro: "ID inválido"})
        }

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
        if (!idValido(id)) {
            res.status(422)
            return res.send({erro: "ID inválido"})
        }

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

function idValido(id) {
    if (id && Number(id)) {
        return true
    }
    return false
}

function nomeValido(nome) {
    if (nome && nome.length > 0) {
        return true
    }
    return false
}

module.exports = {
    getLivros,
    salvarLivro,
    getLivroById,
    removeLivro,
    atualizarLivro
}
