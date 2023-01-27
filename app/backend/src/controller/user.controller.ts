import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController {
  private _userService: UserService;

  constructor() {
    this._userService = new UserService();
    this.userRole = this.userRole.bind(this);
  }

  async findUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, message, token } = await this._userService.findUser(
      email,
      password,
    );
    const jsonResponse = token ? { token } : { message };
    return res.status(status).json(jsonResponse);
  }

  userRole = async (req: Request, res: Response) => {
    const { role } = req.body.user;
    res.status(200).json({ role });
  };
}

export default UserController;
