const express = require("express");
const router = express.Router();
const {
  criarAgendamento,
  excluirAgendamento,
  alterarAgendamento,
  listarAgendamentos,
} = require("../models/agendamento");

//middlewares de verificação antes de ir para o model
const { escritorioValido, usuarioExiste, agendamentoPertenceUsuario, dataNaoRepetida } = require("../models/middlewares");

router.get("/:id_usuario", usuarioExiste, listarAgendamentos);
router.post("/", usuarioExiste, escritorioValido, dataNaoRepetida, criarAgendamento);
router.patch("/:id_agendamento", agendamentoPertenceUsuario, dataNaoRepetida, alterarAgendamento);
router.delete("/:id_usuario/:id_agendamento", agendamentoPertenceUsuario, excluirAgendamento);

module.exports = router;
