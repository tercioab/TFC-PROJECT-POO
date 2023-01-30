import { Router } from 'express';

import LeaderBoardController from '../controller/leaderboard.controller';

const routers = Router();

const leader = new LeaderBoardController();

routers.get('/home', (req, res) => leader.leaderBoard(req, res));

export default routers;
