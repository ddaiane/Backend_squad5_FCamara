const express = require("express");
const router = express.Router();
const {
  criarAgendamento,
  excluirAgendamento,
  alterarAgendamento,
  listarAgendamentos,
} = require("../models/agendamento");
const { escritorioValido } = require("../models/middlewares");

router.get("/:id_usuario", listarAgendamentos);
router.post("/", criarAgendamento);
router.patch("/:id_escritorio", escritorioValido, alterarAgendamento);
router.delete("/:id_agendamento", excluirAgendamento);

module.exports = router;
