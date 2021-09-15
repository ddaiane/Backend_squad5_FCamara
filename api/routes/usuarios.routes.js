const express = require("express");
const router = express.Router();
const {selectUsuarios, selectUmUsuario, criarUsuario} = require("../models/usuarios");

router.get("/", selectUsuarios);
router.get("/:id_usuario", selectUmUsuario);
router.post("/", criarUsuario);

module.exports = router;