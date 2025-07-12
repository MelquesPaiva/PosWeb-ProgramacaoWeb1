class Database {

    findAll() {
        throw new Error('Should be implemented by subclasses')
    }

    save(data) {
        throw new Error('Should be implemented by subclasses')
    }

    findById(id) {
        throw new Error('Should be implemented by subclasses')
    }

    update(id, data) {
        throw new Error('Should be implemented by subclasses')
    }

    delete(id) {
        throw new Error('Should be implemented by subclasses')
    }
}

module.exports = {
    Database
}
