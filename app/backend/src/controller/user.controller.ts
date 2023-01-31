import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController {
  private _userService: UserService;

  constructor() {
    this._userService = new UserService();
    this.userRoleToValidate = this.userRoleToValidate.bind(this);
  }

  async findUserToLogin(req: Request, res: Response) {
    const { status, message, token } = await this._userService.findUser(
      req.body,
    );
    const jsonResponse = token ? { token } : { message };
    return res.status(status).json(jsonResponse);
  }

  userRoleToValidate = async (req: Request, res: Response) => {
    const { role } = req.body.user;
    res.status(200).json({ role });
  };
}

export default UserController;
