const express = require("express");
var router = express.Router();
const {selectConsulters} = require("../models/consultores");

router.get("/", selectConsulters);

module.exports = router;