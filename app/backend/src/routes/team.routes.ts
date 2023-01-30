import { Router } from 'express';
import TeamController from '../controller/team.controller';
import LeaderBoardController from '../controller/leaderboard.controller';

const routers = Router();

const team = new TeamController();
const leader = new LeaderBoardController();

routers.get('/teste', (req, res) => leader.tableTest(req, res));
routers.get('/', (req, res) => team.all(req, res));
routers.get('/:id', (req, res) => team.byId(req, res));

export default routers;
