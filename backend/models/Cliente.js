const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  id_cliente: { type: String, required: true, unique: true },
  nome: { type: String, required: true },
  cpf_cnpj: { type: String },
  contato: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Cliente', ClienteSchema);
