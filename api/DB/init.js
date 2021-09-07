//cria tabelas caso não existam no banco

const { connect } = require('./db.js');

async function createTables() {   
     
    await usuario();
    await agendaSP();
    await agendaSantos();
    await lotacao();
    await insereEscritorio();

}

async function usuario() {
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

    const db = await connect();

    const query = `CREATE TABLE IF NOT EXISTS AGENDASP (
        id_agendamento  SERIAL PRIMARY KEY,
        id_usuario integer NOT NULL,
        data date NOT NULL,
        id_escritorio integer DEFAULT 1)`;

        await db.query(query);
    
}

async function agendaSantos() {

    const db = await connect();

    const query = `CREATE TABLE IF NOT EXISTS AGENDASANTOS (
        id_agendamento  SERIAL PRIMARY KEY,
        id_usuario integer NOT NULL,
        data date NOT NULL,
        id_escritorio integer DEFAULT 2)`;

        await db.query(query);
}

async function lotacao() {

    const db = await connect();

    const query = `CREATE TABLE IF NOT EXISTS LOTACAO (
        id_escritorio  SERIAL PRIMARY KEY,
        nome_escritorio VARCHAR(100) NOT NULL,
        capacidade integer NOT NULL,
        porcentagem_permitida integer NOT NULL,
        vagas integer NOT NULL)`;

        await db.query(query);
}

//se nao existir ainda, insere na tabela de lotacao a entrada do escritorio de sp e de santos
//pra guardarem as lotacoes 
async function insereEscritorio() {
    const db = await connect();

    const query = `SELECT * FROM LOTACAO where nome_escritorio = 'Santos'`;
    //se false, precisa adicionar o escritorio
    const santos = await db.query(query);
    if (santos.rowCount === 0) {
          //nao existe no bd, precisa add chamar funcao que adiciona
    }
    const query2 = `SELECT * FROM LOTACAO where nome_escritorio = 'agendaSP'`;
    //se false, precisa adicionar o escritorio
    const sp = await db.query(query2);
    if (sp.rowCount === 0) {
          //nao existe no bd, precisa add chamar funcao que adiciona
    }
    
}



createTables();

module.exports = {
    createTables
};