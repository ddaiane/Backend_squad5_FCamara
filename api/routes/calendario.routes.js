const express = require("express");
const router = express.Router();
const {listarTodosAgendamentos} = require("../models/calendario.js");

router.get("/:id_escritorio", listarTodosAgendamentos);

module.exports = router;