import { Router } from 'express';
import TeamController from '../controller/team.controller';

const routers = Router();

const team = new TeamController();

routers.get('/', (req, res) => team.allTeams(req, res));

export default routers;
