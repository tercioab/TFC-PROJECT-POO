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
    const message = 'Incorrect email or password';
    const status = 401;
    const user = await this._usersModel.findOne({ where: { email } });

    if (!user) {
      return { status, message };
    }
    const checkPassword = await bcrypt.compare(password, user.dataValues.password);
    if (checkPassword === false) {
      return { status, message };
    }
    const userToken = this._jwt.generateToken(user.dataValues);
    return { status: 200, message: userToken };
  }
}
