# Sobre o Projeto
Este é o back-end de um projeto para facilitar a migração do trabalho remoto para o híbrido respeitando as normas de segurança, onde os colaboradores de empresas poderão informar os dias em que irão ao escritório e não ultrapassar o máximo de ocupação do local.
O front-end da aplicação está sendo desenvolvido [aqui](https://github.com/g-filipe/login-reserva-fc).

Projeto desenvolvido durante o programa de formação FCamara 2021 Season 2.

#Tecnologias utilizadas
- Nodejs;
- express;
- Banco de dados postgreSQL.

**instruções para executar o projeto:**
Para iniciar a aplicação, é necessário que a sua máquina tenha instalado Nodejs e Git.
- clone o repositório
- Execute `npm install`
- Execute `npm start`
- aplicação funciona em `localhost:3000/api` pelo navegador


*documentação completa das rotas da api em `localhost:3000/api/docs`*

**Pessoas desenvolvedoras**: 

Back-end: [Daiane Marcon](https://github.com/ddaiane) e [Debora Brum](https://github.com/DeboraBrum)

## ROTAS
- **rotas de dados de lotação dos escritórios:**

  - **get: /api/lotacao/:id_escritorio**: 
    - retorna os dados de lotação do escritório (capacidade, porcentagem permitida, vaga, nome do escritorio e id do escritorio)
    - parametros: apenas id_escritorio na url.
    - rota passa por verificação de validade do id_escritorio enviado 
    - status 200 para requisição bem sucedida
  - **patch: /api/lotacao/:id_escritorio**
    - altera os dados de lotação do escritório (capacidade ou porcentagem permitida)
    - parametros: id_escritorio na url. id_usuario, capacidade e porcentagem_permitida no body da requisição
    - rota passa por verificação de validade do id_escritorio e verificação se o usuario enviando a requisição é admin
    - status 200 para requisição bem sucedida
  - **post: /api/lotacao/**
    - cria um novo escritório na base de dados para receber agendamentos
    - parametros: nome do escritorio, capacidade, porcentagem, id_usuario. todos no body da requisição
    - rota passa por verificação se o usuario enviando request é admin, se o nome dado ao escritório está livre e se a porcentagem é valida (> 0 && < 100)
    - status 200 para requisição bem sucedida 
    
- **rotas de agendamentos:**

  - **get: /api/agendamentos/:id_usuario**: 
    - retorna todos os agendamentos FUTUROS do usuário. resultados em ordem cronológica
    - parametros: id_usuario na url.
    - rota passa por verificação de existência do usuário na base de dados
    - status 200 para requisição bem sucedida
  - **post: /api/agendamentos/**: 
    - cria um agendamento e retorna os dados do agendamento (id_agendamento, data, id_usuario, id_escritorio)
    - parametros: id_escritorio, id_usuario, data todos no body da requisição
    - rota passa por verificação de existência do usuário na base de dados, validade do id do escritorio, verificação se usuario não tem outro agendamento no mesmo dia, se tem vaga livre no escritório no dia e se o dia é um dia de semana
    - status 201 para requisição bem sucedida
  - **patch: /api/agendamentos/:id_agendamento**: 
    - altera a data de um agendamento e retorna a nova data que foi salva
    - parametros: id_agendamento na url e os dados do novo agendamento (id_escritorio, data) no body da requisição
    - rota passa por verificação para conferir se agendamento sendo alterado pertence ao usuario, se na nova data solicitada o usuario já não tem outro agendamento, se existe vaga livre no escritório naquele dia e se é dia de semana
    - status 200 para requisição bem sucedida
  - **delete: /api/agendamentos/:id_usuario/:id_agendamento**: 
    - exclui um agendamento e retorna a data do agendamento canceladao
    - parametros: id_usuario e id_agendamento todos na url.
    - rota passa por verificação que confere se o agendamento pertence ao usuário
    - status 200 para requisição bem sucedida
    


- **rotas de dados de usuarios:**

  - **get: /api/usuarios/**: 
    - retorna os dados de todos usuários cadastrados (sem as senhas)
    - parametros: nenhum.
    - status 200 para requisição bem sucedida e 400 ou 404 para mal sucedida
  - **get: /api/usuarios/:id_usuario**: 
    - retorna os dados de um determinado usuário (sem as senhas)
    - parametros: id_usuario na url.
    - status 200 para requisição bem sucedida
  - **post: /api/usuarios/**: 
    - cria um novo usuário e retorna os dados do cadastro (nome, email e id do usuario)
    - parametros: nome, email, senha e isAdmin no body da requisição. isAdmin não é obrigatório.
    - rota passa por verificação se o email já não foi cadastrado no banco de dados
    - status 200 para requisição bem sucedida
    
- **rotas utilitárias para gerenciamento das reservas e de calendários no front:**

  - **get: /api/calendario/:id_escritorio/:mes/:ano**: 
    - retorna todos os agendamentos FUTUROS daquele mês/ano no escritório solicitado. resultados em ordem cronológica
    - parametros: id_escritório a ser pesquisado e mes e ano de interesse, todos na url.
    - rota passa por verificação de validade do id_escritorio
    - status 200 para requisição bem sucedida
  - **get: /api/calendario/vagas/:id_escritorio?data=yyyy-mm-dd**: 
    - retorna a quantidade de vagas livres no escritorio solicitado no dia pesquisado
    - parametros: id_escritorio na url e data tbm na url porém como query params (?data=yyy-mm-dd)
    - rota passa por verificação de validade do id_escritorio
    - status 200 para requisição bem sucedida
  - **get: /api/calendario/vagas/:id_escritorio/:mes/:ano**: 
    - retorna a quantidade de vagas livres em cada dia do mês/ano solicitado que já tiver alguma reserva (os dias que todas vagas estão livres não aparecem e se todos dias tiverem totalmente livres retorna array vazio). retorno é em uma array de objetos cada um contendo data e vagas_livres
    - parametros: id_escritorio, mes e ano todos na url.
    - rota passa por verificação de validade do id_escritorio
    - status 200 para requisição bem sucedida
