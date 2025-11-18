const express = require('express');
const router = express.Router();
const controller = require('../controllers/notificacoesController');

router.get('/', controller.getAll);
router.put('/:id/ler', controller.markRead);

module.exports = router;
