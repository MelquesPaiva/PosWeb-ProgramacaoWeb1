import { autor } from "../models/Autores.js";
import Database from "./db.js";

export default class AutorMongoDb extends Database {

    async save(data) {
        return await autor.create(data)
    }

    async findById(id) {
        return await autor.findById(id)
    }

    async findAll() {
        return await autor.find()
    }

    async delete(id) {
        return await autor.findByIdAndDelete(id)
    }

    async update(id, data) {
        return await autor.findOneAndUpdate(id, data, { new: true })
    }
}
