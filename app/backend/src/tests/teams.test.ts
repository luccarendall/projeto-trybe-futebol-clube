// Tentativa de TDD
import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore (resolveu a quebra de lint no require abaixo)
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamsModel';

chai.use(chaiHttp);

const expect = chai.expect;

const mockTeams = [
  {
    team_name: 'team 1',
  },
  {
    team_name: 'team 2',
  },
  {
    team_name: 'team 3',
  },
  {
    team_name: 'team 4',
  },
  {
    team_name: 'team 5',
  },
  {
    team_name: 'team 6',
  },
  {
    team_name: 'team 7',
  },
  {
    team_name: 'team 8',
  },
  {
    team_name: 'team 9',
  },
  {
    team_name: 'team 10',
  },
  {
    team_name: 'team 11',
  },
  {
    team_name: 'team 12',
  },
  {
    team_name: 'team 13',
  },
  {
    team_name: 'team 14',
  },
  {
    team_name: 'team 15',
  },
  {
    team_name: 'team 16',
  },
]

// DOC: https://stackoverflow.com/questions/22762301/mocha-beforeeach-and-aftereach-during-testing
describe('Testes para a rota /Teams', () => {
  describe('Buscando dados', () => {
    beforeEach(() => {
      sinon.stub(Team, 'findAll').resolves(mockTeams as unknown as Team[]);
    })

    afterEach(() => {
      (Team.findAll as sinon.SinonStub).restore();
    })
    it('Deve retornar o status 200 caso tenha sucesso em buscar a lista de times', async () => {
      const response = await chai.request(app).get('/teams');

      expect(response.body).to.be.an('array');
      expect(response.status).to.be.equal(200);
      
      expect(response.body).to.be.deep.equal(mockTeams);
    })
  })
  describe('Deve buscar um time específico segundo a ID', () => {
    beforeEach(() => {
      sinon.stub(Team, 'findOne').resolves(mockTeams[0] as unknown as Team);
    })

    afterEach(() => {
      (Team.findOne as sinon.SinonStub).restore();
    })
    it('Time específico segundo a ID encontrado com sucesso', async () => {
      const response = await chai.request(app).get('/teams/1');
      
      expect(response.body).to.be.an('object');
      expect(response.status).to.be.equal(200);

      expect(response.body).to.be.deep.equal(mockTeams[0]);
    })
  })
});