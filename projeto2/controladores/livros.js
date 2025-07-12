async function getLivros(req, res, db) {
    try {
        const livros = await db.findAll()
        res.send(livros)
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

async function salvarLivro(req, res, db) {
    try {
        const livro = req.body
        if (livro.id && !idValido(livro.id)) {
            res.status(422)
            return res.send({erro: "ID inválido"})
        }
    
        if (!nomeValido(livro.nome)) {
            res.status(422)
            return res.send({erro: "Nome inválido"})
        }

        db.save(livro)
        res.send({status: "Sucesso"})
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

async function getLivroById(req, res, db) {
    try {
        if (!idValido(req.params.id)) {
            res.status(422)
            return res.send({erro: "ID inválido"})
        }

        const livro = await db.findById(req.params.id)
        if (livro && livro.length > 0) {
            res.send(livro[0])
            return
        }
        res.status(404)
        res.send({erro: "Livro não encontrado"})
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

async function removeLivro(req, res, db) {
    try {
        const id = req.params.id
        if (!idValido(id)) {
            res.status(422)
            return res.send({erro: "ID inválido"})
        }

        const livroRemovido = await db.delete(id)
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

async function atualizarLivro(req, res, db) {
    try {
        const id = req.params.id
        if (!idValido(id)) {
            res.status(422)
            return res.send({erro: "ID inválido"})
        }

        const livroAtualizado = req.body
        const sucesso = await db.update(id, livroAtualizado)
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
