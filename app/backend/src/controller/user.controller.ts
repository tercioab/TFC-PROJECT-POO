import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController {
  private _userService;

  constructor() {
    this._userService = UserService;
  }

  async findUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, message } = await this._userService.findUser(email, password);
    if (status === 200) {
      res.status(status).json({ token: message });
    } else {
      res.status(status).json({ message });
    }
  }
}

export default new UserController();
