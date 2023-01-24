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
        expect(result.body.teamName).to.be.deep.equal("Bahia");
      });
    

      it('Retorna erro se o id não existir', async () => {
        const result = await chai.request(app).get('/teams/2000');
        expect(result.status).to.be.equal(401);
        expect(result.body).to.be.deep.equal({ message: 'There is no team with such id!' });
      });


    // it('', async () => {

    // })


    // it('', async () => {

    // })


    // it('', async () => {

    // })
    
})