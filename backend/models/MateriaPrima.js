const mongoose = require('mongoose');

const MateriaPrimaSchema = new mongoose.Schema({
  id_materia: { type: String, required: true, unique: true },
  nome: { type: String, required: true },
  descricao: { type: String },
  unidade_medida: { type: String, required: true },
  estoque: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('MateriaPrima', MateriaPrimaSchema);
