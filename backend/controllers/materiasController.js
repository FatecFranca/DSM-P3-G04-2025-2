const MateriaPrima = require('../models/MateriaPrima');
const Notificacao = require('../models/Notificacao');

const LOW_THRESHOLD = 350; // placas

// Função helper para checar e criar notificação
async function checkLowStockAndNotify(materia) {
  try {
    if (materia.unidade_medida && materia.unidade_medida.toLowerCase().includes('placa')) {
      if (materia.estoque <= LOW_THRESHOLD) {
        const mensagem = `Matéria-prima "${materia.nome}" (ID ${materia.id_materia}) atingiu ${materia.estoque} placas — estoque baixo.`;
        await Notificacao.create({ tipo: 'estoque_baixo', mensagem, referencia: materia.id_materia });
      }
    }
  } catch (err) {
    console.error('Erro ao criar notificação de estoque baixo:', err.message);
  }
}

// GET /api/materias
exports.getAll = async (req, res, next) => {
  try {
    const materias = await MateriaPrima.find().sort({ createdAt: 1 });
    res.json(materias);
  } catch (err) {
    next(err);
  }
};

// GET /api/materias/:id
exports.getById = async (req, res, next) => {
  try {
    const materia = await MateriaPrima.findOne({ id_materia: req.params.id });
    if (!materia) return res.status(404).json({ message: 'Matéria-prima não encontrada' });
    res.json(materia);
  } catch (err) {
    next(err);
  }
};

// POST /api/materias
exports.create = async (req, res, next) => {
  try {
    const { nome, descricao, unidade_medida, estoque, id_materia } = req.body;
    if (!nome || !unidade_medida) return res.status(400).json({ message: 'Nome e unidade_medida são obrigatórios' });

    let newId = id_materia;
    if (!newId) {
      const count = await MateriaPrima.countDocuments();
      newId = `M-${String(count + 1).padStart(3, '0')}`;
    }

    const existing = await MateriaPrima.findOne({ id_materia: newId });
    if (existing) return res.status(400).json({ message: 'ID de matéria-prima já existe' });

    const materia = new MateriaPrima({ id_materia: newId, nome, descricao, unidade_medida, estoque: estoque || 0 });
    await materia.save();

    // Verificar estoque baixo
    await checkLowStockAndNotify(materia);

    res.status(201).json(materia);
  } catch (err) {
    next(err);
  }
};

// PUT /api/materias/:id
exports.update = async (req, res, next) => {
  try {
    const updates = req.body;
    const materia = await MateriaPrima.findOneAndUpdate({ id_materia: req.params.id }, updates, { new: true });
    if (!materia) return res.status(404).json({ message: 'Matéria-prima não encontrada' });

    // Verificar estoque baixo depois da atualização
    await checkLowStockAndNotify(materia);

    res.json(materia);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/materias/:id
exports.remove = async (req, res, next) => {
  try {
    const materia = await MateriaPrima.findOneAndDelete({ id_materia: req.params.id });
    if (!materia) return res.status(404).json({ message: 'Matéria-prima não encontrada' });
    res.json({ message: 'Matéria-prima removida' });
  } catch (err) {
    next(err);
  }
};
