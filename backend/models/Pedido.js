const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  id_pedido: { type: String, required: true, unique: true },
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
  data_pedido: { type: Date, default: Date.now },
  status: { type: String, enum: ['pendente', 'confirmado', 'entregue'], default: 'pendente' }
}, { timestamps: true });

module.exports = mongoose.model('Pedido', PedidoSchema);
