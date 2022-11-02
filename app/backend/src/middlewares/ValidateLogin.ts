import * as bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import UserModel from '../database/models/UserModel';

class ValidateLogin {
  public model = UserModel;
  public validate = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const result = await this.model.findOne(
      { where: { email },
        raw: true },
    );

    if (!result) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    // DOC: https://www.npmjs.com/package/bcrypt
    if (!bcrypt.compareSync(password, result.password)) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    next();
  };
}

export default ValidateLogin;
