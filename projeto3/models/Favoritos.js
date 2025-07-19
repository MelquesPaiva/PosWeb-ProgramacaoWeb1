import mongoose from "mongoose";

const favoritosSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    nome: {type: String, required: true},
    editora: {type: String},
    preco: {type: Number},
    paginas: {type: Number},
}, { versionKey: false });

const favoritos = mongoose.model('favoritos', favoritosSchema);

export default favoritos;
