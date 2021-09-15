const express = require("express");
const router = express.Router();
const {
  consultaCapacidadeEscritorio,
  alterarCapacidadeEscritorio,
  criarEscritorio
} = require("../models/lotacao");
const { escritorioValido } = require("../models/middlewares");

router.use("/:id_escritorio", escritorioValido);
router.get("/:id_escritorio", consultaCapacidadeEscritorio);
router.patch("/:id_escritorio", alterarCapacidadeEscritorio);
router.post("/", criarEscritorio);

module.exports = router;
