
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Match.model';

import { Response } from 'superagent';
import { response } from 'express';

import { allMatches} from './mock/Matches.mock';

chai.use(chaiHttp);

const { expect } = chai;


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkeGkuSHhrMWN6QU8wblpSLi5CMzkzdTEwYUVEMFJRMU4zUEFFWFE3SHh0TGpLUEVaQnUuUFciLCJpYXQiOjE2NzUyMzQyNDMsImV4cCI6MTY3NTI3MDI0M30.st0L1sei6ZM9EJ5sijZ8dWX26h4HprO2-YxnYohVhhI"

describe('Matches', () => {
  afterEach(sinon.restore);

  it('1 retorna todas as partidas', async () => {
    sinon.stub(Matches, 'findAll').resolves(allMatches as any)
    const result = await chai.request(app).get('/matches')
    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.an('array')

  });

  it('2 Verifica que a partida é finalizada com sucesso ', async () => {
    sinon.stub(Matches, 'update').resolves([1] as any);
    const result = await chai
      .request(app)
        .patch('/matches/1/finish')
          .set('Authorization', token)      
          expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal({
      "message": "Finished"
    });
  });
  
    
  
  });
