import * as bcrypt from 'bcryptjs';
import usersModel from '../database/models/User.model';
import JWT from '../auth/jwtFunctions';
import IResponse from '../interface/IResponse';

export default class UserService {
  private _usersModel;
  private _jwt;

  constructor() {
    this._usersModel = usersModel;
    this._jwt = new JWT();
  }

  public async findUser(email: string, password: string): Promise<IResponse> {
    const user = await this._usersModel.findOne({ where: { email } });
    const message = 'Incorrect email or password';

    if (!user) {
      return { status: 401, message };
    }

    const checkPassword = await bcrypt.compare(password, user.dataValues.password);
    if (checkPassword === false) {
      return { status: 401, message };
    }

    const token = this._jwt.generateToken(user.dataValues);
    return { status: 200, token };
  }
}
