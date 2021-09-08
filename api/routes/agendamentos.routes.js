const express = require("express");
const router = express.Router();
const {
  criarAgendamento,
  excluirAgendamento,
  alterarAgendamento,
  listarAgendamentos,
} = require("../models/agendamento");

router.post("/", criarAgendamento);
router.patch("/", alterarAgendamento);
router.delete("/", excluirAgendamento);

//router.delete("/:id_agendamento&:id_escritorio", excluirAgendamento);
router.get("/:id_usuario", listarAgendamentos);

module.exports = router;
