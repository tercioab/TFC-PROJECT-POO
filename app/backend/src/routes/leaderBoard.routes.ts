import { Router } from 'express';

import LeaderBoardController from '../controller/leaderboard.controller';

const routers = Router();

const leader = new LeaderBoardController();

routers.get('/home', (req, res) => leader.leaderBoardHome(req, res));
routers.get('/away', (req, res) => leader.leaderBoardAway(req, res));

export default routers;
