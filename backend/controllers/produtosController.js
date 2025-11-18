const Produto = require('../models/Produto');

exports.getAll = async (req, res, next) => {
  try {
    const produtos = await Produto.find().sort({ createdAt: 1 });
    res.json(produtos);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const produto = await Produto.findOne({ id_produto: req.params.id });
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json(produto);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { nome, descricao, preco, id_produto } = req.body;
    if (!nome) return res.status(400).json({ message: 'Nome é obrigatório' });

    let newId = id_produto;
    if (!newId) {
      const count = await Produto.countDocuments();
      newId = `P-${String(count + 1).padStart(3, '0')}`;
    }

    const existing = await Produto.findOne({ id_produto: newId });
    if (existing) return res.status(400).json({ message: 'ID de produto já existe' });

    const produto = new Produto({ id_produto: newId, nome, descricao, preco: preco || 0 });
    await produto.save();
    res.status(201).json(produto);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updates = req.body;
    const produto = await Produto.findOneAndUpdate({ id_produto: req.params.id }, updates, { new: true });
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json(produto);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const produto = await Produto.findOneAndDelete({ id_produto: req.params.id });
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json({ message: 'Produto removido' });
  } catch (err) {
    next(err);
  }
};
