const express = require("express");
const router = express.Router();
const {
  criarAgendamento,
  excluirAgendamento,
  alterarAgendamento,
  listarAgendamentos,
} = require("../models/agendamento");

router.post("/agendamento", criarAgendamento);
router.patch("/agendamento", alterarAgendamento);
router.delete("/:id_agendamento&:id_escritorio", excluirAgendamento);
router.get("/:id_usuario", listarAgendamentos);

module.exports = router;
