import { Request, Response } from 'express';
import LoginService from '../services/loginService';
import CustomError from '../CustomError/CustomError';
import { SUCCESS } from '../middlewares/httpProtocols';

class LoginController {
  constructor(private loginService = new LoginService()) { }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const token = await this.loginService.login(email, password);

    return res.status(SUCCESS).json({ token });
  };

  public loginToken = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (!authorization) throw new CustomError(401, 'Invalid Token!');

    // https://github.com/mikenicholson/passport-jwt/issues/117
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
    const token = authorization.replace('Bearer ', '');
    const role = await this.loginService.loginToken(token);
    return res.status(SUCCESS).json({ role });
  };
}

export default LoginController;
