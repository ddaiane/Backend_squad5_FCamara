const express = require("express");
const router = express.Router();
const {consultaCapacidadeEscritorio, alterarCapacidadeEscritorio} = require("../models/lotacao");

router.get("/:id_escritorio", consultaCapacidadeEscritorio);
router.patch("/", alterarCapacidadeEscritorio);

module.exports = router;