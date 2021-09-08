const express = require("express");
const router = express.Router();
const {consultaCapacidadeEscritorio, alterarCapacidadeEscritorio} = require("../controllers/lotacao");

router.get("/:id_escritorio", consultaCapacidadeEscritorio);
router.patch("/lotacao", alterarCapacidadeEscritorio);

module.exports = router;