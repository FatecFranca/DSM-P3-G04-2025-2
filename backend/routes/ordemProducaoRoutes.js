const express = require("express");
const router = express.Router();

const ordemController = require("../controllers/ordemProducaoController");

router.post("/", ordemController.criarOrdem);
router.get("/", ordemController.listarOrdens);
router.get("/:id", ordemController.buscarPorId);
router.put("/:id", ordemController.atualizarOrdem);
router.delete("/:id", ordemController.removerOrdem);

module.exports = router;
