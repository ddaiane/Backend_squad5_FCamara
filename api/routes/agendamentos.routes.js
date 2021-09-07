const express = require("express");
const router = express.Router();
const {
  criarAgendamento,
  excluirAgendamento,
  alterarAgendamento,
  listarAgendamentos,
} = require("../models/agendamento");

router.post("/agendamento", criarAgendamento);
router.delete("/agendamento", excluirAgendamento);
router.patch("/agendamento", alterarAgendamento);
router.get("/:id_usuario", listarAgendamentos);

module.exports = router;
