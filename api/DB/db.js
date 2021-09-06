async function connect() {
    if (global.connection) return global.connection.connect();
  
    //postgres://usuario:senha@servidor:porta/banco
    const { Pool } = require("pg");
    var config = {
        user: 'xxxx', 
        database: 'xxx', 
        password: 'xxxx', 
        host: 'xxxxx', 
        port: 5432, 
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000
    };
    const pool = new Pool(config);
  
    //apenas testando a conexão
    const client = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");
  
    const res = await client.query("SELECT NOW()");
    console.log(res.rows[0]);
    client.release();
  
    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect();
  }
  
  connect();
  
  
  
  module.exports = {connect};