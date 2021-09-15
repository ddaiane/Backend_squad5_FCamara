//cria tabelas caso não existam no banco
const { QueryTypes } = require("sequelize");
const db = require("./db");

async function createTables() {
    console.log("criando tabelas");
    await usuario();
    await agenda();
    await lotacao();
    console.log("criando escritorios");
    await insereEscritorio(1, 'São Paulo', 600, 40, 240);
    await insereEscritorio(2, 'Santos', 100, 40, 40);
    console.log("criando usuarios");
    await insereUsuarios(2, 'admin', 'admin@gmail.com', '12345', true);
    await insereUsuarios(1, 'Daiane Marcon', 'daianemarcon@gmail.com', '12345', false);
}

//cria as tabelas do bd se ainda nao existirem
async function usuario() {

    const query = `CREATE TABLE IF NOT EXISTS USUARIO (
        id  SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,        
        email VARCHAR(200) NOT NULL,
        senha VARCHAR(20) NOT NULL,
        isAdmin BOOLEAN DEFAULT false)`;

    await db.query(query, {
        type: QueryTypes.INSERT,
    });
}

async function agenda() {

    const query = `CREATE TABLE IF NOT EXISTS AGENDA (
        id_agendamento  SERIAL PRIMARY KEY,
        id_usuario integer NOT NULL,
        data date NOT NULL,
        id_escritorio integer NOT NULL)`;

    await db.query(query, {
        type: QueryTypes.INSERT,
    });
}

async function lotacao() {

    const query = `CREATE TABLE IF NOT EXISTS LOTACAO (
        id_escritorio  SERIAL PRIMARY KEY,
        nome_escritorio VARCHAR(100) NOT NULL,
        capacidade integer NOT NULL,
        porcentagem_permitida integer NOT NULL,
        vagas integer NOT NULL)`;

    await db.query(query, {
        type: QueryTypes.INSERT,
    });
}


//se nao existir ainda, insere na tabela de lotacao a entrada do escritorio de sp e de santos
//pra guardarem as lotacoes 
async function insereEscritorio(id, nome, capacidade, porcentagem, vagas) {

    //verifica se existe a entrada de cada escritorio
    const escritorio = await db.query(
        `SELECT count(1) FROM lotacao WHERE nome_escritorio = '${nome}' AND id_escritorio = ${id}`, {
            type: QueryTypes.SELECT
        }
    );
    //cria caso nao exista
    if (escritorio[0]["count"] == 0) {
        await db.query(
            `INSERT INTO lotacao (nome_escritorio, capacidade, porcentagem_permitida, vagas) 
      VALUES('${nome}', ${capacidade}, ${porcentagem}, ${vagas})`, {
                type: QueryTypes.INSERT,
            }
        );
    }
}

//se ainda não existir, cria um usuário admin e um usuário normal para testes
async function insereUsuarios(id, nome, email, senha, isAdmin) {
    const usuario = await db.query(
        `SELECT count(1) FROM usuario WHERE id = ${id} AND isAdmin = ${isAdmin} AND nome = '${nome}'`, {
            type: QueryTypes.SELECT
        }
    );
    if (usuario[0]["count"] == 0) {
        await db.query(
            `INSERT INTO usuario (nome, email, senha, isAdmin) 
      VALUES('${nome}', '${email}', '${senha}', ${isAdmin})`, {
                type: QueryTypes.INSERT,
            }
        );
    }
}


createTables();

module.exports = {
    createTables
};