const mongoose = require("mongoose");

const OrdemProducaoSchema = new mongoose.Schema(
  {
    produto: { type: mongoose.Schema.Types.ObjectId, ref: "Produto", required: true },
    quantidade: { type: Number, required: true },
    dataInicio: { type: Date, required: true, default: Date.now },
    status: {
      type: String,
      enum: ["pendente", "em_producao", "finalizado"],
      default: "pendente",
      required: true,
    },
    materiaPrimaUsada: [
      {
        materia: { type: mongoose.Schema.Types.ObjectId, ref: "MateriaPrima", required: true },
        quantidade: { type: Number, required: true },
      },
    ],
    pedidoRelacionado: { type: mongoose.Schema.Types.ObjectId, ref: "Pedido", required: true },
    observacoes: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrdemProducao", OrdemProducaoSchema);
