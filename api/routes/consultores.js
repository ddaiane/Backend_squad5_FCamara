const express = require("express");
var router = express.Router();
const {selectConsulters} = require("../models/consultores");
console.log("entrou na rota consultores")
router.get("/", selectConsulters);

module.exports = router;