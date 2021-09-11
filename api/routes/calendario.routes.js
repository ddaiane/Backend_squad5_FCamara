const express = require("express");
const router = express.Router();
const {listarTodosAgendamentos, listarVagasPorDia} = require("../models/calendario.js");

router.get("/:id_escritorio/:mes/:ano", listarTodosAgendamentos);
router.get("/vagas/:id_escritorio", listarVagasPorDia);

module.exports = router;