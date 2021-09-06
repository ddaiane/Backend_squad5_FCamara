const express = require("express");
var router = express.Router();
const {selectUsuarios} = require("../models/usuarios");

router.get("/", selectUsuarios);

module.exports = router;