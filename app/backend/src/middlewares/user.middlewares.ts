import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

export default function validateLogin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email, password } = req.body;

  const emailValidation = Joi.string().email().validate(email);
  const passwordValidation = Joi.string().min(6).validate(password);

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (emailValidation.error || passwordValidation.error) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  next();
}
