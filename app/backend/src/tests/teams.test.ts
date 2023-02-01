import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

const { expect } = chai;
chai.use(chaiHttp);

describe('Teste teams', () => {
   
    afterEach(sinon.restore);

        it('Retorna o time de acordo com o id', async () => {
            const result = await chai.request(app).get('/teste');
            expect(result.status).to.be.equal(200);
            // expect(result.body).to.be.an('array')
        // const response = await axios.get('/teams/2');
        // expect(response.status).to.equal(200);
        // expect(response.data.name).to.equal('Bahia');
        });
    

   
})