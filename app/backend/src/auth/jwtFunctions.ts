import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import IUser from '../interface/IUser';

export default class JWT {
  private _secret: string;
  private _jwtConfig: SignOptions;

  constructor() {
    this._secret = process.env.JWT_SECRET || 'jwt_secret';
    this._jwtConfig = { algorithm: 'HS256', expiresIn: '10h' };
  }

  public generateToken(data: IUser) {
    const token = jwt.sign(data, this._secret, this._jwtConfig);
    return token;
  }

  public verifyToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(400).json({ message: 'Token not found' });
    }
    try {
      const decode = jwt.verify(authorization, this._secret);
      req.body.user = decode;
      next();
    } catch (e) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
