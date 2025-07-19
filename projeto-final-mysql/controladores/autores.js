async function getAutores(req, res, db) {
    try {
        const autores = await db.findAll()
        res.send(autores)
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

async function salvarAutores(req, res, db) {
    try {
        const autor = req.body
        if (autor.id && !idValido(autor.id)) {
            res.status(422)
            return res.send({erro: "ID inválido"})
        }
    
        if (!nomeValido(autor.nome)) {
            res.status(422)
            return res.send({erro: "Nome inválido"})
        }

        db.save(autor)
        res.send({status: "Sucesso"})
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

async function getAutorPorId(req, res, db) {
    try {
        if (!idValido(req.params.id)) {
            res.status(422)
            return res.send({erro: "ID inválido"})
        }

        const autor = await db.findById(req.params.id)
        if (autor && autor.length > 0) {
            res.send(autor[0])
            return
        }
        res.status(404)
        res.send({erro: "Autor não encontrado"})
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

async function removeAutor(req, res, db) {
    try {
        const id = req.params.id
        if (!idValido(id)) {
            res.status(422)
            return res.send({erro: "ID inválido"})
        }

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

async function atualizaAutor(req, res, db) {
    try {
        const id = req.params.id
        if (!idValido(id)) {
            res.status(422)
            return res.send({erro: "ID inválido"})
        }

        const autorAtualizado = req.body
        const sucesso = await db.update(id, autorAtualizado)
        if (sucesso) {
            res.send({status: "Autor atualizado com sucesso"})
            return
        }
        res.status(404)
        res.send({erro: "Autor não encontrado"})
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
    getAutores,
    salvarAutores,
    getAutorPorId,
    removeAutor,
    atualizaAutor
}
