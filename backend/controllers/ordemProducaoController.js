const OrdemProducao = require("../models/OrdemProducao");

exports.criarOrdem = async (req, res) => {
  try {
    const ordem = await OrdemProducao.create(req.body);
    res.status(201).json(ordem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.listarOrdens = async (req, res) => {
  try {
    const ordens = await OrdemProducao.find()
      .populate("produto")
      .populate("materiaPrimaUsada.materia")
      .populate("pedidoRelacionado");
    res.status(200).json(ordens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const ordem = await OrdemProducao.findById(req.params.id)
      .populate("produto")
      .populate("materiaPrimaUsada.materia")
      .populate("pedidoRelacionado");

    if (!ordem) return res.status(404).json({ message: "Ordem não encontrada" });

    res.status(200).json(ordem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.atualizarOrdem = async (req, res) => {
  try {
    const ordem = await OrdemProducao.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!ordem) return res.status(404).json({ message: "Ordem não encontrada" });

    res.status(200).json(ordem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.removerOrdem = async (req, res) => {
  try {
    const ordem = await OrdemProducao.findByIdAndDelete(req.params.id);

    if (!ordem) return res.status(404).json({ message: "Ordem não encontrada" });

    res.status(200).json({ message: "Ordem removida com sucesso" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
