import { Request, Response } from 'express';
import UserService from '../services/user.service';

// import { Request, Response } from 'express';
// import UserService from '../services/user.service';

// const findUser = async (req: Request, res: Response) => {
//   const service = new UserService();
//   const { email, password } = req.body;
//   const { status, message } = await service.findUser(email, password);
//   if (status === 200) {
//     res.status(status).json({ token: message });
//   } else {
//     res.status(status).json({ message });
//   }
// };
// export default { findUser };

class UserController {
  private _userService: UserService;

  constructor() {
    this._userService = new UserService();
  }

  async findUser(req: Request, res: Response) {
    console.log(this, '<<<<<<<<<<<<');
    const { email, password } = req.body;
    const { status, message } = await this._userService.findUser(email, password);
    if (status === 200) {
      res.status(status).json({ token: message });
    } else {
      res.status(status).json({ message });
    }
  }
}

export default UserController;
