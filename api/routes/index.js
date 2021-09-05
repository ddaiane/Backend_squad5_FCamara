var express = require('express');
var router = express.Router();

var indexHTML = __dirname + "../../index.html";

/* entrega a pagina inicial do site */
router.get('/', function(req, res, next) {
  res.sendFile(indexHTML);
});

module.exports = router;
