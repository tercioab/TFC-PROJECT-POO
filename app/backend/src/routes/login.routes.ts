import { Router } from 'express';
import validateLogin from '../middlewares/user.middlewares';

import UsersController from '../controller/user.controller';

const routers = Router();

routers.post('/', validateLogin, UsersController.findUser);

export default routers;
