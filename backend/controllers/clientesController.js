const Cliente = require('../models/Cliente');

// GET /api/clientes
exports.getAll = async (req, res, next) => {
  try {
    const clientes = await Cliente.find().sort({ createdAt: 1 });
    res.json(clientes);
  } catch (err) {
    next(err);
  }
};

// GET /api/clientes/:id  (id = id_cliente)
exports.getById = async (req, res, next) => {
  try {
    const cliente = await Cliente.findOne({ id_cliente: req.params.id });
    if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json(cliente);
  } catch (err) {
    next(err);
  }
};

// POST /api/clientes
exports.create = async (req, res, next) => {
  try {
    const { nome, cpf_cnpj, contato, id_cliente } = req.body;
    if (!nome) return res.status(400).json({ message: 'Nome é obrigatório' });

    // Gerar id_cliente sequencial simples se não fornecido
    let newId = id_cliente;
    if (!newId) {
      const count = await Cliente.countDocuments();
      newId = `C-${String(count + 1).padStart(3, '0')}`;
    }

    const existing = await Cliente.findOne({ id_cliente: newId });
    if (existing) return res.status(400).json({ message: 'ID de cliente já existe' });

    const cliente = new Cliente({ id_cliente: newId, nome, cpf_cnpj, contato });
    await cliente.save();
    res.status(201).json(cliente);
  } catch (err) {
    next(err);
  }
};

// PUT /api/clientes/:id
exports.update = async (req, res, next) => {
  try {
    const updates = req.body;
    const cliente = await Cliente.findOneAndUpdate({ id_cliente: req.params.id }, updates, { new: true });
    if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json(cliente);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/clientes/:id
exports.remove = async (req, res, next) => {
  try {
    const cliente = await Cliente.findOneAndDelete({ id_cliente: req.params.id });
    if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json({ message: 'Cliente removido' });
  } catch (err) {
    next(err);
  }
};
