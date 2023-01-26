# Trybe Futebol Clube (TFC)

Esse projeto é um site informativo sobre partidas e classificações de futebol. Ele foi desenvolvido com uma API consumindo um banco de dados MySQL, utilizando princípios SOLID e arquitetura MSC com TypeScript, POO e dockerização (dockerfile, docker-compose). A modelagem de dados foi feita através do Sequelize, para ser consumida por um front-end já construído pelo time da Trybe.

A API é responsável por:
- Armazenar e manipular dados com MySQL através do Sequelize;
- Autenticação de usuário;
- Listar os clubes cadastrados;
- Listar as partidas em andamento e finalizadas;
- Criar novas partidas;
- Atualizar o placar em partidas em andamento;
- Finalizar partidas em andamento;
- Gerar um leaderboard de time de fora e time de casa, e de modo geral, utilizando ordenação avaliativa de critérios para o placar;
- Realizando a dockerização do back-end e front-end, utilizando docker-compose.

## Tecnologias utilizadas

* Node.js
* Express
* Programação orientada a objetos (POO)
* TypeScript
* Testes usando Mocha, Chai e Sinon
* Sequelize
* MySQL
* Docker

## Bibliotecas utilizadas

* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [JWT](https://www.npmjs.com/package/jsonwebtoken)

## Rodando localmente

Obs: Necessário ter instalado o docker e o docker-compose.

1. Clone este repositório  
```git@github.com:LuccaRendall/projeto-trybe-futebol-clube.git ```

2. Entre na pasta do projeto:   
```cd Trybe-futebol-clube ```

3. Inicie os containeres:  
```npm run compose:up ou docker-compose up -d --build```

4. Para fazer login no front-end:   
 - login: admin@admin,com  
 - senha: secret_admin

5. Para rodar os testes de integração, entre na pasta da aplicação:  
``` cd app && docker-compose exec backend npm test ```

6. Para remover a API:   
``` docker-compose down --rmi local --volumes --remove-orphans ```


