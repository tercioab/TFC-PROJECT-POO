import { Router } from 'express';
import validateLogin from '../middlewares/user.middlewares';
import JWT from '../auth/jwtFunctions';

import UserController from '../controller/user.controller';

const routers = Router();

const user = new UserController();
const jwt = new JWT();

routers.get(
  '/validate',
  (req, res, next) => jwt.verifyToken(req, res, next),
  (req, res) => user.userRoleToValidate(req, res),
);

routers.post('/', validateLogin, (req, res) => user.findUserToLogin(req, res));

export default routers;
