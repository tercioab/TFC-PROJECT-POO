import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async findUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const { status, message } = await this.userService.findUser(email, password);
    try {
      if (status === 200) {
        res.status(status).json({ token: message });
      } else {
        res.status(status).json({ message });
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default UserController;
