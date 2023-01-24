

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

describe('Testes login', () => {
    afterEach(sinon.restore)
    it('Verifica se o email foi informado', async () => {
        const result = await chai.request(app).post('/login').send({ password: validUser.password })
        expect(result.status).to.be.equal(400);
        expect(result.body).to.be.deep.equal({message: 'All fields must be filled'})
    })

    it('Verifica se a senha foi informada', async () => {
        const result = await chai.request(app).post('/login').send({ password: validUser.email })
        expect(result.status).to.be.equal(400);
        expect(result.body).to.be.deep.equal({message: 'All fields must be filled'})
    })
    it('Verifica se o login foi feito com sucesso', async () => {
        const result = await chai.request(app).post('/login').send({ email: validUser.email, password: validUser.password })
        expect(result.status).to.be.equal(200)
        expect(result.body).to.have.property('token');
    })
})