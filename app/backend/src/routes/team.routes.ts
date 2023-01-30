import { Router } from 'express';
import TeamController from '../controller/team.controller';

const routers = Router();

const team = new TeamController();

routers.get('/', (req, res) => team.all(req, res));
routers.get('/:id', (req, res) => team.byId(req, res));

export default routers;
