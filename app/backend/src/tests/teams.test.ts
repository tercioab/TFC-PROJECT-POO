
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team.model';

import { Response } from 'superagent';
import { response } from 'express';

import { teamsArray, oneTeam } from './mock/Teams.mock';

chai.use(chaiHttp);

const { expect } = chai;



describe('Teams test', () => {
  afterEach(sinon.restore);

  it('1 retorna todos os times', async () => {
    sinon.stub(Team, 'findAll').resolves(teamsArray as any)
    const result = await chai
    .request(app)
    .get('/teams')
    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.an('array')
  });

  it('2 se inserir o id 7 retorna teamName: Flamengo', async () => {
    sinon.stub(Team, 'findOne').resolves(oneTeam as any)
    const result = await chai
    .request(app)
    .get('/teams/7')
    expect(result.status).to.be.equal(200);
      expect(result.body).to.be.deep.equal({ id: 7, teamName: 'Flamengo' });
  });
    
  it('3 Retorna erro se enserir um id inexistente ', async () => {
    sinon.stub(Team, 'findOne').resolves(null as any)
    const result = await chai
    .request(app)
    .get('/teams/470')
    expect(result.status).to.be.equal(404);
    expect(result.body).to.be.deep.equal({ message: 'There is no team with such id!' });
  });

  
  });
