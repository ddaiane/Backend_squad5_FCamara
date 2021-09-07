const express = require("express");
const router = express.Router();
const {selectUsuarios, selectUmUsuario} = require("../models/usuarios");

router.get("/", selectUsuarios);
router.get("/:id_usuario", selectUmUsuario);

module.exports = router;