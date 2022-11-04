import { Request, Response } from 'express';
import MatchesServices from '../services/matchesService';

class MatchesController {
  constructor(
    private matchesServices = new MatchesServices(),
  ) { }

  public findAllMatchesData = async (_req: Request, res: Response) => {
    const matchesData = await this.matchesServices.findAllMatchesData();

    return res.status(200).json(matchesData);
  };
}

export default MatchesController;
