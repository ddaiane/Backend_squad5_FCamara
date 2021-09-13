const { verificaEscritorio } = require("./uteis");

async function escritorioValido(req, res, next){
  if(await verificaEscritorio(req.params.id_escritorio)){
    next();
  } else{
    res.status(400).json({message: "Escritorio inválido"});
  }
}

module.exports = {escritorioValido};
