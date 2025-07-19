async function getLivros(req, res, db) {
    try {
        res.send(await db.findAll())
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

async function salvarLivro(req, res, db) {
    try {
        const livro = req.body
        if (!nomeValido(livro.nome)) {
            res.status(422)
            return res.send({erro: "Nome inválido"})
        }

        await db.save(livro)
        res.send({status: "Sucesso"})
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

async function getLivroById(req, res, db) {
    try {
        res.send(await db.findById(req.params.id))
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

async function removeLivro(req, res, db) {
    try {
        const id = req.params.id
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
        if (id) {
            const livroAtualizado = req.body
            const result = await db.update(id, livroAtualizado)
            if (result) {
                res.send({status: "Livro atualizado com sucesso"})
                return
            }

            res.status(404)
            res.send({erro: "Livro não encontrado"})            
            return
        }

        throw new Error("ID não informado")
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

function nomeValido(nome) {
    if (nome && nome.length > 0) {
        return true
    }
    return false
}

export {
    getLivros,
    salvarLivro,
    getLivroById,
    removeLivro,
    atualizarLivro
}
