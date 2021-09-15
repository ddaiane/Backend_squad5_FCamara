const { verificaEscritorio, conferenciaDeUsuario, buscaAgendamento, 
        usuarioAgendamento, conferenciaDeDataNaoRepetida, verificaVagaLivre, verificaDiadeSemana } = require("./uteis");


async function escritorioValido(req, res, next){ //verifica se o id de escritorio enviado é de um escritorio cadastrado
  try {
    let id_escritorio;
  req.method == 'POST' ? id_escritorio = req.body.id_escritorio : id_escritorio = req.params.id_escritorio;
  if(await verificaEscritorio(id_escritorio)){
    next();
  } else{
    res.status(400).json({message: "Escritorio inválido"});
  }
  } catch (error) {
    res.status(400).json(error)
  }
}

async function usuarioExiste(req, res, next) { //verifica se usuario existe no BD
  try {
    let id_usuario;
  req.method == 'POST' ? id_usuario = req.body.id_usuario : id_usuario = req.params.id_usuario
  if ((await conferenciaDeUsuario(id_usuario))) {
    next();
  } else {
    return res.status(404).json({
      message: "Usuario não encontrado",
    });
  }
  } catch (error) {
    res.status(400).json(error)
  } 
}

async function agendamentoPertenceUsuario(req, res, next) { //verifica se o agendamento existe e se o agendamento pertence ao usuario
  try {
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
  } catch (error) {
    res.status(400).json(error)
  }  
}

async function dataNaoRepetida(req, res, next) {//verifica se usuario nao tem ja outra reserva no mesmo dia
  try {
    const { id_usuario, data } = req.body;
    if (!(await conferenciaDeDataNaoRepetida(id_usuario, data))) {
      return res.status(400).json({
        mensagem: "Você já possui reserva para esse dia",
      });
    }
    else { next();}  
  } catch (error) {
    res.status(400).json(error)
  }
}

async function temVaga(req, res, next) { //verifica se tem vaga livre nesse dia nesse escritorio
  try {
    const { id_escritorio, data } = req.body;
  if (!id_escritorio || !data) {res.status(400).json({mensagem: "Campos faltando"});}
  (await verificaVagaLivre(id_escritorio, data)) ? next() : res.status(400).json({mensagem: "Não há vaga livre neste dia neste escritorio"})  
  } catch (error) {
    res.status(400).json(error)
  }
  }

  async function DiadeSemana(req, res, next) { //verifica se é dia de semana
    try {
      const {data} = req.body;
      (await verificaDiadeSemana(data)) ? next() : res.status(400).json({mensagem: "Data é fim de semana"})
      
    } catch (error) {
      res.status(400).json(error)
    }
  }



module.exports = {escritorioValido, usuarioExiste, agendamentoPertenceUsuario, dataNaoRepetida, temVaga, DiadeSemana};
