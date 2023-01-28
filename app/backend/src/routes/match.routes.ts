import { Router } from 'express';

import MatchController from '../controller/match.controller';

const routers = Router();

const matches = new MatchController();

// routers.get('/', (req, res) => match.progressMatch(req, res));
routers.get('/', (req, res) => matches.getMatches(req, res));

export default routers;
