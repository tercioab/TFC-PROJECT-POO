import { Router } from 'express';
import JWT from '../auth/jwtFunctions';

import MatchController from '../controller/match.controller';

const routers = Router();

const matches = new MatchController();
const jwt = new JWT();

routers.get('/', (req, res) => matches.getMatches(req, res));
routers.post(
  '/',
  (req, res, next) => jwt.verifyToken(req, res, next),
  (req, res) => matches.createMatch(req, res),
);

export default routers;
