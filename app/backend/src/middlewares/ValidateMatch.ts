import { NextFunction, Request, Response } from 'express';
import * as JWT from 'jsonwebtoken';

import TokenInterface from '../interfaces/TokenInterface';
import CustomError from '../CustomError/CustomError';

// DOC: https://community.smartbear.com/t5/SwaggerHub-Questions/How-to-replace-quot-bearer-quot-in-Bearer-Authentication-with/td-p/207705
// DOC: https:// www.freecodecamp.org/portuguese/news/como-simplificar-e-deixar-limpa-a-validacao-de-entrada-na-aplicacao-do-express-js/
const ValidateMatch = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(401).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }

  try {
    if (!authorization) {
      return res.status(401).json({ message: 'Invalid Token!' });
    }

    const valitationToken = authorization.replace('Bearer ', '');

    JWT.verify(valitationToken, 'jwt_secret') as TokenInterface;
  } catch (err) {
    throw new CustomError(401, 'Token must be a valid token');
  }

  next();
};

export default ValidateMatch;
