
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Match.model';

import { Response } from 'superagent';
import { response } from 'express';

import { allMatches, oneMatch } from './mock/Matches.mock';

chai.use(chaiHttp);

const { expect } = chai;



describe('Matches', () => {
  afterEach(sinon.restore);

  it('1 retorna todas as partidas', async () => {
    sinon.stub(Matches, 'findAll').resolves(allMatches as any)
    const result = await chai.request(app).get('/matches')
    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.an('array')

  });

  it('2 se inserir o id ', function (done) {
    this.timeout(20000);
    sinon.stub(Matches, 'findOne').resolves(oneMatch as any);
    chai
      .request(app)
      .patch('/matches/1/finish')
      .then((result) => {
        expect(result.status).to.equal(200);
        expect(result.body).to.deep.equal({
          "message": "Finished"
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  
    
  
  });
