export default class Database {

    async findAll() {
        throw new Error('Should be implemented by subclasses')
    }

    async save(data) {
        throw new Error('Should be implemented by subclasses')
    }

    async findById(id) {
        throw new Error('Should be implemented by subclasses')
    }

    async update(id, data) {
        throw new Error('Should be implemented by subclasses')
    }

    async delete(id) {
        throw new Error('Should be implemented by subclasses')
    }
}
