//cria tabelas caso não existam no banco

const { connect } = require('./db.js');

async function createTables() {   
     
    await usuario();
    await agendaSP();
    await agendaSantos();
    await lotacao();

}

async function usuario() {
    console.log("entrou usuario");
    const db = await connect();
    
    const query = `CREATE TABLE IF NOT EXISTS USUARIO (
        id  SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,        
        email VARCHAR(200) NOT NULL,
        senha VARCHAR(20) NOT NULL,
        isAdmin BOOLEAN DEFAULT false)`;

    
        await db.query(query);
     
}

async function agendaSP() {
    console.log("entrou agendasp");

    const db = await connect();

    const query = `CREATE TABLE IF NOT EXISTS AGENDASP (
        id_agendamento  SERIAL PRIMARY KEY,
        id_usuario integer NOT NULL,
        data date NOT NULL,
        id_escritorio integer DEFAULT 1)`;

        await db.query(query);
    
}

async function agendaSantos() {
    console.log("entrou agenda santos");

    const db = await connect();

    const query = `CREATE TABLE IF NOT EXISTS AGENDASANTOS (
        id_agendamento  SERIAL PRIMARY KEY,
        id_usuario integer NOT NULL,
        data date NOT NULL,
        id_escritorio integer DEFAULT 2)`;

        await db.query(query);
}

async function lotacao() {
    console.log("entrou lotacao");

    const db = await connect();

    const query = `CREATE TABLE IF NOT EXISTS LOTACAO (
        id_escritorio  SERIAL PRIMARY KEY,
        nome_escritorio VARCHAR(100) NOT NULL,
        capacidade integer NOT NULL,
        porcentagem_permitida numeric(4,3) NOT NULL)`;

        await db.query(query);
}

createTables();

module.exports = {
    createTables
};