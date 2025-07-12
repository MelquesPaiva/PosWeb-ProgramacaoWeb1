function getLivros(req, res, db) {
    try {
        res.send(db.findAll())
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

function salvarLivros(req, res, db) {
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

function getLivrosById(req, res, db) {
    try {
        res.send(db.findById(req.params.id))
    } catch (error) {
        res.status(500)
        res.send({erro: error.message})
    }
}

module.exports = {
    getLivros,
    salvarLivros,
    getLivrosById
}
