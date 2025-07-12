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
        db.save(req.body)
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
