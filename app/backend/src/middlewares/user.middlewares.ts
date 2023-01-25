import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

export default function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  const emailValidation = Joi.string().email().validate(email);
  const passwordValidation = Joi.string().min(6).validate(password);
  if (emailValidation.error || passwordValidation.error) {
    res.status(401).json({ message: 'Incorrect email or password' });
  } else {
    next();
  }
}
