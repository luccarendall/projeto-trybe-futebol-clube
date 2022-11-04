import { NextFunction, Request, Response } from 'express';
import * as JWT from 'jsonwebtoken';

import TokenInterface from '../interfaces/TokenInterface';
import CustomError from '../CustomError/CustomError';

// DOC: https://community.smartbear.com/t5/SwaggerHub-Questions/How-to-replace-quot-bearer-quot-in-Bearer-Authentication-with/td-p/207705
// DOC: https:// www.freecodecamp.org/portuguese/news/como-simplificar-e-deixar-limpa-a-validacao-de-entrada-na-aplicacao-do-express-js/
const ValidateMatch = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const { homeTeam, awayTeam } = req.body;

  const UNPROCESSABLE_ENTITY = 422;
  const UNAUTHORIZED = 401;

  if (homeTeam === awayTeam) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }

  try {
    if (!authorization) {
      return res.status(UNAUTHORIZED).json({ message: 'Token must be a valid token' });
    }

    const valitationToken = authorization.replace('Bearer ', '');

    JWT.verify(valitationToken, 'jwt_secret') as TokenInterface;
  } catch (err) { throw new CustomError(UNAUTHORIZED, 'Token must be a valid token'); }

  next();
};

export default ValidateMatch;
