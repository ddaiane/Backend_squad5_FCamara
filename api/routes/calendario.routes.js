const express = require("express");
const router = express.Router();
const {listarTodosAgendamentos} = require("../models/calendario.js");

router.get("/calendario", listarTodosAgendamentos);

module.exports = router;