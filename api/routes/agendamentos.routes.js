const express = require("express");
const router = express.Router();
const {
  criarAgendamento,
  excluirAgendamento,
  alterarAgendamento,
  listarAgendamentos,
} = require("../models/agendamento");

router.post("/", criarAgendamento);
router.patch("/:id_escritorio", alterarAgendamento);
router.delete("/:id_escritorio/:id_agendamento", excluirAgendamento);
router.get("/:id_usuario", listarAgendamentos);

module.exports = router;
