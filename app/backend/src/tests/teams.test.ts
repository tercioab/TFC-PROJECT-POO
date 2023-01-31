import * as sinon from 'sinon';
import * as chai from 'chai';
import * as timeout from  'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');


import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste teams', () => {
   
    afterEach(sinon.restore)


    it('Retorna o time de acordo com o id', async () => {
        chai.request(app)
        .get('/teams/2')
        .end(function(err, res) {
            expect(res.status).to.be.equal(200);
            expect(res.body.team).to.be.deep.equal("Bahia");
            expect(res.body.id).to.be.deep.equal(2);
        });
    });

    it('Retorna erro se o id não existir', async () => {
        chai.request(app)
            .get('/teams/200')
            .end(function (err, res) {
                expect(res.status).to.be.equal(401);
                expect(res.body).to.be.deep.equal({message: 'There is no team with such id!'})
        })
    })

    
    it('Retorna todos os times', async () => {
        chai.request(app)
            .get('/teams')
            .end(function (err, res) {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.an('array')
        })
    });
})