import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import usersModel from '../database/models/User.model';

chai.use(chaiHttp);

const { expect } = chai;

const validUser = {
    username: 'User',
    role: 'user',
    email: 'user@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
}

const invalidUser = {
    username: 'invalidUser',
    role: 'invalidUser@gmail.com',
    email: 'invalidUser',
    password: '$2a$08$Yyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc" 

describe('Testes login', () => {
    afterEach(sinon.restore)
    it('01. Verifica se o login foi feito com sucesso', async () => {
        const result = await chai.request(app).post('/login').send({ email: validUser.email, password: validUser.password })
        expect(result.status).to.be.equal(200)
        expect(result.body).to.have.property('token');
    })

    it('02. Verifica se o email foi informado', async () => {
        const result = await chai.request(app).post('/login').send({ password: validUser.password })
        expect(result.status).to.be.equal(400);
        expect(result.body).to.be.deep.equal({message: 'All fields must be filled'})
    })

    it('03. Verifica se a senha foi informada', async () => {
        const result = await chai.request(app).post('/login').send({ password: validUser.email })
        expect(result.status).to.be.equal(400);
        expect(result.body).to.be.deep.equal({message: 'All fields must be filled'})
    })

    it('04. Verifica se os dados são validos', async () => {
        const result = await chai.request(app).post('/login').send({ email: invalidUser.email, password: invalidUser.password })
        expect(result.status).to.be.equal(401);
        expect(result.body).to.be.deep.equal({message: 'Incorrect email or password'})
    })

    it('05. Verifica retorna erro com formato de email invalido', async () => {
        const result = await chai.request(app).post('/login').send({ email: "astrowest", password: invalidUser.password })
        expect(result.status).to.be.equal(401);
        expect(result.body).to.be.deep.equal({message: 'Incorrect email or password'})
    })

    it('06. não realiza login com a senha incorreta', async () => {
        const result = await chai.request(app).post('/login').send({ email: validUser.email, password: "astrowest" })
        expect(result.status).to.be.equal(401);
        expect(result.body).to.be.deep.equal({message: 'Incorrect email or password'})
    })

    it('07. Rota validate retorna a role do usuário', async () => {
        sinon.stub(usersModel, 'findOne').resolves({ dataValues: validUser } as any);
        const result = await chai.request(app).get('/login/validate').set('Authorization', token);
        expect(result.status).to.be.equal(200);
        expect(result.body).to.have.property('role');
        expect(result.body.role).to.have.equal('admin');
    });
    

    it('08. É possível realizar o login com sucesso.', async () => {
        sinon.stub(usersModel, 'findOne').resolves({ dataValues: validUser } as any);
        const result = await chai.request(app).post('/login').send({ email: validUser.email, password: "secret_admin" });
        expect(result.status).to.be.equal(200);
        expect(result.body).to.have.property('token');
    });

    it('09. retorna "Token not found" se o token for incorreto', async () => {
        const result = await chai.request(app).get('/login/validate');
        expect(result.status).to.be.equal(400);
        expect(result.body.message).to.have.equal('Token not found');
      });
    
})