import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');


import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste teams', () => {
    afterEach(sinon.restore)

    it('Retorna o time de acordo com o id', async () => {
        const result = await chai.request(app).get('/teams/2');
        expect(result.status).to.be.equal(200);
        expect(result.body.team).to.be.deep.equal("Bahia");
        expect(result.body.id).to.be.deep.equal(2);
    });

    it('Retorna erro se o id não existir', async () => {
        const result = await chai.request(app).get('/teams/2000');
        expect(result.status).to.be.equal(401);
        expect(result.body).to.be.deep.equal({ message: 'There is no team with such id!' });
    });
    
    it('Retorna todos os times', async () => {
        const result = await chai.request(app).get('/teams');
        expect(result.status).to.be.equal(200);
        expect(result.body).to.be.an('array')
    });
})