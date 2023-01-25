import { Router } from 'express';
import validateLogin from '../middlewares/user.middlewares';

import UsersController from '../controller/user.controller';

const routers = Router();

const user = new UsersController();

routers.post('/login', validateLogin, user.findUser);

export default routers;
