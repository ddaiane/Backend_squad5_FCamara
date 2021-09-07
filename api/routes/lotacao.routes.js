const express = require("express");
const router = express.Router();
const {consultaCapacidadeEscritorio, alterarCapacidadeEscritorio} = require("../models/lotacao");

router.get("/lotacao", consultaCapacidadeEscritorio);
router.patch("/lotacao", alterarCapacidadeEscritorio);

module.exports = router;