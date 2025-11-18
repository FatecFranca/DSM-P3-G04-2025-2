const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
  id_produto: { type: String, required: true, unique: true },
  nome: { type: String, required: true },
  descricao: { type: String },
  preco: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Produto', ProdutoSchema);
