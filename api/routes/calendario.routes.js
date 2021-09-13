const express = require("express");
const router = express.Router();
const {listarTodosAgendamentos, listarVagasPorDia} = require("../models/calendario.js");
const { escritorioValido } = require("../models/middlewares");

router.get("/:id_escritorio/:mes/:ano", escritorioValido, listarTodosAgendamentos);
router.get("/vagas/:id_escritorio", escritorioValido, listarVagasPorDia);

module.exports = router;