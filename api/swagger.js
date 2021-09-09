const swaggerAutogen = require("swagger-autogen");
swaggerAutogen()("./swagger.json", [
  "./routes/usuarios.routes.js",
  "./routes/lotacao.routes.js",
  "./routes/calendario.routes.js",
  "./routes/agendamentos.routes.js"
]);
