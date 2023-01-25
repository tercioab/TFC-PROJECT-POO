import { Router } from 'express';
import validateLogin from '../middlewares/user.middlewares';

import UserController from '../controller/user.controller';

const routers = Router();

const user = new UserController();

routers.post('/',validateLogin , (req, res) => user.findUser(req, res));

export default routers;
