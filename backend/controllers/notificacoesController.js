const Notificacao = require('../models/Notificacao');

// GET /api/notificacoes
exports.getAll = async (req, res, next) => {
  try {
    const notifs = await Notificacao.find().sort({ createdAt: -1 });
    res.json(notifs);
  } catch (err) {
    next(err);
  }
};

// PUT /api/notificacoes/:id/ler - marcar como lida
exports.markRead = async (req, res, next) => {
  try {
    const notif = await Notificacao.findByIdAndUpdate(req.params.id, { lida: true }, { new: true });
    if (!notif) return res.status(404).json({ message: 'Notificação não encontrada' });
    res.json(notif);
  } catch (err) {
    next(err);
  }
};
