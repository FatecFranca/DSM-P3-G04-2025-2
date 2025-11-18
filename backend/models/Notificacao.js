const mongoose = require('mongoose');

const NotificacaoSchema = new mongoose.Schema({
  tipo: { type: String, required: true },
  mensagem: { type: String, required: true },
  referencia: { type: String }, // id relacionado (ex: id_materia)
  lida: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Notificacao', NotificacaoSchema);
