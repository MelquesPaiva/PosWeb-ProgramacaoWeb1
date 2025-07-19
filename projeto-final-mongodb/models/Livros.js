import mongoose from "mongoose";
import { autorSchema } from "./Autores.js";

const livrosSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    nome: {type: String, required: true},
    editora: {type: String},
    preco: {type: Number},
    paginas: {type: Number},
    autor: autorSchema
}, {versionKey: false});

const livros = mongoose.model('livros', livrosSchema);

export default livros;
