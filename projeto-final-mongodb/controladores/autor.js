async function getAutores(req, res, db) {
    try {
        res.send(await db.findAll())
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

async function salvarAutor(req, res, db) {
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

async function getAutorPorId(req, res, db) {
    try {
        res.send(await db.findById(req.params.id))
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

async function removerAutor(req, res, db) {
    try {
        const id = req.params.id
        const autorRemovido = await db.delete(id)
        if (autorRemovido) {
            res.send({status: "Autor removido com sucesso"})
            return
        }
        res.status(404)
        res.send({erro: "Autor não encontrado"})
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

async function atualizarAutor(req, res, db) {
    try {
        const id = req.params.id
        if (id) {
            const autorAtualizado = req.body
            const result = await db.update(id, autorAtualizado)
            if (result) {
                res.send({status: "Autor atualizado com sucesso"})
                return
            }

            res.status(404)
            res.send({erro: "Autor não encontrado"})            
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
    getAutores,
    salvarAutor,
    getAutorPorId,
    removerAutor,
    atualizarAutor
}
