var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var swaggerUi = require("swagger-ui-express");
var cors = require("cors");

//inicia a banco
const initSQL = require('./DB/init');
//createTables();

// view engine setup
/* app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); */
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



//entrega os css, imagens e scripts
//entregando esse apenas pra testar como ta a saida dos dados e a conexao entre tudo, quando integrar com o react tem que mudar aqui!
app.use(express.static(path.join(__dirname, 'public')));





//caminhos rotas em variaveis
var usuariosRouter = require('./routes/usuarios.routes');
var agendamentosRouter = require('./routes/agendamentos.routes');
var calendarioRouter = require('./routes/calendario.routes');
var lotacaoRouter = require('./routes/lotacao.routes');


//aponta rotas
app.use('/api/usuarios', usuariosRouter); 
app.use('/api/agendamentos', agendamentosRouter);
app.use('/api/calendario', calendarioRouter);
app.use('/api/lotacao', lotacaoRouter);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(require("./swagger.json")));

//entrega paginas
var indexPath = __dirname + "/views/index.html";
app.get("*", function(req, res) {
   res.sendFile(indexPath);
 });


//tratamentos de erros
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // entrega mensagem de erro
  res.status(err.status || 500);
  res.json(err.message.toString());
});

module.exports = app;
