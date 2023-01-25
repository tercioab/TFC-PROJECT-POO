import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import IUser from '../interface/IUser';

export default class JWT {
  private _secret: string;
  private _jwtConfig: SignOptions;
  constructor() {
    this._secret = process.env.JWT_SECRET || 'mysecret';
    this._jwtConfig = { algorithm: 'HS256', expiresIn: '10h' };
  }

  public generateToken(data: IUser) {
    const token = jwt.sign(data, this._secret, this._jwtConfig);
    return token;
  }

  public verifyToken(token: string) {
    const result = jwt.verify(token, this._secret);
    return result;
  }
}
