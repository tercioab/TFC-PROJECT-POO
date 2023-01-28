import { Router } from 'express';

import MatchController from '../controller/match.controller';

const routers = Router();

const match = new MatchController();

routers.get('/', (req, res) => match.allMatches(req, res));

export default routers;
