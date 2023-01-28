import { Router } from 'express';

import MatchController from '../controller/match.controller';

const routers = Router();

const matches = new MatchController();

routers.get('/', (req, res) => matches.getMatches(req, res));
routers.post('/', (req, res) => matches.createMatch(req, res));

export default routers;
