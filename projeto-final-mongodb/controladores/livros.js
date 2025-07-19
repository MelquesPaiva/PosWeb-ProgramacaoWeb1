import { findBy } from "../servicos/livrosMongoDb.js"

async function getLivros(req, res, db) {
    try {
        res.send(await db.findAll())
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

async function salvarLivro(req, res, db, dbAutor) {
    try {
        let livro = req.body
        if (!nomeValido(livro.nome)) {
            res.status(422)
            return res.send({erro: "Nome inválido"})
        }
        const autor = await dbAutor.findById(livro.autor)
        if (!autor) {
            res.status(400)
            return req.send({"erro": "Autor não encontrado"})
        }
        livro.autor = autor._doc
        const livroSalvo = await db.save(livro)
        if (livroSalvo) {
            return res.send({status: "Sucesso"})
        }
        res.status(400)
        return res.send({"erro": "O livro não foi salvo"})
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

async function atualizarLivro(req, res, db, dbAutor) {
    try {
        const id = req.params.id
        if (id) {
            let livroAtualizado = req.body
            if (livroAtualizado.autor) {
                const autor = await dbAutor.findById(livroAtualizado.autor)
                if (!autor) {
                    res.status(400)
                    return res.send({"erro": "Autor não encontrado"})
                }
                livroAtualizado.autor = autor
            }
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

async function getLivrosPorEditora(req, res) {
    if (!req.query.editora) {
        res.status(400)
        return res.send({erro: "Parâmetro 'editora' é obrigatório"})
    }

    res.send(await findBy({ editora: req.query.editora }))
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
    atualizarLivro,
    getLivrosPorEditora
}
