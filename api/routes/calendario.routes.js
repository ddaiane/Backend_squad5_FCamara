const express = require("express");
const app = require("../app.js");
const router = express.Router();
//models
const {listarTodosAgendamentos, listarVagasPorDia} = require("../models/calendario.js");
//middleware de verificação
const { escritorioValido } = require("../models/middlewares");

router.get("/:id_escritorio/:mes/:ano", escritorioValido, listarTodosAgendamentos);
router.get("/vagas/:id_escritorio", escritorioValido, listarVagasPorDia);

module.exports = router;