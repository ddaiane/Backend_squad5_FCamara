const { verificaEscritorio, conferenciaDeUsuario, buscaAgendamento, 
        usuarioAgendamento, conferenciaDeDataNaoRepetida } = require("./uteis");


async function escritorioValido(req, res, next){ //verifica se o id de escritorio enviado é de um escritorio cadastrado
  let id_escritorio;
  req.method == 'POST' ? id_escritorio = req.body.id_escritorio : id_escritorio = req.params.id_escritorio;
  if(await verificaEscritorio(id_escritorio)){
    next();
  } else{
    res.status(400).json({message: "Escritorio inválido"});
  }
}

async function usuarioExiste(req, res, next) { //verifica se usuario existe no BD
  let id_usuario;
  req.method == 'POST' ? id_usuario = req.body.id_usuario : id_usuario = req.params.id_usuario
  if ((await conferenciaDeUsuario(id_usuario))) {
    next();
  } else {
    return res.status(404).json({
      message: "Usuario não encontrado",
    });
  }
  
}

async function agendamentoPertenceUsuario(req, res, next) { //verifica se o agendamento existe e se o agendamento pertence ao usuario
  let id_usuario;
  let id_agendamento = req.params.id_agendamento
  if(req.method == 'DELETE') {
    id_usuario = req.params.id_usuario
  }
  else if(req.method == 'PATCH') {
    id_usuario = req.body.id_usuario
  }
  if (!(await buscaAgendamento(id_agendamento)) || (await usuarioAgendamento(id_agendamento)) != id_usuario) {
    return res.status(404).json({
      message: "Agendamento não existe ou não pertence ao usuário",
    });
  }
  else {
    next();
  }
}

async function dataNaoRepetida(req, res, next) {//verifica se usuario nao tem ja outra reserva no mesmo dia
  const { id_usuario, data } = req.body;
  if (!(await conferenciaDeDataNaoRepetida(id_usuario, data))) {
    return res.status(400).json({
      mensagem: "Você já possui reserva para esse dia",
    });
  }
  else { next();}
}




module.exports = {escritorioValido, usuarioExiste, agendamentoPertenceUsuario, dataNaoRepetida};
