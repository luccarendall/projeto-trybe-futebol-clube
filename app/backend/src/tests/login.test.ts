import * as sinon from 'sinon';
import * as chai from 'chai';
import * as JWT from 'jsonwebtoken';

// O lint indica que tá errado mas se coloco com o from o test:coverage quebra
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';

chai.use(chaiHttp);

const expect = chai.expect;

const userLogin = {
  email: 'lucca@admin.com',
  password: 'secret_admin',
}

const userSeeders =  [
  {
    username: 'luccarendall',
    role: 'lucca',
    email: 'lucca@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      // senha: secret_admin
  },
  {
    username: 'lunamaria',
    role: 'luna',
    email: 'luna@maria.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
      // senha: secret_user
  },
]

const tokenLogin = JWT.sign({ userId: 1 }, 'jwt_secret', {
  expiresIn: '1d',
});

describe('Rota Login', () => {
  describe('Usuário válido', () => {
    beforeEach(async () => {
      sinon.stub(User, 'findOne').resolves(userSeeders[0] as User);
    })

    afterEach(() => {
      (User.findOne as sinon.SinonStub).restore();
    })
    it('Deve retornar o status 200 caso tenha sucesso no login', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(userLogin);

      expect(response.body).to.have.property('token');
      expect(response.status).to.be.equal(200);
    });
  })
  describe('Testes de validações para a rota /Login', () => {
    beforeEach(async () => {
      sinon.stub(User, 'findOne').resolves(userSeeders[0] as User);
    })

    afterEach(() => {
      (User.findOne as sinon.SinonStub).restore();
    })
    it('Deve retornar a role do usuário encontrado', async () => {
      const response = await chai.request(app)
        .get('/login/validate')
        .set('authorization', tokenLogin);
        expect(response.body).to.be.deep.equal({ role: userSeeders[0].role });
        expect(response.status).to.be.equal(200);
    })

    it("Deve retornar status 400, caso não tenha o header Authorization", async () => {
      const response = await chai.request(app).get('/login/validate')
      expect(response.status).to.equal(400)
    })
  })
})